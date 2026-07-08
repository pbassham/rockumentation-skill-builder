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
import { join, dirname } from "node:path";
import { readdir } from "node:fs/promises";
import { CURATED_BUNDLES } from "./curated-roots";
import { buildBundle } from "./bundle-builder";
import { generateDescription } from "./describe";
import { fetchPage } from "./fetch";
import { parseFrontmatter, setDescription } from "./frontmatter";
import { updateSkillMdDescriptions } from "./generate";
import {
  commitBundleToGit,
  curatedBundleDir,
  curatedIdFor,
} from "./curated-tracked";
import { isGitPushConfigured } from "./github-push";
import { enumerateTopicBooks, ROCK_TOPIC_BOOKS } from "./rock-docs";
import type { BundledSkill } from "./build-config";
import {
  isStorageConfigured,
  uploadSkill,
  uploadSkillFile,
  pruneSkillFiles,
  skillExists,
  readLastCuratedPrebuildAt,
  writeLastCuratedPrebuildAt,
  type SkillMeta,
} from "./storage";
import { validateSkill } from "./validate-skill";

interface PrebuildResult {
  bundleName: string;
  id: string;
  refCount: number;
  generatedDescriptions: number;
  deletedRefs: string[];
  /** Set to the commit URL when this run produced a git commit. */
  commitUrl?: string;
  errors: string[];
}

function buildCommitMessage(
  bundleName: string,
  removed: number,
  newDescriptions: number,
  rockVersion?: string,
): string {
  const parts: string[] = [];
  if (removed > 0) parts.push(`${removed} removed`);
  if (newDescriptions > 0)
    parts.push(
      `${newDescriptions} new description${newDescriptions === 1 ? "" : "s"}`,
    );
  const version = rockVersion ? ` (Rock ${rockVersion})` : "";
  const suffix = parts.length ? ` \u2014 ${parts.join(", ")}` : "";
  return `chore(curated): ${bundleName} refresh${version}${suffix}`;
}

/** ms in 30 days \u2014 refresh window for `refreshCadence: "monthly"`. */
export const MONTHLY_REFRESH_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Which bundles a refresh run should rebuild.
 *
 * - An explicit `bundleName` always wins (manual runs rebuild anything).
 * - Full runs include every weekly bundle, and monthly bundles only
 *   when their last build (`lastBuiltAt`) is \u226530 days old or unknown.
 *
 * Pure so it's unit-testable; `lastBuiltAt` normally reads the
 * `metadata.generatedAt` stamp from each bundle's on-disk SKILL.md.
 */
export function refreshTargets(
  bundles: BundledSkill[],
  lastBuiltAt: (bundle: BundledSkill) => Date | null,
  now: Date,
  bundleName?: string,
): BundledSkill[] {
  if (bundleName) return bundles.filter((b) => b.name === bundleName);
  return bundles.filter((b) => {
    if (b.refreshCadence !== "monthly") return true;
    const last = lastBuiltAt(b);
    if (!last) return true;
    return now.getTime() - last.getTime() >= MONTHLY_REFRESH_MAX_AGE_MS;
  });
}

/**
 * `metadata.generatedAt` from a bundle's on-disk SKILL.md, or null when
 * the file/stamp is missing (treat as "never built" \u2192 refresh-eligible).
 */
async function readBundleGeneratedAt(
  bundle: BundledSkill,
): Promise<Date | null> {
  const skillMd = await Bun.file(join(curatedBundleDir(bundle), "SKILL.md"))
    .text()
    .catch(() => null as string | null);
  if (!skillMd) return null;
  const m = skillMd.match(/^\s*generatedAt:\s*(\S+)\s*$/m);
  if (!m) return null;
  const ts = Date.parse(m[1]!);
  return Number.isNaN(ts) ? null : new Date(ts);
}

/**
 * Warn when the live documentation index's topic books diverge from
 * the hardcoded `ROCK_TOPIC_BOOKS` list the v19+ bundles are built
 * from (Rock added/renamed a topic). Warn-only \u2014 never blocks a run.
 */
async function warnOnTopicDrift(): Promise<void> {
  const indexUrl = "https://community.rockrms.com/documentation";
  const html = await fetchPage(indexUrl);
  const live = enumerateTopicBooks(html, indexUrl);
  if (live.length === 0) {
    console.warn(
      "[curated-prebuild] topic drift check: no topic links found on the documentation index \u2014 its layout may have changed.",
    );
    return;
  }
  const configured = new Set(ROCK_TOPIC_BOOKS.map((t) => t.slug));
  const liveSlugs = new Set(live.map((t) => t.slug));
  const added = live.filter((t) => !configured.has(t.slug));
  const missing = ROCK_TOPIC_BOOKS.filter((t) => !liveSlugs.has(t.slug));
  if (added.length > 0) {
    console.warn(
      `[curated-prebuild] topic drift: live site has topic book(s) not in ROCK_TOPIC_BOOKS: ${added.map((t) => t.slug).join(", ")}`,
    );
  }
  if (missing.length > 0) {
    console.warn(
      `[curated-prebuild] topic drift: configured topic book(s) missing from the live index: ${missing.map((t) => t.slug).join(", ")}`,
    );
  }
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
    id: curatedIdFor(bundle),
    refCount: 0,
    generatedDescriptions: 0,
    deletedRefs: [],
    errors: [],
  };

  const tag = `[prebuild ${bundle.name}]`;
  const t0 = Date.now();
  console.log(
    `${tag} start (${bundle.sources.length} source${bundle.sources.length === 1 ? "" : "s"})`,
  );
  const built = await buildBundle({
    skill: bundle,
    // Versioned bundles live under curated-bundles/v<n>/<name>;
    // buildBundle appends <name>, so hand it the parent dir.
    outputDir: dirname(curatedBundleDir(bundle)),
    mode: "refresh",
    send: (msg: any) => {
      // Only log meaningful state transitions to keep prod logs readable.
      if (
        msg &&
        (msg.status === "running" ||
          msg.status === "done" ||
          msg.status === "error" ||
          msg.status === "auth-required")
      ) {
        const prefix =
          msg.sourceIndex && msg.sourceTotal
            ? `${tag} step ${msg.step} [${msg.sourceIndex}/${msg.sourceTotal}]`
            : `${tag} step ${msg.step}`;
        console.log(`${prefix} ${msg.status}: ${msg.message ?? ""}`);
      }
    },
  });
  if (!built) {
    result.errors.push("buildBundle returned no result");
    console.error(`${tag} buildBundle returned no result`);
    return result;
  }

  result.refCount = built.refCount;
  result.deletedRefs = built.deletedRefs;
  console.log(
    `${tag} built ${built.refCount} refs (${built.deletedRefs.length} removed) in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
  );

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

  // Push the refreshed tracked-dir contents to git so descriptions and
  // any source-driven body changes survive container restarts. This
  // runs BEFORE the S3 upload so commits and the read cache stay in
  // step. No-op when `GITHUB_TOKEN` + `GITHUB_REPO` aren't set.
  if (isGitPushConfigured()) {
    try {
      const message = buildCommitMessage(
        bundle.name,
        built.deletedRefs.length,
        result.generatedDescriptions,
        built.detectedRockVersion,
      );
      const commit = await commitBundleToGit(
        bundle.name,
        built.deletedRefs,
        message,
      );
      if (commit.ok) {
        result.commitUrl = commit.commitUrl;
        console.log(
          `${tag} git commit ${commit.commitSha.slice(0, 7)} — ${commit.filesChanged} files, ${commit.deletions} deletions`,
        );
      } else if (commit.skipped !== "no changes") {
        console.log(`${tag} git skipped: ${commit.skipped}`);
      }
    } catch (err: any) {
      result.errors.push(`git push failed: ${err.message || err}`);
      console.warn(`${tag} git push failed: ${err.message || err}`);
    }
  }

  // Upload to S3 (deterministic id => overwrites previous artefact).
  // Skipped when storage isn't configured so the function still works
  // locally for description backfill.
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
      rockVersion: built.detectedRockVersion ?? bundle.rockVersion,
    };
    await uploadSkill(id, zipBytes, meta);
    const files = await collectSkillFiles(built.skillDir);
    for (const f of files) {
      await uploadSkillFile(id, f.path, f.content);
    }
    // Drop any stale files from previous builds (e.g. references that
    // merged away). Without this, the UI's per-file listing keeps
    // showing orphans long after the refCount in meta.json has
    // shrunk.
    const pruned = await pruneSkillFiles(
      id,
      files.map((f) => f.path),
    ).catch((err) => {
      console.warn(`${tag} prune failed: ${err?.message || err}`);
      return [] as string[];
    });
    console.log(
      `${tag} uploaded ${files.length} files, pruned ${pruned.length} stale`,
    );
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

  console.log(
    `${tag} done in ${((Date.now() - t0) / 1000).toFixed(1)}s — refs=${result.refCount}, descriptions=${result.generatedDescriptions}, errors=${result.errors.length}`,
  );
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
export async function refreshAllCurated(
  opts: {
    apiKey?: string;
    /** If set, only rebuild this bundle name (e.g. "rock-user"). */
    bundleName?: string;
  } = {},
): Promise<PrebuildSummary> {
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
    // Monthly-cadence bundles (older Rock versions) only rebuild when
    // their on-disk generatedAt stamp is ≥30 days old; explicit
    // single-bundle runs always rebuild.
    const lastBuilt = new Map<string, Date | null>();
    for (const b of CURATED_BUNDLES) {
      lastBuilt.set(b.name, await readBundleGeneratedAt(b));
    }
    const targets = refreshTargets(
      CURATED_BUNDLES,
      (b) => lastBuilt.get(b.name) ?? null,
      new Date(),
      opts.bundleName,
    );
    const skipped = CURATED_BUNDLES.filter((b) => !targets.includes(b));
    if (!opts.bundleName && skipped.length > 0) {
      console.log(
        `[curated-prebuild] skipping ${skipped.length} monthly bundle(s) refreshed <30d ago: ${skipped.map((b) => b.name).join(", ")}`,
      );
    }
    // Surface (but never fail on) new/renamed topic books on the live
    // documentation index before a full run.
    if (!opts.bundleName) {
      await warnOnTopicDrift().catch((err) =>
        console.warn(
          `[curated-prebuild] topic drift check failed: ${err?.message || err}`,
        ),
      );
    }
    const out: PrebuildResult[] = [];
    for (const bundle of targets) {
      try {
        out.push(await prebuildOne(bundle, apiKey, uploadEnabled));
      } catch (err: any) {
        out.push({
          bundleName: bundle.name,
          id: curatedIdFor(bundle),
          refCount: 0,
          generatedDescriptions: 0,
          deletedRefs: [],
          errors: [err.message || String(err)],
        });
      }
    }
    return out;
  })();
  try {
    const results = await prebuildInFlight;
    // Only refresh the global "last prebuild" timestamp on a full run;
    // a single-bundle rebuild shouldn't reset the weekly cron clock.
    if (uploadEnabled && !opts.bundleName) {
      await writeLastCuratedPrebuildAt(new Date(startedAt).toISOString()).catch(
        () => {},
      );
    }
    return {
      startedAt: new Date(startedAt).toISOString(),
      durationMs: Date.now() - startedAt,
      results,
    };
  } finally {
    prebuildInFlight = null;
  }
}

/**
 * Map of bundleName -> curated S3 id, filtered to only include ids
 * whose artefacts actually exist in S3 right now. Used by the home
 * page so the Download button never points at a 404.
 */
export async function listAvailableCuratedPrebuiltIds(): Promise<
  Record<string, string>
> {
  if (!isStorageConfigured()) return {};
  const entries = await Promise.all(
    CURATED_BUNDLES.map(async (b) => {
      const id = curatedIdFor(b);
      return (await skillExists(id)) ? ([b.name, id] as const) : null;
    }),
  );
  const out: Record<string, string> = {};
  for (const e of entries) if (e) out[e[0]] = e[1];
  return out;
}

/** Synchronous flavour: full deterministic id map without S3 lookups. */
export function listCuratedPrebuiltIds(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const b of CURATED_BUNDLES) out[b.name] = curatedIdFor(b);
  return out;
}

/** ms in 7 days. */
export const PREBUILD_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Returns true if the most recent successful prebuild is older than
 * PREBUILD_MAX_AGE_MS (or has never run). Used by the startup hook to
 * avoid kicking off a fresh build on every cold start — Fly machines
 * sleep + wake constantly, and a full rebuild burns 15+ minutes per
 * wake when there's nothing new to do.
 */
export async function isPrebuildDue(): Promise<boolean> {
  if (!isStorageConfigured()) return false;
  const last = await readLastCuratedPrebuildAt();
  if (!last) return true;
  const ts = Date.parse(last);
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts >= PREBUILD_MAX_AGE_MS;
}

// CLI: `bun src/prebuild-curated.ts` builds every curated bundle and
// fills missing descriptions into data/descriptions/. Uploads to S3 if
// AWS_* env vars are present, otherwise just populates the local cache
// so the result can be committed to git.
if (import.meta.main) {
  const summary = await refreshAllCurated();
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
