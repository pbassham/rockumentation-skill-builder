import type { Template } from "../src/template-engine/types";

/**
 * Rock RMS documentation hub pages.
 *
 * Hub pages like `https://community.rockrms.com/Lava` and
 * `https://community.rockrms.com/styling` consist of a sidebar table of
 * contents that links out to many separate sub-pages. The hub page itself
 * has no useful body content. The `by-toc-pages` splitter walks the TOC,
 * fetches each linked page, runs defuddle on it, and emits one reference
 * file per page in a single combined skill.
 *
 * The TOC sidebar is rendered as `<div class="book-toc small-toc full-height">`
 * containing `<h6>` section headers and nested `<a href>` links pointing at
 * the child pages (mostly `/lava/...`, `/styling/...`).
 *
 * Default include filter (no `urlIncludes` configured) keeps only same-origin
 * links whose pathname starts with the hub page's pathname, so external
 * links (`/developer/helix`) and unrelated `/page/3759` links are skipped.
 *
 * Triggers cover both casings (`/Lava` and `/lava`) so we win against the
 * single-article `rockrms-lava` template for the exact hub URL — child
 * pages like `/lava/commands/cache` continue to use that single-article
 * template since they don't match these exact triggers.
 */
export const rockTocHub: Template = {
  id: "rock-toc-hub",
  name: "Rock RMS Documentation Hub (TOC pages)",
  description:
    "Rock RMS documentation hub pages with a sidebar TOC linking to many child pages (e.g. /Lava, /styling). Use when the URL is the root of a Rock docs section that itself has no meaningful body content. Walks the sidebar TOC and emits one reference file per linked sub-page.",
  triggers: [
    // Use regex form so specificity (source length) outranks the catch-all
    // `r:^https?://community\.rockrms\.com/.*` regex on rockumentation-print.
    "r:^https://community\\.rockrms\\.com/(Lava|lava|Styling|styling)/?$",
  ],
  noteNameFormat: "{{title}}",
  // Use the lava-style DSL on each fetched sub-page so that:
  //   - `selectorHtml:"article"` keeps just the article body
  //   - `remove_attr:("style":".panel-body")` strips inline `display:none`
  //     from collapsed accordion panels so their content is exposed
  //   - `remove_html` drops decorative anchors and the "Show Details"
  //     toggle that bleed into the markdown
  //   - `absolutize` rewrites `/...` asset URLs to community.rockrms.com
  //   - `markdown` wraps bare `<pre>` in `<code>` so code stays fenced
  //     and normalises `&nbsp;` → space (fixes leading-NBSP in headings)
  //   - `replace` cleans up XAML labels
  noteContentFormat:
    '{{fullHtml|selectorHtml:"article"' +
    '|remove_attr:("style":".panel-body")' +
    '|remove_html:".rollover-link",".example-toggle"' +
    "|absolutize|markdown" +
    '|replace:("xaml":"xml","XAMLCopy":"")}}',
  splitter: {
    id: "by-toc-pages",
    tocSelector: ".book-toc",
  },
};
