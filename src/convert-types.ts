/**
 * Article + TOC types shared by the legacy `convert.ts` and new
 * extractor pipeline. Lives in its own module so neither imports cheerio.
 */

export interface TocEntry {
  articleId: string;
  title: string;
  url: string;
  depth: number;
  parentUrl: string | null;
  breadcrumb: string[];
  /**
   * If true, this entry is a synthetic group/section header rather than a
   * fetched page. Renderers should skip writing a reference file for it
   * and display it as a non-link group label in the SKILL.md Topics tree.
   */
  isSection?: boolean;
}

export interface ArticleSection {
  articleId: string;
  title: string;
  slug: string;
  content: string;
  toc: TocEntry;
}
