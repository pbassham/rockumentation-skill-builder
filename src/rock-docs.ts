/**
 * Helpers for the NEW Rock RMS documentation site (Rock v19+).
 *
 * The rebuilt site at https://community.rockrms.com/documentation
 * organizes docs as a handful of "topic" books with path-based URLs:
 *
 *   /documentation/<topic>                      — topic book root
 *   /documentation/<topic>/<section>/.../<page> — individual page
 *
 * e.g. /documentation/core-concepts/search/universal-search/intro-to-universal-search
 *
 * The legacy per-book URLs (/documentation/bookcontent/<bookId>/<versionId>)
 * keep serving Rock v18-and-earlier content and are handled by
 * `enumerateDocumentationIndex` in curated-roots.ts.
 *
 * NOTE: the topic slugs below were authored without live-site access
 * (only `core-concepts` is confirmed from search-engine results). Run
 * `bun scripts/discover-rock-docs.ts` from a networked machine to
 * verify them — `enumerateTopicBooks` exists so scheduled refreshes can
 * warn when the live site drifts from this list.
 */

export interface RockTopicBook {
  /** URL path segment under /documentation, e.g. "core-concepts". */
  slug: string;
  /** Human label shown as the source label in SKILL.md. */
  label: string;
  /** Absolute topic-root URL (renders the entire book). */
  url: string;
}

const DOCS_HOST = "community.rockrms.com";
const DOCS_ROOT = `https://${DOCS_HOST}/documentation`;

function topicBook(slug: string, label: string): RockTopicBook {
  return { slug, label, url: `${DOCS_ROOT}/${slug}` };
}

/**
 * The topic books the new documentation site is organized into.
 * Single source of truth for the v19+ curated bundles.
 */
export const ROCK_TOPIC_BOOKS: RockTopicBook[] = [
  topicBook("core-concepts", "Core Concepts"),
  topicBook("church-management", "Church Management"),
  topicBook("engagement", "Engagement"),
  topicBook("digital-publishing", "Digital Publishing"),
  topicBook("supporting-rock", "Supporting Rock"),
];

/** Path segments under /documentation that are NOT topic books. */
const NON_TOPIC_SEGMENTS = new Set(["bookcontent"]);

/**
 * Scrape the /documentation index page for topic-book roots: every
 * distinct first path segment linked under /documentation/, excluding
 * the legacy bookcontent form. Returns `[]` when `sourceUrl` isn't the
 * Rock documentation index (mirrors `enumerateDocumentationIndex`).
 *
 * Used for drift detection against `ROCK_TOPIC_BOOKS` — the curated
 * bundles hardcode their topic URLs, so a new/renamed topic on the live
 * site should surface as a warning, not silently change the bundle set.
 */
export function enumerateTopicBooks(
  html: string,
  sourceUrl: string,
): RockTopicBook[] {
  let base: URL;
  try {
    base = new URL(sourceUrl);
  } catch {
    return [];
  }
  if (base.host !== DOCS_HOST) return [];
  const path = base.pathname.replace(/\/+$/, "").toLowerCase();
  if (path !== "/documentation") return [];

  const seen = new Set<string>();
  const out: RockTopicBook[] = [];
  const re =
    /href=["']\/documentation\/([a-z0-9][a-z0-9-]*)(?:\/[^"']*)?["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const slug = m[1]!.toLowerCase();
    if (NON_TOPIC_SEGMENTS.has(slug)) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);
    const known = ROCK_TOPIC_BOOKS.find((t) => t.slug === slug);
    out.push(known ?? topicBook(slug, titleCase(slug)));
  }
  return out;
}

export interface RockTopicSection {
  /** Path relative to the topic root, e.g. "search/universal-search". */
  path: string;
  /** Final path segment. */
  slug: string;
  /** Link text (tags stripped), best-effort. */
  title: string;
  /** Nesting depth: 1 = section, 2 = subsection, 3 = page, ... */
  depth: number;
  /** Absolute URL. */
  url: string;
}

/**
 * Dump the section tree of one topic book from its rendered HTML: every
 * link pointing under `/documentation/<topicSlug>/...`, deduplicated in
 * document order. This is the raw material for authoring the future
 * functional/role-shaped v19 bundles (map sections → roles) and for
 * picking the crawl-fallback TOC selector.
 */
export function enumerateTopicSections(
  html: string,
  topicUrl: string,
): RockTopicSection[] {
  let base: URL;
  try {
    base = new URL(topicUrl);
  } catch {
    return [];
  }
  const segments = base.pathname.split("/").filter(Boolean);
  if (
    base.host !== DOCS_HOST ||
    segments[0]?.toLowerCase() !== "documentation" ||
    !segments[1]
  ) {
    return [];
  }
  const topicSlug = segments[1].toLowerCase();

  const seen = new Set<string>();
  const out: RockTopicSection[] = [];
  const re = new RegExp(
    `<a\\b[^>]*href=["'](/documentation/${topicSlug}/[^"'#?]+)["'][^>]*>([\\s\\S]*?)</a>`,
    "gi",
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[1]!.replace(/\/+$/, "");
    if (seen.has(href)) continue;
    seen.add(href);
    const rel = href.slice(`/documentation/${topicSlug}/`.length);
    const parts = rel.split("/").filter(Boolean);
    const slug = parts[parts.length - 1] ?? rel;
    const text = m[2]!
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    out.push({
      path: rel,
      slug,
      title: text || titleCase(slug),
      depth: parts.length,
      url: new URL(href, base).toString(),
    });
  }
  return out;
}

/**
 * Best-effort detection of the Rock release a documentation page was
 * built for. Primary signal: book asset URLs of the form
 *   https://rockrms.blob.core.windows.net/documentation/Books/<id>/1.19.0/images/...
 * (the old bookcontent pages embed the same pattern, so this works for
 * v18 bundles too). Returns the highest version seen, e.g. "1.19.0",
 * or null when no marker is present.
 *
 * TODO(discovery): scripts/discover-rock-docs.ts reports whether the
 * new site exposes a version selector; add that as a secondary signal
 * once its markup is known.
 */
export function detectRockDocsVersion(html: string): string | null {
  const re =
    /rockrms\.blob\.core\.windows\.net\/documentation\/Books\/\d+\/(\d+\.\d+(?:\.\d+)?)\//gi;
  let best: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const version = m[1]!;
    if (best === null || compareRockVersions(version, best) > 0) {
      best = version;
    }
  }
  return best;
}

/** Dotted-version compare, e.g. "1.19.0" vs "1.9.2". Positive when a > b. */
export function compareRockVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}
