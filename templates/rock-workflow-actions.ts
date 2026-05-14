import type { Template } from "../src/template-engine/types";

/**
 * Rock RMS Workflow Actions hub.
 *
 *   https://community.rockrms.com/WorkflowActions
 *
 * The hub page itself only carries a short blurb; the real content lives on
 * 15 category pages linked from a `<div class="book-toc small-toc">` sidebar:
 *
 *   <a href="/WorkflowActionCategory?Category=16">AI</a>
 *   <a href="/WorkflowActionCategory?Category=14">Assessments</a>
 *   …
 *
 * Each category page contains many `<div class="panel panel-actionitem">`
 * blocks (one per action). We treat each category as a single reference file
 * so the resulting skill has one ref per category with the full set of
 * actions inside.
 */
export const rockWorkflowActions: Template = {
  id: "rock-workflow-actions",
  name: "Rock RMS Workflow Actions",
  description:
    "Workflow Actions hub at /WorkflowActions. Walks the sidebar TOC of `/WorkflowActionCategory?Category=N` links and emits one reference file per action category.",
  triggers: [
    // Case-sensitive regex, more specific than the rockumentation-print
    // catch-all so this template wins for the WorkflowActions hub.
    "r:^https://community\\.rockrms\\.com/WorkflowActions/?$",
  ],
  noteNameFormat: "{{title}}",
  // Render each fetched category page: keep just the main content zone
  // (skips sidebar / nav / page header) and convert to markdown.
  noteContentFormat:
    '{{fullHtml|selectorHtml:"#zone-main .zone-content"' +
    "|absolutize|markdown}}",
  splitter: {
    id: "by-toc-pages",
    tocSelector: ".book-toc",
    // Allow the category listing pages even though their pathname differs
    // from the hub's `/workflowactions` base path.
    urlIncludes: ["/workflowactioncategory"],
  },
};
