import type { Template } from "../src/template-engine/types";

export const defaultDefuddle: Template = {
  id: "default-defuddle",
  name: "Default (Defuddle)",
  description:
    "Generic catch-all: defuddle's cleaned content rendered as Markdown.",
  triggers: ["**"],
  noteNameFormat: "{{title}}",
  noteContentFormat: "# {{title}}\n\n{{contentMarkdown}}",
  splitter: { id: "single" },
};
