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
  const template =
    (templateId ? getById(templateId) : matchByUrl(url)) ??
    matchByUrl(url) ??
    getById("default-defuddle")!;

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
