/**
 * Public TOC types. The TOC walker now lives inside the `by-toc-links`
 * splitter (linkedom-based) — `parseToc` is no longer exported.
 */
export type { TocEntry } from "./convert-types";
export type { ArticleSection } from "./convert-types";

import type { TocEntry } from "./convert-types";

export interface HierarchyNode {
  entry: TocEntry;
  children: HierarchyNode[];
}

/** Build a tree from flat TOC entries based on URL paths. */
export function buildTree(
  entries: Map<string, TocEntry>,
): HierarchyNode | null {
  const urlToNode = new Map<string, HierarchyNode>();
  let root: HierarchyNode | null = null;
  for (const entry of entries.values()) {
    urlToNode.set(entry.url, { entry, children: [] });
  }
  for (const node of urlToNode.values()) {
    if (node.entry.depth === 0) {
      root = node;
    } else if (node.entry.parentUrl) {
      const parent = urlToNode.get(node.entry.parentUrl);
      if (parent) parent.children.push(node);
    }
  }
  return root;
}
