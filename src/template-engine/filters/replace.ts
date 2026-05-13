import type { FilterFn } from "../types";

/**
 * `replace:("xaml":"xml","XAMLCopy":"")` — applies each pair as a global
 * literal replacement. Also supports the two-arg form
 * `replace:"xaml","xml"`.
 */
const replace: FilterFn = (input, args) => {
  let out = input;
  const map = args.find(
    (a): a is Record<string, string> =>
      typeof a === "object" && !Array.isArray(a),
  );
  if (map) {
    for (const [from, to] of Object.entries(map)) {
      out = out.split(from).join(to);
    }
    return out;
  }
  // two strings or [from, to]
  const flat = flattenStrings(args);
  if (flat.length >= 2) {
    out = out.split(flat[0]!).join(flat[1] ?? "");
  }
  return out;
};

const regex_replace: FilterFn = (input, args) => {
  const flat = flattenStrings(args);
  if (flat.length < 2) return input;
  return input.replace(new RegExp(flat[0]!, "g"), flat[1] ?? "");
};

export const replaceFilters: Record<string, FilterFn> = {
  replace,
  regex_replace,
};

function flattenStrings(args: unknown[]): string[] {
  const out: string[] = [];
  for (const a of args) {
    if (typeof a === "string") out.push(a);
    else if (Array.isArray(a))
      for (const x of a) if (typeof x === "string") out.push(x);
  }
  return out;
}
