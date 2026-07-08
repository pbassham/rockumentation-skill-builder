/**
 * Shared helpers for working with the tracked `curated-bundles/` dir.
 * Used by both the HTTP save endpoint and the cron refresh flow so the
 * commit shape stays identical.
 */

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import { CURATED_BUNDLES } from "./curated-roots";
import type { BundledSkill } from "./build-config";
import {
  commitChanges,
  isGitPushConfigured,
  type CommitResult,
  type CommitSkipped,
} from "./github-push";

/**
 * Deterministic public-skill id for a curated bundle.
 *
 * Bundles documenting Rock v19+ get a version-prefixed id
 * (`curated-v19-rock-core-concepts`) because the same skill name can
 * exist for several Rock versions. The original six bundles (v18 book
 * sets and the version-agnostic hub bundles) keep their historical
 * `curated-<name>` ids so existing gallery links and S3 objects stay
 * valid.
 */
export function curatedIdFor(skill: BundledSkill): string {
  const version = Number(skill.rockVersion);
  const prefix =
    Number.isFinite(version) && version >= 19 ? `v${skill.rockVersion}-` : "";
  return `curated-${`${prefix}${skill.name}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

/** Legacy id shape used before versioned bundles existed. */
export function curatedBundleId(bundleName: string): string {
  return `curated-${bundleName.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

/**
 * Directory of a curated bundle relative to `curated-bundles/`:
 * `v<rockVersion>/<name>` for versioned bundles, `<name>` otherwise.
 */
export function curatedBundleRelDir(skill: BundledSkill): string {
  return skill.rockVersion ? `v${skill.rockVersion}/${skill.name}` : skill.name;
}

/** Absolute on-disk directory of a curated bundle. */
export function curatedBundleDir(skill: BundledSkill): string {
  return join(CURATED_TRACKED_DIR, curatedBundleRelDir(skill));
}

/** Resolve a public-skill id back to the curated bundle (or null). */
export function curatedBundleForId(id: string): BundledSkill | null {
  if (!id.startsWith("curated-")) return null;
  return CURATED_BUNDLES.find((b) => curatedIdFor(b) === id) ?? null;
}

/** Resolve a public-skill id back to the curated bundle name (or null). */
export function bundleNameForId(id: string): string | null {
  return curatedBundleForId(id)?.name ?? null;
}

/**
 * Read the on-disk curated bundle (SKILL.md + references/*.md) and
 * return a `{ meta, files }` shape that matches the S3 public-skill
 * API. Returns null when the bundle name isn't curated or the dir is
 * missing. Always wins over the S3 copy so the canonical source of
 * truth is git, not Tigris.
 */
export async function readCuratedBundleFromDisk(id: string): Promise<{
  meta: {
    id: string;
    skillName: string;
    pageTitle: string;
    sourceUrl: string;
    articleCount: number;
    refCount: number;
    createdAt: string;
    bundle: unknown;
    curated: true;
  };
  files: string[];
} | null> {
  const bundle = curatedBundleForId(id);
  if (!bundle) return null;
  const bundleDir = curatedBundleDir(bundle);

  const skillMd = await Bun.file(join(bundleDir, "SKILL.md"))
    .text()
    .catch(() => null);
  if (skillMd === null) return null;

  const refsDir = join(bundleDir, "references");
  const refNames = (await readdir(refsDir).catch(() => [] as string[]))
    .filter((n) => n.endsWith(".md"))
    .sort();

  const files = ["SKILL.md", ...refNames.map((n) => `references/${n}`)];
  const headingMatch = skillMd.match(/^#\s+(.+)$/m);
  const pageTitle = headingMatch?.[1]?.trim() || bundle.name;

  return {
    meta: {
      id,
      skillName: bundle.name,
      pageTitle,
      sourceUrl: bundle.sources[0]?.url || "",
      articleCount: refNames.length + 1,
      refCount: refNames.length,
      createdAt: new Date(0).toISOString(),
      bundle,
      curated: true,
    },
    files,
  };
}

/** Read a single file from a curated bundle on disk, or null. */
export async function readCuratedBundleFile(
  id: string,
  relPath: string,
): Promise<string | null> {
  const bundle = curatedBundleForId(id);
  if (!bundle) return null;
  if (relPath.includes("..") || relPath.startsWith("/")) return null;
  const filePath = join(curatedBundleDir(bundle), relPath);
  return await Bun.file(filePath)
    .text()
    .catch(() => null);
}

/** Repo-relative path of the git-tracked curated source of truth. */
export const CURATED_TRACKED_DIR = resolve("./curated-bundles");

/**
 * Read `curated-bundles/<bundleName>/` from disk and commit the
 * snapshot to git via the GitHub Git Data API. `deletedRefs` items are
 * paths relative to the bundle dir (e.g. `references/old-slug.md`).
 *
 * No-ops to `{ skipped }` when `GITHUB_REPO` + `GITHUB_TOKEN` aren't
 * both set.
 */
export async function commitBundleToGit(
  bundleName: string,
  deletedRefs: string[],
  message: string,
): Promise<CommitResult | CommitSkipped> {
  if (!isGitPushConfigured()) {
    return { ok: false, skipped: "git disabled" };
  }
  const bundle = CURATED_BUNDLES.find((b) => b.name === bundleName);
  if (!bundle) {
    return { ok: false, skipped: `unknown curated bundle "${bundleName}"` };
  }
  const relDir = curatedBundleRelDir(bundle);
  const bundleDir = curatedBundleDir(bundle);
  const changes: Array<{
    path: string;
    content?: string;
    delete?: boolean;
  }> = [];

  try {
    const skillMd = await Bun.file(join(bundleDir, "SKILL.md")).text();
    changes.push({
      path: `curated-bundles/${relDir}/SKILL.md`,
      content: skillMd,
    });
  } catch {}

  const refsDir = join(bundleDir, "references");
  const refNames = await readdir(refsDir).catch(() => [] as string[]);
  for (const name of refNames.filter((n) => n.endsWith(".md")).sort()) {
    const content = await Bun.file(join(refsDir, name))
      .text()
      .catch(() => null as string | null);
    if (content === null) continue;
    changes.push({
      path: `curated-bundles/${relDir}/references/${name}`,
      content,
    });
  }

  for (const rel of deletedRefs) {
    changes.push({
      path: `curated-bundles/${relDir}/${rel}`,
      delete: true,
    });
  }

  return commitChanges({ message, changes });
}
