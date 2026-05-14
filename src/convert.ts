/**
 * Backward-compatible shim. The historical cheerio + turndown path has
 * been replaced by `src/extract.ts` (defuddle + linkedom + splitters).
 *
 * `extractArticles` now delegates to the `rockumentation-print` template.
 * Callers that want non-Rockumentation behavior should use
 * `extractWithTemplate` from `src/extract.ts` directly.
 */

import { extractWithTemplate } from "./extract";
import type { ArticleSection } from "./convert-types";

export type { ArticleSection } from "./convert-types";

export async function extractArticles(
  html: string,
  sourceUrl: string,
): Promise<{ articles: ArticleSection[]; pageTitle: string }> {
  const { articles, pageTitle } = await extractWithTemplate(
    html,
    sourceUrl,
    "rockumentation-print",
  );
  return { articles, pageTitle };
}
