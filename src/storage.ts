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
