import { bestMatch } from "../src/template-engine/triggers";
import type { Template } from "../src/template-engine/types";
import { rockumentationPrint } from "./rockumentation-print";
import { rockrmsArticle } from "./rockrms-article";
import { rockTocHub } from "./rock-toc-hub";
import { rockrmsLava } from "./rockrms-lava";
import { rockrmsLavaItems } from "./rockrms-lava-items";
import { rockManual } from "./rock-manual";
import { defaultDefuddle } from "./default-defuddle";
import { rockumentationAi } from "./rockumentation-ai";

const builtin: Template[] = [
  rockumentationPrint,
  rockrmsArticle,
  rockTocHub,
  rockrmsLava,
  rockrmsLavaItems,
  rockManual,
  rockumentationAi,
  defaultDefuddle,
];

const registry = new Map<string, Template>();
for (const t of builtin) registry.set(t.id, t);

export function allTemplates(): Template[] {
  return Array.from(registry.values());
}

export function getById(id: string): Template | undefined {
  return registry.get(id);
}

export function matchByUrl(url: string): Template | undefined {
  // The `default-defuddle` template's `**` trigger will match anything;
  // bestMatch uses static-prefix length, so more specific URL-bound
  // templates win automatically.
  return bestMatch(allTemplates(), url) ?? defaultDefuddle;
}

export function registerTemplate(t: Template): void {
  registry.set(t.id, t);
}
