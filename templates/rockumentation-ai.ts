import type { Template } from "../src/template-engine/types";

/**
 * Demo two-stage interpreter pipeline.
 *
 * Step 1 ("find-content"): cheap model picks the best CSS selector that
 * isolates the main article container in the page.
 *
 * Step 2 ("convert-to-skill"): smart model converts that isolated HTML
 * into a markdown skill section per a custom prompt.
 */
export const rockumentationAi: Template = {
  id: "rockumentation-ai",
  name: "Rockumentation (AI-driven)",
  description:
    "Demo of a two-stage interpreter pipeline: find-content → convert-to-skill.",
  triggers: ["r:^https?://community\\.rockrms\\.com/.*\\?ai=1"],
  noteNameFormat: "{{title}}",
  noteContentFormat: "{{step:convert-to-skill}}",
  splitter: { id: "single" },
  interpreterPipeline: [
    {
      id: "find-content",
      name: "Locate the main article",
      // No modelId → uses defaultModelByRole["selector"] or defaultModelId.
      systemContext:
        "You are an HTML inspection assistant. Respond with ONLY a single CSS selector string — no explanation, no quotes, no code fences.",
      prompt:
        "Given this page (URL: {{url}}; title: {{title}}), pick the CSS selector that most precisely isolates the primary article body. Prefer selectors with high specificity. Page HTML (truncated):\n\n{{fullHtml}}",
      outputAs: "selector",
      outputFormat: "text",
      maxTokens: 64,
    },
    {
      id: "convert-to-skill",
      name: "Convert to skill section",
      systemContext:
        "You are an expert technical writer producing concise reference material for an AI agent's 'skill' library. Output Markdown only. Use ATX headings starting at H1. Preserve code blocks with language hints.",
      prompt:
        "Convert the article at {{url}} into a skill reference. The main content selector is: {{step:find-content}}.\n\nOriginal cleaned content:\n\n{{contentMarkdown}}",
      outputAs: "convert-to-skill",
      outputFormat: "markdown",
      maxTokens: 4096,
    },
  ],
};
