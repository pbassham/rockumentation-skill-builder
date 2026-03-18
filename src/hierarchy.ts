import type { CheerioAPI } from "cheerio";

export interface TocEntry {
  /** The article ID from data-article-id */
  articleId: string;
  /** Display title from the TOC link text */
  title: string;
  /** URL path from the TOC link href (e.g. /developer/developer-codex/coding-standards/rules) */
  url: string;
  /** Depth relative to the root article (root = 0) */
  depth: number;
  /** Parent article's URL, or null for root */
  parentUrl: string | null;
  /** Breadcrumb trail of titles from root to this article */
  breadcrumb: string[];
}

/**
 * Parse the left-container TOC to build a map of article IDs → hierarchy info.
 * Uses URL path depth to determine parent-child relationships.
 */
export function parseToc(
  $: CheerioAPI,
  rootUrl: string,
): Map<string, TocEntry> {
  const rootPath = new URL(rootUrl).pathname.replace(/\/+$/, "");
  const entries = new Map<string, TocEntry>();
  const urlToTitle = new Map<string, string>();

  // First pass: extract all TOC entries (article-id, title, url)
  const rawEntries: { articleId: string; title: string; url: string }[] = [];
  const left = $(".doc-container .left-container");

  left.find("li[data-article-id]").each((_, el) => {
    const $li = $(el);
    const articleId = $li.attr("data-article-id");
    const $a = $li.find("a").first();
    const title = $a.text().trim();
    const url = ($a.attr("href") || "").replace(/\/+$/, "");

    if (articleId && title && url) {
      rawEntries.push({ articleId, title, url });
      urlToTitle.set(url, title);
    }
  });

  // Second pass: compute depth, parent, and breadcrumb for each entry
  for (const entry of rawEntries) {
    const relativePath = entry.url.startsWith(rootPath)
      ? entry.url.slice(rootPath.length)
      : entry.url;
    const segments = relativePath.split("/").filter((s) => s.length > 0);
    const depth = segments.length; // root article has 0 segments

    // Find parent URL by removing the last segment
    let parentUrl: string | null = null;
    if (segments.length > 0) {
      const parentPath = rootPath + "/" + segments.slice(0, -1).join("/");
      const normalizedParent = parentPath.replace(/\/+$/, "");
      // Only set parent if it's a known article
      if (urlToTitle.has(normalizedParent) || normalizedParent === rootPath) {
        parentUrl = normalizedParent;
      }
    }

    // Build breadcrumb: walk from root through each segment's URL
    const breadcrumb: string[] = [];
    for (let i = 0; i <= segments.length; i++) {
      const crumbPath =
        i === 0 ? rootPath : rootPath + "/" + segments.slice(0, i).join("/");
      const crumbTitle = urlToTitle.get(crumbPath);
      if (crumbTitle) {
        breadcrumb.push(crumbTitle);
      }
    }

    entries.set(entry.articleId, {
      articleId: entry.articleId,
      title: entry.title,
      url: entry.url,
      depth,
      parentUrl,
      breadcrumb,
    });
  }

  return entries;
}

export interface HierarchyNode {
  entry: TocEntry;
  children: HierarchyNode[];
}

/**
 * Build a tree from the flat TOC entries based on URL paths.
 */
export function buildTree(
  entries: Map<string, TocEntry>,
): HierarchyNode | null {
  const urlToNode = new Map<string, HierarchyNode>();
  let root: HierarchyNode | null = null;

  // Create nodes for all entries
  for (const entry of entries.values()) {
    urlToNode.set(entry.url, { entry, children: [] });
  }

  // Wire up parent-child relationships
  for (const node of urlToNode.values()) {
    if (node.entry.depth === 0) {
      root = node;
    } else if (node.entry.parentUrl) {
      const parent = urlToNode.get(node.entry.parentUrl);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  return root;
}
