import { extractVariables } from "./extractors/defuddle";
import { runSplitter, type SplitArticle } from "./extractors/splitters";
import { runPipeline } from "./interpreter";
import { allTemplates, getById, matchByUrl } from "../templates";
import type { Template } from "./template-engine/types";

export interface ExtractResult {
  articles: SplitArticle[];
  pageTitle: string;
  template: Template;
}

/**
 * Top-level extractor: defuddle + interpreter pipeline + splitter.
 * If `templateId` is omitted, the registry picks the most-specific
 * template matching `url`.
 */
export async function extractWithTemplate(
  html: string,
  url: string,
  templateId?: string,
  cookie?: string,
): Promise<ExtractResult> {
  let template =
    (templateId ? getById(templateId) : matchByUrl(url)) ??
    matchByUrl(url) ??
    getById("default-defuddle")!;

  // Content-based override: the URL might be a custom domain (a church
  // hosting Rockumentation on its own server) but the page is still a
  // Rockumentation print page. The signature is `$("article").Rockumentation()`
  // in an inline script. If the user didn't pin a specific template and we
  // fell back to the generic defuddle, upgrade to `rockumentation-print`.
  if (
    !templateId &&
    template.id === "default-defuddle" &&
    looksLikeRockumentation(html)
  ) {
    const upgraded = getById("rockumentation-print");
    if (upgraded) template = upgraded;
  }

  const variables = await extractVariables(html, url);

  const { stepOutputs, promptResolutions } = await runPipeline(
    template,
    variables,
    url,
  );

  // Make pipeline outputs available as bare variables too.
  for (const [k, v] of Object.entries(stepOutputs)) {
    if (!(k in variables)) (variables as Record<string, unknown>)[k] = v;
  }

  const articles = await runSplitter({
    html,
    url,
    variables,
    template,
    stepOutputs,
    promptResolutions,
    cookie,
  });

  let pageTitle = String(variables.title || "Untitled");
  const stash = (articles[0] as any)?._pageTitle;
  if (typeof stash === "string" && stash) {
    pageTitle = stash;
    delete (articles[0] as any)._pageTitle;
  }

  return { articles, pageTitle, template };
}

export { allTemplates, getById, matchByUrl };

/**
 * Heuristic content sniffer: returns true if `html` looks like a
 * Rockumentation print/manual page regardless of the URL host. The
 * defining marker is the inline `$("article").Rockumentation()` call
 * (or the `data-article-id` attributes the plugin walks). Both are
 * unique enough that false positives are unlikely.
 */
function looksLikeRockumentation(html: string): boolean {
  // Look at the raw HTML rather than parsing — the script tag may be
  // inline, in <head>, or generated, and we don't need a DOM.
  if (/\.Rockumentation\s*\(/i.test(html)) return true;
  // Print pages always have the article carousel container with
  // multiple data-article-id attributes; require at least 2 to avoid
  // matching pages that just happen to use that attribute name.
  const matches = html.match(/data-article-id\s*=/gi);
  if (matches && matches.length >= 2) return true;
  return false;
}
