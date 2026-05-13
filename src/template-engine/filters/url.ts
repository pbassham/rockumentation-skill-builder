import { parseHTML } from "../../dom";
import type { FilterFn } from "../types";

/**
 * Rewrite root-relative `href` and `src` attributes to absolute URLs.
 * Operates on an HTML string.
 */
const absolutize: FilterFn = (input, _args, ctx) => {
  if (!ctx.baseOrigin) return input;
  const { document } = parseHTML(wrap(input));
  document.querySelectorAll("a[href]").forEach((el) => {
    const href = (el as Element).getAttribute("href");
    if (href && href.startsWith("/")) {
      (el as Element).setAttribute("href", `${ctx.baseOrigin}${href}`);
    }
  });
  document.querySelectorAll("img[src]").forEach((el) => {
    const src = (el as Element).getAttribute("src");
    if (src && src.startsWith("/")) {
      (el as Element).setAttribute("src", `${ctx.baseOrigin}${src}`);
    }
  });
  return document.body?.innerHTML ?? "";
};

const domain: FilterFn = (input) => {
  try {
    return new URL(input).hostname;
  } catch {
    return input;
  }
};

export const urlFilters: Record<string, FilterFn> = { absolutize, domain };

function wrap(html: string): string {
  return `<!doctype html><html><body>${html}</body></html>`;
}
