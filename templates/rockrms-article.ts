import type { Template } from "../src/template-engine/types";

/**
 * Mirrors the user's `.center-container` example:
 * {{selectorHtml:.center-container|remove_html:".alert-title,.article-footer"
 *   |replace:("src=\"/": "src=\"https://community.rockrms.com/")
 *   |markdown
 *   |replace:("xaml":"xml","XAMLCopy":"")}}
 */
export const rockrmsArticle: Template = {
  id: "rockrms-article",
  name: "Rock RMS Single Article",
  description:
    "Single-article Rock RMS docs page using the .center-container layout.",
  triggers: ["r:^https?://community\\.rockrms\\.com/.*"],
  noteNameFormat: "{{title}}",
  noteContentFormat:
    '{{fullHtml|selectorHtml:".center-container"' +
    '|remove_html:".alert-title,.article-footer"' +
    '|absolutize|markdown|replace:("xaml":"xml","XAMLCopy":"")}}',
  splitter: { id: "single" },
};
