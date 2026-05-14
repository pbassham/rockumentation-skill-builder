import { htmlToMarkdown, parseHTML, serializeHTML } from "../../dom";
import type { FilterFn } from "../types";

/**
 * Convert HTML to markdown. Pre-processing applied to keep code/heading
 * formatting clean:
 *   - bare `<pre>` blocks (no `<code>` child) get their contents wrapped
 *     in `<code>` so Turndown emits a fenced code block
 *   - U+00A0 (`&nbsp;`) is normalised to a regular space so headings
 *     don't end up with a leading non-breaking space
 */
const markdown: FilterFn = async (input, _args, ctx) => {
  const prepared = preprocessForMarkdown(input);
  return await htmlToMarkdown(prepared, ctx.url);
};

function preprocessForMarkdown(html: string): string {
  if (!html) return html;
  const { document } = parseHTML(
    `<!doctype html><html><body>${html}</body></html>`,
  );

  // Wrap bare <pre> contents in <code> so Turndown produces fenced blocks.
  document.querySelectorAll("pre").forEach((pre) => {
    const el = pre as Element;
    const hasCode = Array.from(el.childNodes).some(
      (n: any) => (n.tagName || "").toLowerCase() === "code",
    );
    if (hasCode) return;
    const code = document.createElement("code");
    code.innerHTML = el.innerHTML;
    el.innerHTML = "";
    el.appendChild(code);
  });

  const body = document.body;
  const html2 = body ? body.innerHTML : serializeHTML(document);
  // Normalise non-breaking spaces to regular spaces.
  return html2.replace(/\u00A0/g, " ");
}

export const markdownFilters: Record<string, FilterFn> = { markdown };
