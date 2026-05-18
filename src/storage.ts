/**
 * Tigris (S3-compatible) storage helper for publishing skills to a public gallery.
 *
 * Reads credentials from env vars provisioned by `fly storage create`:
 *   - AWS_ACCESS_KEY_ID
 *   - AWS_SECRET_ACCESS_KEY
 *   - AWS_ENDPOINT_URL_S3
 *   - AWS_REGION (optional)
 *   - BUCKET_NAME
 *
 * Object layout in the bucket:
 *   skills/<id>/skill.zip
 *   skills/<id>/meta.json
 */

import { S3Client } from "bun";

export interface SkillMeta {
  id: string;
  skillName: string;
  pageTitle: string;
  sourceUrl: string;
  articleCount: number;
  refCount: number;
  createdAt: string; // ISO timestamp
  // Optional rebuildable bundle config captured at publish time so the
  // gallery can show the full source list and offer "Open in builder".
  bundle?: unknown;
  // True for skills produced by the curated prebuild pipeline so the
  // gallery / home tiles can distinguish them from user uploads.
  curated?: boolean;
}

let cachedClient: S3Client | null = null;

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.BUCKET_NAME,
  );
}

function getClient(): S3Client {
  if (cachedClient) return cachedClient;
  if (!isStorageConfigured()) {
    throw new Error(
      "Storage is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME (and AWS_ENDPOINT_URL_S3 for Tigris).",
    );
  }
  cachedClient = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION || "auto",
    bucket: process.env.BUCKET_NAME,
  });
  return cachedClient;
}

function randomSuffix(len = 8): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

export function newSkillId(skillName: string): string {
  const safe = skillName.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  return `${safe}-${randomSuffix(8)}`;
}

export async function uploadSkill(
  id: string,
  zipBytes: ArrayBuffer | Uint8Array,
  meta: SkillMeta,
): Promise<void> {
  const client = getClient();
  await client.write(`skills/${id}/skill.zip`, zipBytes, {
    type: "application/zip",
  });
  await client.write(`skills/${id}/meta.json`, JSON.stringify(meta, null, 2), {
    type: "application/json",
  });
}

/**
 * Upload an individual skill file (e.g. SKILL.md or references/foo.md) to the
 * `files/` subprefix so the gallery detail page can browse it without
 * downloading the full zip.
 */
export async function uploadSkillFile(
  id: string,
  relativePath: string,
  content: string | Uint8Array,
): Promise<void> {
  const client = getClient();
  const safe = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (safe.split("/").some((part) => part === "..")) {
    throw new Error(`Invalid path: ${relativePath}`);
  }
  await client.write(`skills/${id}/files/${safe}`, content, {
    type: "text/markdown; charset=utf-8",
  });
}

export async function listSkillFiles(id: string): Promise<string[]> {
  const client = getClient();
  const prefix = `skills/${id}/files/`;
  const result = await client.list({ prefix });
  return (
    result.contents
      ?.map((o) => o.key)
      .filter((k): k is string => !!k)
      .map((k) => k.slice(prefix.length))
      .filter((p) => p.length > 0)
      .sort() || []
  );
}

/**
 * Delete any files under `skills/${id}/files/` that aren't in the
 * provided keep-set. Used when re-uploading a regenerated skill so
 * stale references from previous builds don't linger in S3.
 * Returns the list of deleted relative paths.
 */
export async function pruneSkillFiles(
  id: string,
  keepRelativePaths: Iterable<string>,
): Promise<string[]> {
  const client = getClient();
  const keep = new Set(keepRelativePaths);
  const existing = await listSkillFiles(id);
  const stale = existing.filter((p) => !keep.has(p));
  await Promise.all(
    stale.map((p) => client.delete(`skills/${id}/files/${p}`).catch(() => {})),
  );
  return stale;
}

export async function getSkillFileText(
  id: string,
  relativePath: string,
): Promise<string | null> {
  const client = getClient();
  const safe = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (safe.split("/").some((part) => part === "..")) return null;
  try {
    return await client.file(`skills/${id}/files/${safe}`).text();
  } catch {
    return null;
  }
}

export async function listPublicSkills(): Promise<SkillMeta[]> {
  const client = getClient();
  const result = await client.list({ prefix: "skills/" });
  const metaKeys =
    result.contents
      ?.map((o) => o.key)
      .filter((k): k is string => !!k && k.endsWith("/meta.json")) || [];

  const metas = await Promise.all(
    metaKeys.map(async (key) => {
      try {
        const text = await client.file(key).text();
        return JSON.parse(text) as SkillMeta;
      } catch {
        return null;
      }
    }),
  );

  return metas
    .filter((m): m is SkillMeta => m !== null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getSkillMeta(id: string): Promise<SkillMeta | null> {
  const client = getClient();
  try {
    const text = await client.file(`skills/${id}/meta.json`).text();
    return JSON.parse(text) as SkillMeta;
  } catch {
    return null;
  }
}

export function getSkillZipFile(id: string) {
  const client = getClient();
  return client.file(`skills/${id}/skill.zip`);
}

/** Check whether a curated/published skill exists without downloading it. */
export async function skillExists(id: string): Promise<boolean> {
  const meta = await getSkillMeta(id);
  return meta !== null;
}

/**
 * Read the timestamp of the last successful curated prebuild from S3.
 * Used so a freshly-woken Fly machine can decide whether the weekly
 * rebuild is due without scheduling a fresh run on every cold start.
 */
export async function readLastCuratedPrebuildAt(): Promise<string | null> {
  if (!isStorageConfigured()) return null;
  const client = getClient();
  try {
    const text = await client.file("meta/last-curated-prebuild.json").text();
    const parsed = JSON.parse(text) as { at?: string };
    return parsed.at ?? null;
  } catch {
    return null;
  }
}

export async function writeLastCuratedPrebuildAt(iso: string): Promise<void> {
  if (!isStorageConfigured()) return;
  const client = getClient();
  await client.write(
    "meta/last-curated-prebuild.json",
    JSON.stringify({ at: iso }, null, 2),
    { type: "application/json" },
  );
}

// ---------------------------------------------------------------------------
// Skill profiles — saved BundledSkill specs that show up in the gallery
// alongside the curated bundles. A profile is just the JSON shape from
// build-config.ts, persisted as `profiles/<id>.json`.
//
// We intentionally don't model "private" profiles: the user's note in the
// session was that everything saved is public, no auth, no per-user
// isolation. If that changes, switch to a per-user prefix.
// ---------------------------------------------------------------------------

export interface ProfileMeta {
  id: string;
  name: string;
  savedAt: string;
}

export function newProfileId(name: string): string {
  const safe = name.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  return `${safe}-${randomSuffix(6)}`;
}

export async function saveProfile(id: string, bundle: unknown): Promise<void> {
  const client = getClient();
  await client.write(
    `profiles/${id}/profile.json`,
    JSON.stringify(bundle, null, 2),
    { type: "application/json" },
  );
  // Lightweight index file so listProfiles() doesn't need to fetch every
  // profile.json just to render gallery cards.
  const meta: ProfileMeta = {
    id,
    name: (bundle as { name?: string })?.name || id,
    savedAt: new Date().toISOString(),
  };
  await client.write(
    `profiles/${id}/meta.json`,
    JSON.stringify(meta, null, 2),
    { type: "application/json" },
  );
}

export async function listProfiles(): Promise<
  { meta: ProfileMeta; profile: unknown }[]
> {
  const client = getClient();
  const result = await client.list({ prefix: "profiles/" });
  const metaKeys =
    result.contents
      ?.map((o) => o.key)
      .filter((k): k is string => !!k && k.endsWith("/meta.json")) || [];

  const out = await Promise.all(
    metaKeys.map(async (key) => {
      try {
        const meta = JSON.parse(await client.file(key).text()) as ProfileMeta;
        const profile = JSON.parse(
          await client.file(key.replace(/meta\.json$/, "profile.json")).text(),
        );
        return { meta, profile };
      } catch {
        return null;
      }
    }),
  );
  return out
    .filter((x): x is { meta: ProfileMeta; profile: unknown } => x !== null)
    .sort((a, b) => (a.meta.savedAt < b.meta.savedAt ? 1 : -1));
}

export async function getProfile(id: string): Promise<unknown | null> {
  const client = getClient();
  try {
    return JSON.parse(await client.file(`profiles/${id}/profile.json`).text());
  } catch {
    return null;
  }
}

export async function deleteProfile(id: string): Promise<void> {
  const client = getClient();
  // Best-effort delete; ignore errors on either object.
  await Promise.all([
    client.delete(`profiles/${id}/profile.json`).catch(() => {}),
    client.delete(`profiles/${id}/meta.json`).catch(() => {}),
  ]);
}
