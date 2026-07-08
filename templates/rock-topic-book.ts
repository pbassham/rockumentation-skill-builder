import type { Template } from "../src/template-engine/types";

/**
 * Rock RMS topic books on the NEW documentation site (Rock v19+).
 *
 * The rebuilt site organizes docs as a handful of topic books —
 * Core Concepts, Church Management, Engagement, Digital Publishing,
 * Supporting Rock — whose roots live directly under `/documentation`:
 *
 *   https://community.rockrms.com/documentation/core-concepts
 *
 * A topic root renders the ENTIRE book (same Rockumentation engine as
 * the classic print pages), so the standard `by-toc-links` splitter
 * applies. Deep pages use path-based URLs
 * (`/documentation/core-concepts/search/universal-search/intro-to-...`)
 * which give the splitter far better slugs than the old numeric
 * `bookcontent/<bookId>/<versionId>` form.
 *
 * The trigger matches ONLY single-segment topic roots:
 *   - `/documentation` itself → not matched (index page)
 *   - `/documentation/bookcontent/...` → not matched (legacy books,
 *     handled by `rock-manual`)
 *   - `/documentation/core-concepts/search/...` → not matched (deep
 *     pages fall through to `rockumentation-print`)
 * The long regex source outranks rockumentation-print's catch-all in
 * `bestMatch` specificity ranking (source length), same trick as
 * `rock-toc-hub`.
 */
export const rockTopicBook: Template = {
  id: "rock-topic-book",
  name: "Rock RMS Topic Book (new docs, v19+)",
  description:
    "Topic-book root on the rebuilt Rock documentation site (e.g. /documentation/core-concepts). Renders the whole book on one page; splits one reference per article via the TOC.",
  triggers: [
    "r:^https?://community\\.rockrms\\.com/documentation/(?!bookcontent(?:/|$))[a-z0-9-]+/?$",
  ],
  noteNameFormat: "{{title}}",
  // For by-toc-links, the splitter renders each article itself; this
  // body template is only used as a fallback.
  noteContentFormat: "{{contentMarkdown}}",
  splitter: { id: "by-toc-links" },
};

/**
 * Fallback for topic books when the root page does NOT render the full
 * book in print mode (zero articles extracted): crawl the sidebar TOC
 * and fetch each linked page instead, like the `/Lava` hub template.
 *
 * No URL triggers — only reachable explicitly via `templateId` or the
 * automatic zero-article retry in `extractWithTemplate`.
 *
 * TODO(discovery): `.book-toc` mirrors the classic hub sidebar; confirm
 * the real selector with `bun scripts/discover-rock-docs.ts` once run
 * from a networked machine.
 */
export const rockTopicBookCrawl: Template = {
  id: "rock-topic-book-crawl",
  name: "Rock RMS Topic Book (crawl fallback)",
  description:
    "Crawl fallback for new-docs topic books: walks the sidebar TOC and fetches each linked page. Used automatically when rock-topic-book extracts zero articles.",
  triggers: [],
  noteNameFormat: "{{title}}",
  noteContentFormat:
    '{{fullHtml|selectorHtml:"article"|absolutize|markdown}}',
  splitter: {
    id: "by-toc-pages",
    tocSelector: ".book-toc",
  },
};
