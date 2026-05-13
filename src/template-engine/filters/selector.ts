import { parseHTML } from "../../dom";
import type { FilterFn } from "../types";

const selector: FilterFn = (input, args) => {
  const sel = firstString(args);
  if (!sel) return input;
  const { document } = parseHTML(wrap(input));
  const el = document.querySelector(sel);
  return el?.textContent ?? "";
};

const selectorHtml: FilterFn = (input, args) => {
  const sel = firstString(args);
  if (!sel) return input;
  const { document } = parseHTML(wrap(input));
  const el = document.querySelector(sel);
  return (el as Element | null)?.outerHTML ?? "";
};

export const selectorFilters: Record<string, FilterFn> = {
  selector,
  selectorHtml,
};

function firstString(args: unknown[]): string | undefined {
  for (const a of args) {
    if (typeof a === "string") return a;
    if (Array.isArray(a) && typeof a[0] === "string") return a[0];
  }
  return undefined;
}

function wrap(html: string): string {
  return `<!doctype html><html><body>${html}</body></html>`;
}
