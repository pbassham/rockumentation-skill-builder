import type { Template } from "../src/template-engine/types";

/**
 * Lava filter / command catalog pages on community.rockrms.com.
 *
 * These pages list 30+ items (one per filter or command) inside
 * `.panel.panel-lavaitem` blocks — they are NOT single articles, so the
 * `rockrms-lava` template (which uses the `single` splitter and an
 * `<article>` selector) extracts almost nothing. This template targets
 * those catalog pages specifically and emits one reference file per item.
 *
 * URL examples:
 *   https://community.rockrms.com/lava/filters/text-filters
 *   https://community.rockrms.com/lava/filters/date-filters
 *   https://community.rockrms.com/lava/commands/cache
 */
export const rockrmsLavaItems: Template = {
  id: "rockrms-lava-items",
  name: "Rock RMS Lava Filter / Command Catalog",
  description:
    "Lava catalog pages where each filter or command is a `.panel-lavaitem` card. Emits one article per item.",
  // More-specific URL prefixes than `rockrms-lava` so `bestMatch` picks
  // this template for catalog pages while `rockrms-lava` still wins for
  // top-level Lava docs.
  triggers: [
    "https://community.rockrms.com/lava/filters/**",
    "https://community.rockrms.com/lava/commands/**",
  ],
  noteNameFormat: "{{title}}",
  // Body template is unused for `by-selector` (each match is rendered
  // directly), but kept as a fallback if the selector misses.
  noteContentFormat: "{{contentMarkdown}}",
  splitter: {
    id: "by-selector",
    selector: ".panel.panel-lavaitem",
    titleSelector: ".panel-title",
  },
};
