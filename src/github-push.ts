/**
 * GitHub push helper using the Git Data API.
 *
 * Used by the curated bundle Save flow and the weekly cron to commit
 * regenerated `curated-bundles/<name>/` content back to this repo as a
 * single atomic commit per call. Operates entirely via the REST API
 * (no local git installation required, which matters in our Fly
 * container image).
 *
 * Configuration:
 * - `GITHUB_REPO` (e.g. `pbassham/rockumentation-skill-builder`)
 * - `GITHUB_TOKEN` (fine-grained PAT with Contents: read/write on the
 *   repo). Provided as a Fly secret in production; missing locally is
 *   fine \u2014 every export is a no-op `{ skipped: "git disabled" }` so
 *   callers can run unconditionally.
 * - `GITHUB_BRANCH` (defaults to `main`).
 *
 * A single `commitChanges` call:
 *   1. fetches the branch ref \u2192 commit \u2192 base tree SHA
 *   2. uploads each new/updated file as a blob
 *   3. builds a new tree on top of the base, marking deleted paths with
 *      `sha: null`
 *   4. creates a commit referencing that tree
 *   5. fast-forwards the branch ref
 */

export interface GitChange {
  /** Repo-relative path, e.g. `curated-bundles/rock-user/SKILL.md`. */
  path: string;
  /** UTF-8 content. Required for writes. */
  content?: string;
  /** Set true to delete the path instead. */
  delete?: boolean;
}

export interface CommitOptions {
  message: string;
  changes: GitChange[];
  /** Override the configured branch for this single commit. */
  branch?: string;
  /** Author/committer for the commit. Defaults to a bot identity. */
  authorName?: string;
  authorEmail?: string;
}

export interface CommitResult {
  ok: true;
  commitSha: string;
  commitUrl: string;
  branch: string;
  filesChanged: number;
  deletions: number;
}

export interface CommitSkipped {
  ok: false;
  skipped: string;
}

export function isGitPushConfigured(): boolean {
  return !!(process.env.GITHUB_REPO && process.env.GITHUB_TOKEN);
}

/**
 * Commit a batch of file writes and/or deletes as a single GitHub
 * commit on the configured branch. Returns `{ ok: false, skipped }`
 * when env vars are missing so callers can use this unconditionally.
 */
export async function commitChanges(
  opts: CommitOptions,
): Promise<CommitResult | CommitSkipped> {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) {
    return {
      ok: false,
      skipped: "git disabled (set GITHUB_REPO + GITHUB_TOKEN)",
    };
  }
  if (opts.changes.length === 0) {
    return { ok: false, skipped: "no changes" };
  }
  const branch = opts.branch || process.env.GITHUB_BRANCH || "main";
  const api = `https://api.github.com/repos/${repo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rockumentation-skill-builder",
  };

  // 1. Resolve current branch tip.
  const refRes = await ghFetch(
    `${api}/git/ref/heads/${encodeURIComponent(branch)}`,
    { headers },
  );
  const baseCommitSha: string = refRes.object.sha;
  const commitRes = await ghFetch(`${api}/git/commits/${baseCommitSha}`, {
    headers,
  });
  const baseTreeSha: string = commitRes.tree.sha;

  // 2. Upload blobs for non-delete changes.
  const treeEntries: Array<{
    path: string;
    mode: "100644";
    type: "blob";
    sha?: string | null;
  }> = [];
  for (const change of opts.changes) {
    if (change.delete) {
      treeEntries.push({
        path: change.path,
        mode: "100644",
        type: "blob",
        sha: null,
      });
      continue;
    }
    if (typeof change.content !== "string") {
      throw new Error(
        `commitChanges: missing content for write ${change.path}`,
      );
    }
    const blob = await ghFetch(`${api}/git/blobs`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        content: Buffer.from(change.content, "utf-8").toString("base64"),
        encoding: "base64",
      }),
    });
    treeEntries.push({
      path: change.path,
      mode: "100644",
      type: "blob",
      sha: blob.sha,
    });
  }

  // 3. Build the new tree on top of the base.
  const newTree = await ghFetch(`${api}/git/trees`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeEntries,
    }),
  });

  // 4. Create commit.
  const author = {
    name: opts.authorName || "rockumentation-bot",
    email: opts.authorEmail || "bot@rockumentation.local",
  };
  const newCommit = await ghFetch(`${api}/git/commits`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: opts.message,
      tree: newTree.sha,
      parents: [baseCommitSha],
      author,
      committer: author,
    }),
  });

  // 5. Fast-forward the branch.
  await ghFetch(`${api}/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  });

  const deletions = opts.changes.filter((c) => c.delete).length;
  return {
    ok: true,
    commitSha: newCommit.sha,
    commitUrl: `https://github.com/${repo}/commit/${newCommit.sha}`,
    branch,
    filesChanged: opts.changes.length - deletions,
    deletions,
  };
}

async function ghFetch(url: string, init: RequestInit): Promise<any> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GitHub ${init.method || "GET"} ${url} \u2192 ${res.status}: ${text.slice(0, 300)}`,
    );
  }
  return res.json();
}
