import type { Template } from "../src/template-engine/types";

export const rockumentationPrint: Template = {
  id: "rockumentation-print",
  name: "Rockumentation Print Page",
  description:
    "Multi-article print page from community.rockrms.com. Walks the .left-container TOC and emits one markdown article per data-article-id.",
  triggers: [
    "https://community.rockrms.com/**",
    "r:^https?://community\\.rockrms\\.com/.*",
  ],
  noteNameFormat: "{{title}}",
  // For by-toc-links, the splitter renders each article itself; this body
  // template is only used as a fallback.
  noteContentFormat: "{{contentMarkdown}}",
  splitter: { id: "by-toc-links" },
};
