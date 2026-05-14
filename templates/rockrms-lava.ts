import type { Template } from "../src/template-engine/types";

/**
 * User's Lava example:
 * {{selectorHtml:article|remove_attr:("style":".panel-body")
 *   |replace:("src=\"/": "src=\"https://community.rockrms.com/")
 *   |markdown
 *   |replace:("xaml":"xml","XAMLCopy":"")}}
 */
export const rockrmsLava: Template = {
  id: "rockrms-lava",
  name: "Rock RMS Lava Documentation",
  description:
    "Single-article Lava documentation pages on community.rockrms.com.",
  triggers: [
    "https://community.rockrms.com/lava/**",
    "https://community.rockrms.com/lava",
  ],
  noteNameFormat: "{{title}}",
  noteContentFormat:
    '{{fullHtml|selectorHtml:"article"' +
    '|remove_attr:("style":".panel-body")' +
    '|absolutize|markdown|replace:("xaml":"xml","XAMLCopy":"")}}',
  splitter: { id: "single" },
};
