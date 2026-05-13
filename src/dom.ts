import { parseHTML as linkedomParseHTML } from "linkedom";
import { Defuddle } from "defuddle/node";

// Install a linkedom-backed `document` global before any call into
// defuddle/full's bundled Turndown converter (which constructs a
// TurndownService that does `document.implementation.createHTMLDocument`).
// In Bun there is no DOM by default, so without this shim every call
// returns "Partial conversion completed with errors. Original HTML: ...".
// MUST happen before defuddle/full is loaded — we therefore lazy-load
// `createMarkdownContent` rather than importing it at the top of the file
// (ES module imports hoist above the side-effect block below).
{
  const { document, window } = linkedomParseHTML(
    "<!doctype html><html><body></body></html>",
  ) as any;
  const g = globalThis as any;
  if (!g.document) g.document = document;
  if (!g.window) g.window = window;
  if (!g.Node && window?.Node) g.Node = window.Node;
  if (!g.DocumentFragment && window?.DocumentFragment) {
    g.DocumentFragment = window.DocumentFragment;
  }
  if (!g.HTMLElement && window?.HTMLElement) g.HTMLElement = window.HTMLElement;
  if (!g.Element && window?.Element) g.Element = window.Element;
}

let createMarkdownContentFn: ((html: string, url: string) => string) | null =
  null;
async function loadCreateMarkdownContent() {
  if (!createMarkdownContentFn) {
    const mod = await import("defuddle/full");
    createMarkdownContentFn = mod.createMarkdownContent;
  }
  return createMarkdownContentFn!;
}
// Eagerly warm the module so the first call to `htmlToMarkdown` doesn't pay
// the lazy-import cost. (No await — fire-and-forget; failures will surface
// when the caller actually invokes the function.)
void loadCreateMarkdownContent();

/**
 * Parse an HTML string with linkedom and return a DOM `Document` plus its
 * associated `window`. linkedom is the only DOM library used in this
 * project (no cheerio, no jsdom).
 */
export function parseHTML(html: string): {
  document: Document;
  window: Window;
} {
  const { document, window } = linkedomParseHTML(html) as unknown as {
    document: Document;
    window: Window;
  };
  return { document, window };
}

/**
 * Serialize a DOM node (or document) back to an HTML string.
 */
export function serializeHTML(node: Node | Document): string {
  if ((node as Document).documentElement) {
    return (node as Document).documentElement.outerHTML;
  }
  return (node as Element).outerHTML ?? "";
}

/**
 * Convert an HTML fragment to Markdown using defuddle's bundled converter.
 * No turndown, no marked. Defuddle's `createMarkdownContent` accepts an
 * HTML string and returns markdown.
 */
export async function htmlToMarkdown(
  html: string,
  url: string = "",
): Promise<string> {
  const fn = await loadCreateMarkdownContent();
  return fn(html, url);
}

/**
 * Run defuddle against an HTML page and return the cleaned content +
 * metadata. Always parses with linkedom under the hood.
 */
export async function runDefuddle(
  html: string,
  url: string = "",
  options: Record<string, unknown> = {},
): Promise<import("defuddle").DefuddleResponse> {
  const { document } = parseHTML(html);
  return Defuddle(document, url, {
    markdown: false,
    separateMarkdown: true,
    ...options,
  });
}
