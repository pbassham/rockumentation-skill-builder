import { mkdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Convert a string to a URL-safe slug for filenames and skill names.
 * Lowercase, hyphens only, no consecutive hyphens, no leading/trailing hyphens.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[''""]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Derive a skill name from a URL, optionally falling back to a page title
 * when the URL's last segment is empty, numeric, or otherwise non-descriptive
 * (e.g. `/documentation/bookcontent/39/362` → `rock-362` is useless,
 *  `pageTitle = "Engagement"` → `rock-engagement`).
 */
export function deriveSkillName(url: string, pageTitle?: string): string {
  const parsed = new URL(url);
  const segments = parsed.pathname.split("/").filter((s) => s.length > 0);
  const last = segments[segments.length - 1] || "";

  // If the URL slug is numeric / empty / single-char, prefer the page title.
  const looksUseless = !last || /^[0-9]+$/.test(last) || last.length <= 1;
  const source =
    looksUseless && pageTitle && pageTitle.trim()
      ? pageTitle.trim()
      : last || "rock-docs";

  const slug = slugify(source);
  return slug.startsWith("rock") ? slug : `rock-${slug}`;
}

/**
 * Build the print URL from a normal Rockumentation URL.
 * Appends the query params needed to get all content on one page.
 */
export function buildPrintUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("print", "true");
  url.searchParams.set("autoPrint", "false");
  url.searchParams.set("single", "false");
  return url.toString();
}

/**
 * Recursively create a directory if it doesn't exist.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

/**
 * Get the base origin for absolute URL resolution.
 */
export function getBaseOrigin(url: string): string {
  const parsed = new URL(url);
  return parsed.origin;
}
