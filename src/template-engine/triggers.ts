/**
 * Trigger compilation. A trigger is either:
 *   - a glob pattern matching the URL (default)
 *   - `r:<regex source>` — matches `pathname + search` as a regex
 */
export interface CompiledTrigger {
  source: string;
  /** Static prefix length used for specificity ranking. */
  specificity: number;
  test: (url: string) => boolean;
}

export function compileTrigger(source: string): CompiledTrigger {
  if (source.startsWith("r:")) {
    const re = new RegExp(source.slice(2));
    return {
      source,
      specificity: source.length,
      test: (url) => re.test(url),
    };
  }
  // Glob: `*` → `[^/]*`, `**` → `.*`. Specificity = static prefix length.
  const staticPrefix = source.split(/[*?]/)[0] ?? "";
  const escaped = source
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "\u0001")
    .replace(/\*/g, "[^/]*")
    .replace(/\u0001/g, ".*")
    .replace(/\?/g, ".");
  const re = new RegExp(`^${escaped}$`);
  return {
    source,
    specificity: staticPrefix.length,
    test: (url) => re.test(url),
  };
}

/** Pick the most-specific matching trigger across all templates. */
export function bestMatch<T extends { triggers: string[]; id: string }>(
  templates: T[],
  url: string,
): T | undefined {
  let best: { tpl: T; specificity: number } | undefined;
  for (const tpl of templates) {
    for (const t of tpl.triggers) {
      const c = compileTrigger(t);
      if (c.test(url)) {
        if (!best || c.specificity > best.specificity) {
          best = { tpl, specificity: c.specificity };
        }
      }
    }
  }
  return best?.tpl;
}
