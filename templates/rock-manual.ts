import type { Template } from "../src/template-engine/types";

/**
 * Rock RMS manual / book pages.
 *
 * URLs like `https://community.rockrms.com/documentation/bookcontent/<bookId>/<versionId>`
 * render an entire manual as one long page. Sidebar `.book-toc` lists each
 * chapter, and the body contains a series of `<section data-type="sect1">`
 * blocks — one per chapter — each starting with an `<h1>` whose text is the
 * chapter title.
 *
 * Default defuddle extraction collapses all chapters into a single article
 * and the URL has no usable slug (just a numeric book id), so we:
 *   - split on `section[data-type="sect1"]` to emit one reference per chapter
 *   - take the chapter `<h1>` as the title (stripping the in-page anchor link)
 *   - rely on `splitBySelector`'s page-title fallback (first `<h1>` on the
 *     page, e.g. "Engagement") so `deriveSkillName` produces something
 *     meaningful like `rock-engagement` instead of `rock-362`.
 *
 * URL examples:
 *   https://community.rockrms.com/documentation/bookcontent/39/362  (Engagement)
 *   https://community.rockrms.com/documentation/bookcontent/8/76    (Admin Hero Guide)
 */
export const rockManual: Template = {
  id: "rock-manual",
  name: "Rock RMS Manual / Book",
  description:
    'Long-form Rock manuals rendered as a single page (documentation/bookcontent/...). Splits each `<section data-type="sect1">` chapter into its own reference file.',
  triggers: ["https://community.rockrms.com/documentation/bookcontent/**"],
  noteNameFormat: "{{title}}",
  noteContentFormat: "{{contentMarkdown}}",
  splitter: {
    id: "by-toc-anchors",
    tocSelector: "#toc a[href^='#']",
  },
};
