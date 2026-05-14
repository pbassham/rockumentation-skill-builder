/**
 * Repo-tracked cache of AI-generated reference descriptions.
 *
 * Lives at `data/descriptions/<skill-name>/<slug>.md` — one tiny markdown
 * file per (skill, reference) pair whose body is just the description
 * string. Per-file (rather than one big JSON) so:
 *   - PRs are easy to review (one file = one description)
 *   - contributors don't fight merge conflicts
 *   - `git blame` shows provenance per description
 *
 * On every build, `generateSkill` seeds the in-memory `descriptionMap`
 * from this cache so freshly-extracted skills arrive with curated
 * descriptions already in place. When the user later runs `/api/describe`
 * (single or bulk), successful generations are written back here so the
 * next contributor can curate / improve them.
 *
 * On-disk reference frontmatter still wins over the cache (so manual
 * edits in `output/...` aren't silently reverted).
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = join(import.meta.dir, "..", "data", "descriptions");

function safeName(name: string): string {
  // Defence-in-depth: never let a path component escape the cache root.
  return name.replace(/[^a-z0-9._-]+/gi, "-").replace(/^\.+/, "");
}

function pathFor(skillName: string, slug: string): string {
  return join(ROOT, safeName(skillName), `${safeName(slug)}.md`);
}

/** Read a cached description, or null if not present. */
export async function readCachedDescription(
  skillName: string,
  slug: string,
): Promise<string | null> {
  if (!skillName || !slug) return null;
  try {
    const text = await readFile(pathFor(skillName, slug), "utf-8");
    return text.trim() || null;
  } catch {
    return null;
  }
}

/** Write a description into the cache, creating dirs as needed. */
export async function writeCachedDescription(
  skillName: string,
  slug: string,
  description: string,
): Promise<void> {
  if (!skillName || !slug || !description.trim()) return;
  const filepath = pathFor(skillName, slug);
  await mkdir(dirname(filepath), { recursive: true });
  // Single trailing newline keeps git diffs clean.
  await writeFile(filepath, description.trim() + "\n", "utf-8");
}

/**
 * Build a GitHub edit URL for a cached description so the UI can offer
 * "Suggest improvement" links. Returns null when no repo is configured.
 *
 * The repo slug is read from `DESCRIPTION_CACHE_REPO` (e.g.
 * "pbassham/rockumentation-skill-builder") so deployments can override
 * it without code changes; defaults to the upstream repo.
 */
export function editUrlFor(skillName: string, slug: string): string {
  const repo =
    process.env.DESCRIPTION_CACHE_REPO ||
    "pbassham/rockumentation-skill-builder";
  const branch = process.env.DESCRIPTION_CACHE_BRANCH || "main";
  return `https://github.com/${repo}/edit/${branch}/data/descriptions/${safeName(
    skillName,
  )}/${safeName(slug)}.md`;
}
