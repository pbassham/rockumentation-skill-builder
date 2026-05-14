/**
 * Pre-build all curated bundles into the public S3 bucket so the home
 * page tiles can offer a one-click "Download" alongside "Open in
 * builder". Each curated bundle gets a deterministic id of the form
 * `curated-<bundle-name>` so re-runs overwrite the previous artefact in
 * place — no clutter in the gallery.
 *
 * Behaviour:
 *   - Builds every bundle in CURATED_BUNDLES via the regular pipeline
 *     (descriptions seeded from the repo-tracked cache at
 *     data/descriptions/).
 *   - When ANTHROPIC_API_KEY is set, generates descriptions for every
 *     reference that is still missing one and writes them back to the
 *     cache so future PRs can curate them.
 *   - Uploads the built skill to S3 with `curated: true` in meta.json
 *     so the gallery / home tiles can distinguish curated from
 *     user-published skills.
 *
 * Triggers (server.ts):
 *   - 30s after server boot (background task — does not block readiness)
 *   - Daily setInterval thereafter
 *   - Idempotent: if the upload-meta hash matches, the run is a no-op.
 */
import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import { CURATED_BUNDLES } from "./curated-roots";
import { buildBundle } from "./bundle-builder";
import { generateDescription } from "./describe";
import { writeCachedDescription } from "./description-cache";
import { parseFrontmatter, setDescription } from "./frontmatter";
import { updateSkillMdDescriptions } from "./generate";
import {
  isStorageConfigured,
  uploadSkill,
  uploadSkillFile,
  type SkillMeta,
} from "./storage";
import { validateSkill } from "./validate-skill";

interface PrebuildResult {
  bundleName: string;
  id: string;
  refCount: number;
  generatedDescriptions: number;
  errors: string[];
}

const PREBUILD_OUTPUT_DIR = resolve("./output/_curated");

/** Deterministic id so re-runs overwrite the same artefact in S3. */
function curatedId(bundleName: string): string {
  return `curated-${bundleName.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

async function zipSkillDir(skillDir: string): Promise<Uint8Array> {
  const proc = Bun.spawn(["zip", "-r", "-q", "-", "SKILL.md", "references"], {
    cwd: skillDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  const bytes = new Uint8Array(await new Response(proc.stdout).arrayBuffer());
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`zip failed: ${stderr}`);
  }
  return bytes;
}

async function collectSkillFiles(
  skillDir: string,
): Promise<{ path: string; content: string }[]> {
  const files: { path: string; content: string }[] = [];
  try {
    files.push({
      path: "SKILL.md",
      content: await Bun.file(join(skillDir, "SKILL.md")).text(),
    });
  } catch {}
  const refsDir = join(skillDir, "references");
  const names = await readdir(refsDir).catch(() => [] as string[]);
  for (const name of names.filter((n) => n.endsWith(".md")).sort()) {
    try {
      files.push({
        path: `references/${name}`,
        content: await Bun.file(join(refsDir, name)).text(),
      });
    } catch {}
  }
  return files;
}

/**
 * Walk references/*.md and ask Claude for a description for any that
 * lack one. Writes the description into both the reference frontmatter
 * AND the repo-tracked cache so future builds inherit it.
 */
async function fillMissingDescriptions(
  skillDir: string,
  skillName: string,
  apiKey: string,
): Promise<{ generated: number; errors: number }> {
  const refsDir = join(skillDir, "references");
  let generated = 0;
  let errors = 0;
  let pageTitle = skillName;
  try {
    const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
    const headingMatch = skillMd.match(/^#\s+(.+)$/m);
    pageTitle = headingMatch?.[1]?.trim() || skillName;
  } catch {}

  const refNames = (await readdir(refsDir).catch(() => [])).filter((n) =>
    n.endsWith(".md"),
  );
  const updatedDescs = new Map<string, string>();
  for (const name of refNames) {
    const filepath = join(refsDir, name);
    let raw = "";
    try {
      raw = await Bun.file(filepath).text();
    } catch {
      continue;
    }
    const { description, body } = parseFrontmatter(raw);
    if (description && description.trim()) continue;

    const slug = name.replace(/\.md$/, "");
    const refTitleMatch = body.match(/^#\s+(.+)$/m);
    const title = refTitleMatch?.[1]?.trim() || slug;
    const bcMatch = body.match(/^>\s*\*\*Path:\*\*\s*(.+)$/m);
    const breadcrumb = bcMatch?.[1]?.trim() || "";
    try {
      const desc = await generateDescription(
        { slug, title, breadcrumb, content: body },
        { skillName, pageTitle },
        apiKey,
      );
      if (!desc) {
        errors++;
        continue;
      }
      const updated = setDescription(raw, desc);
      await Bun.write(filepath, updated);
      await writeCachedDescription(skillName, slug, desc).catch(() => {});
      updatedDescs.set(slug, desc);
      generated++;
    } catch {
      errors++;
    }
  }

  if (updatedDescs.size > 0) {
    try {
      await updateSkillMdDescriptions(skillDir, updatedDescs);
    } catch {}
  }

  return { generated, errors };
}

async function prebuildOne(
  bundle: (typeof CURATED_BUNDLES)[number],
  apiKey: string | undefined,
  uploadEnabled: boolean,
): Promise<PrebuildResult> {
  const result: PrebuildResult = {
    bundleName: bundle.name,
    id: curatedId(bundle.name),
    refCount: 0,
    generatedDescriptions: 0,
    errors: [],
  };

  const built = await buildBundle({
    skill: bundle,
    outputDir: PREBUILD_OUTPUT_DIR,
    send: () => {},
  });
  if (!built) {
    result.errors.push("buildBundle returned no result");
    return result;
  }

  result.refCount = built.refCount;

  if (apiKey) {
    try {
      const { generated, errors } = await fillMissingDescriptions(
        built.skillDir,
        built.skillName,
        apiKey,
      );
      result.generatedDescriptions = generated;
      if (errors > 0) {
        result.errors.push(`${errors} description generation error(s)`);
      }
    } catch (err: any) {
      result.errors.push(`description fill failed: ${err.message || err}`);
    }
  }

  // Upload to S3 (deterministic id => overwrites previous artefact).
  // Skipped when storage isn't configured so the function still works
  // locally as a description-cache populator.
  if (uploadEnabled) {
    const id = result.id;
    const zipBytes = await zipSkillDir(built.skillDir);
    let pageTitle = built.skillName;
    try {
      const skillMd = await Bun.file(join(built.skillDir, "SKILL.md")).text();
      const headingMatch = skillMd.match(/^#\s+(.+)$/m);
      pageTitle = headingMatch?.[1]?.trim() || built.skillName;
    } catch {}

    const sourceUrl = bundle.sources[0]?.url || "";
    const meta: SkillMeta = {
      id,
      skillName: built.skillName,
      pageTitle,
      sourceUrl,
      articleCount: built.refCount + 1,
      refCount: built.refCount,
      createdAt: new Date().toISOString(),
      bundle,
      curated: true,
    };
    await uploadSkill(id, zipBytes, meta);
    const files = await collectSkillFiles(built.skillDir);
    for (const f of files) {
      await uploadSkillFile(id, f.path, f.content);
    }
  }

  // Optional but cheap: validate post-upload so we surface obvious
  // problems in the server logs.
  try {
    const v = await validateSkill(built.skillDir);
    if (!v.ok) {
      const errs = v.problems
        .filter((p) => p.severity === "error")
        .map((p) => p.message);
      if (errs.length > 0) result.errors.push(...errs);
    }
  } catch {}

  return result;
}

let prebuildInFlight: Promise<PrebuildResult[]> | null = null;
let lastPrebuildAt: number | null = null;

export interface PrebuildSummary {
  startedAt: string;
  durationMs: number;
  results: PrebuildResult[];
}

/**
 * Build every curated bundle and upload to S3. Coalesces concurrent
 * callers — only one run at a time, returns the same promise to all.
 */
export async function prebuildAllCurated(opts: {
  apiKey?: string;
} = {}): Promise<PrebuildSummary> {
  if (prebuildInFlight) {
    const results = await prebuildInFlight;
    return {
      startedAt: new Date(lastPrebuildAt!).toISOString(),
      durationMs: 0,
      results,
    };
  }
  const uploadEnabled = isStorageConfigured();
  const apiKey = opts.apiKey || process.env.ANTHROPIC_API_KEY;
  const startedAt = Date.now();
  lastPrebuildAt = startedAt;
  prebuildInFlight = (async () => {
    const out: PrebuildResult[] = [];
    for (const bundle of CURATED_BUNDLES) {
      try {
        out.push(await prebuildOne(bundle, apiKey, uploadEnabled));
      } catch (err: any) {
        out.push({
          bundleName: bundle.name,
          id: curatedId(bundle.name),
          refCount: 0,
          generatedDescriptions: 0,
          errors: [err.message || String(err)],
        });
      }
    }
    return out;
  })();
  try {
    const results = await prebuildInFlight;
    return {
      startedAt: new Date(startedAt).toISOString(),
      durationMs: Date.now() - startedAt,
      results,
    };
  } finally {
    prebuildInFlight = null;
  }
}

/** Map of bundleName -> curated S3 id. Used by the home page. */
export function listCuratedPrebuiltIds(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const b of CURATED_BUNDLES) out[b.name] = curatedId(b.name);
  return out;
}

// CLI: `bun src/prebuild-curated.ts` builds every curated bundle and
// fills missing descriptions into data/descriptions/. Uploads to S3 if
// AWS_* env vars are present, otherwise just populates the local cache
// so the result can be committed to git.
if (import.meta.main) {
  const summary = await prebuildAllCurated();
  const generated = summary.results.reduce(
    (n, r) => n + r.generatedDescriptions,
    0,
  );
  const failed = summary.results.filter((r) => r.errors.length > 0);
  console.log(
    `\nBuilt ${summary.results.length} curated bundle(s) in ${(summary.durationMs / 1000).toFixed(1)}s — ${generated} description(s) generated.`,
  );
  for (const r of summary.results) {
    const tag = r.errors.length > 0 ? "✖" : "✓";
    console.log(
      `  ${tag} ${r.bundleName} — ${r.refCount} refs, ${r.generatedDescriptions} new descriptions${r.errors.length > 0 ? `; errors: ${r.errors.slice(0, 2).join("; ")}` : ""}`,
    );
  }
  if (failed.length > 0) process.exit(1);
}
