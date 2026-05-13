import { parseHTML, htmlToMarkdown } from "../../dom";
import type { FilterFn } from "../types";

const remove_html: FilterFn = (input, args) => {
  const selectors = flattenStrings(args).join(",");
  if (!selectors) return input;
  const { document } = parseHTML(wrap(input));
  document.querySelectorAll(selectors).forEach((n) => n.remove());
  return unwrap(document);
};

const remove_attr: FilterFn = (input, args) => {
  // Two forms:
  //   remove_attr:("style":".panel-body")  → map: attr → selector scope
  //   remove_attr:"style"                  → strip attr from all elements
  //   remove_attr:("style","class")        → strip multiple attrs from all
  const { document } = parseHTML(wrap(input));
  const map = args.find(
    (a): a is Record<string, string> =>
      typeof a === "object" && !Array.isArray(a),
  );
  if (map) {
    for (const [attr, selector] of Object.entries(map)) {
      const scope = selector || "*";
      document.querySelectorAll(scope).forEach((el) => {
        (el as Element).removeAttribute(attr);
      });
    }
    return unwrap(document);
  }
  const attrs = flattenStrings(args);
  if (attrs.length === 0) return input;
  document.querySelectorAll("*").forEach((el) => {
    for (const attr of attrs) (el as Element).removeAttribute(attr);
  });
  return unwrap(document);
};

const remove_tags: FilterFn = (input, args) => {
  const selectors = flattenStrings(args).join(",");
  if (!selectors) return input;
  const { document } = parseHTML(wrap(input));
  document.querySelectorAll(selectors).forEach((n) => n.remove());
  return unwrap(document);
};

const strip_tags: FilterFn = (input, args) => {
  // Remove the tags but keep their inner text. If args specify selectors,
  // only those are stripped; otherwise all tags are stripped.
  const { document } = parseHTML(wrap(input));
  const selectors = flattenStrings(args).join(",");
  if (selectors) {
    document.querySelectorAll(selectors).forEach((el) => el.remove());
    return unwrap(document);
  }
  return document.body?.textContent ?? "";
};

const strip_attr: FilterFn = (input, args) => {
  const attrs = flattenStrings(args);
  const { document } = parseHTML(wrap(input));
  document.querySelectorAll("*").forEach((el) => {
    if (attrs.length === 0) {
      // strip everything
      const names = Array.from((el as Element).attributes).map((a) => a.name);
      for (const n of names) (el as Element).removeAttribute(n);
    } else {
      for (const a of attrs) (el as Element).removeAttribute(a);
    }
  });
  return unwrap(document);
};

export const removeFilters: Record<string, FilterFn> = {
  remove_html,
  remove_attr,
  remove_tags,
  strip_tags,
  strip_attr,
};

function flattenStrings(args: unknown[]): string[] {
  const out: string[] = [];
  for (const a of args) {
    if (typeof a === "string") {
      out.push(
        ...a
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    } else if (Array.isArray(a)) {
      for (const x of a) if (typeof x === "string") out.push(x.trim());
    }
  }
  return out;
}

function wrap(html: string): string {
  return `<!doctype html><html><body>${html}</body></html>`;
}

function unwrap(document: Document): string {
  return document.body?.innerHTML ?? "";
}

void htmlToMarkdown; // keep import for downstream consumers
