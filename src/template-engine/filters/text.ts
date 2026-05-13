import type { FilterFn } from "../types";

const trim: FilterFn = (input) => input.trim();
const lower: FilterFn = (input) => input.toLowerCase();
const upper: FilterFn = (input) => input.toUpperCase();

const slug: FilterFn = (input) =>
  input
    .toLowerCase()
    .replace(/[''""]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");

const split: FilterFn = (input, args) => {
  const sep = firstString(args) ?? "";
  return JSON.stringify(input.split(sep));
};

const join: FilterFn = (input, args) => {
  const sep = firstString(args) ?? "";
  try {
    const arr = JSON.parse(input);
    if (Array.isArray(arr)) return arr.join(sep);
  } catch {}
  return input;
};

const wikilink: FilterFn = (input) => `[[${input}]]`;

export const textFilters: Record<string, FilterFn> = {
  trim,
  lower,
  upper,
  slug,
  split,
  join,
  wikilink,
};

function firstString(args: unknown[]): string | undefined {
  for (const a of args) {
    if (typeof a === "string") return a;
    if (Array.isArray(a) && typeof a[0] === "string") return a[0];
  }
  return undefined;
}
