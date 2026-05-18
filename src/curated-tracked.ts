/**
 * Shared helpers for working with the tracked `curated-bundles/` dir.
 * Used by both the HTTP save endpoint and the cron refresh flow so the
 * commit shape stays identical.
 */

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import {
  commitChanges,
  isGitPushConfigured,
  type CommitResult,
  type CommitSkipped,
} from "./github-push";

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
  const bundleDir = join(CURATED_TRACKED_DIR, bundleName);
  const changes: Array<{
    path: string;
    content?: string;
    delete?: boolean;
  }> = [];

  try {
    const skillMd = await Bun.file(join(bundleDir, "SKILL.md")).text();
    changes.push({
      path: `curated-bundles/${bundleName}/SKILL.md`,
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
      path: `curated-bundles/${bundleName}/references/${name}`,
      content,
    });
  }

  for (const rel of deletedRefs) {
    changes.push({
      path: `curated-bundles/${bundleName}/${rel}`,
      delete: true,
    });
  }

  return commitChanges({ message, changes });
}
