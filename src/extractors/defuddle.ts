import { runDefuddle } from "../dom";
import type { Variables } from "../template-engine/types";

/**
 * Run defuddle against an HTML page and produce the variable map that
 * downstream templates / interpreter steps consume.
 */
export async function extractVariables(
  html: string,
  url: string,
): Promise<Variables> {
  const result = await runDefuddle(html, url, {
    markdown: false,
    separateMarkdown: true,
  });
  const baseOrigin = safeOrigin(url);
  const now = new Date();
  return {
    content: result.content,
    contentMarkdown: result.contentMarkdown ?? "",
    fullHtml: html,
    title: result.title ?? "",
    author: result.author ?? "",
    description: result.description ?? "",
    published: result.published ?? "",
    image: result.image ?? "",
    domain: result.domain ?? safeHostname(url),
    site: result.site ?? "",
    language: result.language ?? "",
    wordCount: result.wordCount ?? 0,
    favicon: result.favicon ?? "",
    meta: indexMetaTags(result.metaTags ?? []),
    schema: result.schemaOrgData ?? {},
    url,
    baseOrigin,
    date: now.toISOString().slice(0, 10),
    now: now.toISOString(),
    /** Pre-computed defuddle response in case advanced templates need it. */
    _defuddle: result,
  } as Variables;
}

function indexMetaTags(
  tags: Array<{
    name?: string | null;
    property?: string | null;
    content: string | null;
  }>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const t of tags) {
    const k = t.name || t.property;
    if (k && t.content) out[k] = t.content;
  }
  return out;
}

function safeOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}
