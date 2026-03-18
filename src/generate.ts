import { readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ensureDir } from "./utils";
import type { ArticleSection } from "./convert";
import { buildTree, type HierarchyNode, type TocEntry } from "./hierarchy";
import { parseFrontmatter } from "./frontmatter";

interface GenerateOptions {
  skillName: string;
  pageTitle: string;
  sourceUrl: string;
  articles: ArticleSection[];
  outputDir: string;
  customInstructions?: string;
  /** Merge leaf articles shorter than this many lines into their parent file (0 = disabled) */
  mergeThreshold?: number;
}

/**
 * Generate a complete Agent Skills directory from parsed articles.
 */
export async function generateSkill(opts: GenerateOptions): Promise<string> {
  const skillDir = join(opts.outputDir, opts.skillName);
  const refsDir = join(skillDir, "references");
  const mergeThreshold = opts.mergeThreshold ?? 0;

  await ensureDir(skillDir);

  // Separate root article from child articles
  const rootArticle = opts.articles.find((a) => a.toc.depth === 0);
  const childArticles = opts.articles.filter((a) => a.toc.depth > 0);

  if (childArticles.length > 0) {
    await ensureDir(refsDir);
  }

  // Build the TOC hierarchy tree for the SKILL.md
  const tocMap = new Map<string, TocEntry>();
  for (const article of opts.articles) {
    tocMap.set(article.articleId, article.toc);
  }
  const tree = buildTree(tocMap);

  // Identify articles to merge into their parent
  const articleMap = new Map<string, ArticleSection>();
  for (const a of childArticles) articleMap.set(a.articleId, a);

  const mergeMap =
    mergeThreshold > 0 && tree
      ? identifyMerges(tree, articleMap, mergeThreshold)
      : new Map<string, string>(); // articleId → parentArticleId

  const mergedIds = new Set(mergeMap.keys());

  // Collect existing AI-generated descriptions from reference files
  const descriptionMap = new Map<string, string>();
  for (const article of childArticles) {
    if (mergedIds.has(article.articleId)) continue;
    try {
      const file = Bun.file(join(refsDir, `${article.slug}.md`));
      if (await file.exists()) {
        const { description } = parseFrontmatter(await file.text());
        if (description) {
          descriptionMap.set(article.articleId, description);
        }
      }
    } catch {}
  }

  // Build slug map for all articles (needed for TOC and merge targets)
  const slugMap = new Map<string, string>();
  for (const article of opts.articles) {
    slugMap.set(article.articleId, article.slug);
  }

  // Group merged articles by their parent
  const mergedChildren = new Map<string, ArticleSection[]>();
  for (const [childId, parentId] of mergeMap) {
    const child = articleMap.get(childId);
    if (!child) continue;
    const list = mergedChildren.get(parentId) || [];
    list.push(child);
    mergedChildren.set(parentId, list);
  }

  // Build SKILL.md
  const skillMd = buildSkillMd(
    opts,
    rootArticle,
    childArticles,
    tree,
    descriptionMap,
    mergeMap,
    slugMap,
  );
  await writeFile(join(skillDir, "SKILL.md"), skillMd, "utf-8");

  const standaloneCount = childArticles.filter(
    (a) => !mergedIds.has(a.articleId),
  ).length;
  const mergedCount = mergedIds.size;
  console.log(`  Written: SKILL.md (${skillMd.split("\n").length} lines)`);
  if (mergedCount > 0) {
    console.log(
      `  Merged ${mergedCount} small articles into parents (${standaloneCount} reference files)`,
    );
  }

  // Write reference files (only for non-merged articles)
  for (const article of childArticles) {
    if (mergedIds.has(article.articleId)) continue;

    const filename = `${article.slug}.md`;
    const filepath = join(refsDir, filename);

    // Add breadcrumb + description at top of each reference file
    const breadcrumb = article.toc.breadcrumb.join(" > ");
    const summary = extractSummary(article.content);
    const descLine = summary ? `\n> ${summary}\n` : "";
    let content = `> **Path:** ${breadcrumb}${descLine}\n${article.content}\n`;

    // Append merged children content
    const children = mergedChildren.get(article.articleId);
    if (children) {
      for (const child of children) {
        const childBreadcrumb = child.toc.breadcrumb.join(" > ");
        content += `\n---\n\n## ${child.title} {#${child.slug}}\n\n`;
        content += `> **Path:** ${childBreadcrumb}\n\n`;
        content += `${child.content}\n`;
      }
    }

    // Preserve existing AI-generated description in frontmatter
    const existingDesc = descriptionMap.get(article.articleId);
    if (existingDesc) {
      content = `---\ndescription: "${existingDesc.replace(/"/g, '\\"')}"\n---\n${content}`;
    }

    await writeFile(filepath, content, "utf-8");
    console.log(
      `  Written: references/${filename} (${content.split("\n").length} lines)`,
    );
  }

  // Clean up stale reference files that are no longer needed (e.g. merged into parents)
  const writtenSlugs = new Set(
    childArticles.filter((a) => !mergedIds.has(a.articleId)).map((a) => a.slug),
  );
  const existingFiles = await readdir(refsDir).catch(() => [] as string[]);
  let removed = 0;
  for (const file of existingFiles) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    if (!writtenSlugs.has(slug)) {
      await unlink(join(refsDir, file));
      removed++;
    }
  }
  if (removed > 0) {
    console.log(`  Removed ${removed} stale reference files`);
  }

  return skillDir;
}

/**
 * Identify leaf articles that should be merged into their parent file.
 * Walks the tree bottom-up, merging leaves under the line threshold.
 * Cascades: after merging all children into a parent, the parent may itself become a leaf.
 */
function identifyMerges(
  root: HierarchyNode,
  articleMap: Map<string, ArticleSection>,
  threshold: number,
): Map<string, string> {
  const mergeMap = new Map<string, string>(); // childArticleId → parentArticleId

  function getLineCount(articleId: string): number {
    const article = articleMap.get(articleId);
    return article ? article.content.split("\n").length : Infinity;
  }

  function walk(node: HierarchyNode): void {
    // Process children first (bottom-up)
    for (const child of node.children) {
      walk(child);
    }

    // A node is a leaf if all its children have been merged away
    const remainingChildren = node.children.filter(
      (c) => !mergeMap.has(c.entry.articleId),
    );

    if (remainingChildren.length > 0) return; // still has unmerged children
    if (node.entry.depth === 0) return; // never merge the root
    if (
      node.children.length === 0 &&
      getLineCount(node.entry.articleId) >= threshold
    )
      return; // leaf too large

    // If this node originally had children but they all got merged, it's now a leaf.
    // Check if this newly-leafed node is also small enough to merge up.
    if (node.children.length > 0) {
      // Calculate combined size: this node + all its merged descendants
      let combinedLines = getLineCount(node.entry.articleId);
      for (const child of node.children) {
        combinedLines += getLineCount(child.entry.articleId);
      }
      if (combinedLines >= threshold) return; // combined content too large
    }

    // Mark for merging if it has a parent
    if (node.entry.parentUrl) {
      // Find parent's articleId by matching URL
      for (const [articleId, article] of articleMap) {
        if (article.toc.url === node.entry.parentUrl) {
          mergeMap.set(node.entry.articleId, articleId);
          break;
        }
      }
      // Also re-parent any children that were already merged into this node
      for (const child of node.children) {
        if (mergeMap.has(child.entry.articleId)) {
          const grandparentTarget = mergeMap.get(node.entry.articleId);
          if (grandparentTarget) {
            mergeMap.set(child.entry.articleId, grandparentTarget);
          }
        }
      }
    }
  }

  for (const child of root.children) {
    walk(child);
  }

  return mergeMap;
}

function buildSkillMd(
  opts: GenerateOptions,
  rootArticle: ArticleSection | undefined,
  childArticles: ArticleSection[],
  tree: HierarchyNode | null,
  descriptionMap: Map<string, string>,
  mergeMap: Map<string, string>,
  slugMap: Map<string, string>,
): string {
  const { skillName, pageTitle, sourceUrl } = opts;

  const description = buildDescription(pageTitle, sourceUrl, opts.articles);

  // YAML frontmatter (Claude.ai only allows name + description)
  const frontmatter = [
    "---",
    `name: ${skillName}`,
    `description: ${yamlEscape(description)}`,
    "---",
  ].join("\n");

  const bodyParts: string[] = [];

  // Source metadata as body comment
  bodyParts.push(
    `> **Source:** ${sourceUrl}  \n> **Generated:** ${new Date().toISOString().split("T")[0]}`,
  );

  // Add overview content (keep concise for SKILL.md)
  if (rootArticle) {
    const overviewLines = rootArticle.content.split("\n");
    const truncated =
      overviewLines.length > 30
        ? overviewLines.slice(0, 30).join("\n") +
          "\n\n*See reference files for full content.*"
        : rootArticle.content;
    bodyParts.push(truncated);
  }

  // Add custom instructions if provided
  if (opts.customInstructions) {
    bodyParts.push("\n## Additional Instructions\n");
    bodyParts.push(opts.customInstructions);
  }

  // Build summary map for TOC
  const summaryMap = new Map<string, string>();
  for (const article of opts.articles) {
    summaryMap.set(article.articleId, extractSummary(article.content));
  }

  // Add hierarchical table of contents with descriptions
  if (tree && tree.children.length > 0) {
    bodyParts.push("\n## Topics\n");
    bodyParts.push(
      renderTreeToc(
        tree.children,
        0,
        slugMap,
        summaryMap,
        descriptionMap,
        mergeMap,
      ),
    );
  }

  const body = bodyParts.join("\n");
  return `${frontmatter}\n\n${body}\n`;
}

/**
 * Recursively render a tree of articles as an indented markdown list.
 * Merged articles link to anchors within their parent's file.
 */
function renderTreeToc(
  nodes: HierarchyNode[],
  indent: number,
  slugMap: Map<string, string>,
  summaryMap: Map<string, string>,
  descriptionMap: Map<string, string>,
  mergeMap: Map<string, string>,
): string {
  const lines: string[] = [];
  const prefix = "  ".repeat(indent);

  for (const node of nodes) {
    const slug =
      slugMap.get(node.entry.articleId) ||
      node.entry.url
        .split("/")
        .filter((s) => s.length > 0)
        .pop() ||
      "unknown";
    const summary =
      descriptionMap.get(node.entry.articleId) ||
      summaryMap.get(node.entry.articleId) ||
      "";
    const desc = summary ? ` — ${summary}` : "";

    const mergedIntoId = mergeMap.get(node.entry.articleId);
    if (mergedIntoId) {
      // This article was merged into its parent — link to anchor within parent file
      const parentSlug = slugMap.get(mergedIntoId) || "unknown";
      lines.push(
        `${prefix}- [${node.entry.title}](references/${parentSlug}.md#${slug})${desc}`,
      );
    } else {
      lines.push(
        `${prefix}- [${node.entry.title}](references/${slug}.md)${desc}`,
      );
    }

    if (node.children.length > 0) {
      lines.push(
        renderTreeToc(
          node.children,
          indent + 1,
          slugMap,
          summaryMap,
          descriptionMap,
          mergeMap,
        ),
      );
    }
  }

  return lines.join("\n");
}

/**
 * Strip emoji characters from a string.
 */
function stripEmoji(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,
      "",
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildDescription(
  pageTitle: string,
  _sourceUrl: string,
  articles: ArticleSection[],
): string {
  const cleanTitle = stripEmoji(pageTitle);

  // Collect top-level category titles (strip emojis)
  const topLevel = articles
    .filter((a) => a.toc.depth === 1)
    .map((a) => stripEmoji(a.title))
    .filter((t) => t.length > 0);

  // Claude.ai enforces a 200 character max for descriptions
  const MAX_DESC = 200;

  // Try with topics list first
  const withTopics =
    `Rock RMS ${cleanTitle.toLowerCase()} — building, configuring, or troubleshooting. ` +
    `Covers: ${topLevel.join(", ")}.`;
  if (withTopics.length <= MAX_DESC) return withTopics;

  // Progressively drop topics until it fits
  let topics = [...topLevel];
  while (topics.length > 0) {
    const attempt =
      `Rock RMS ${cleanTitle.toLowerCase()} — building, configuring, or troubleshooting. ` +
      `Covers: ${topics.join(", ")}.`;
    if (attempt.length <= MAX_DESC) return attempt;
    topics.pop();
  }

  // Fallback without topics
  const short = `Rock RMS ${cleanTitle.toLowerCase()} — building, configuring, or troubleshooting.`;
  return short.length > MAX_DESC ? short.slice(0, MAX_DESC - 3) + "..." : short;
}

/**
 * Extract a short summary from an article's markdown content.
 * Takes the first meaningful paragraph (not a heading, not empty).
 */
function extractSummary(markdown: string): string {
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip headings, empty lines, images, blockquotes, lists, tables, code fences
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("!") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("```")
    ) {
      continue;
    }
    // Strip markdown formatting for a clean summary
    let summary = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1") // bold/italic → text
      .replace(/`([^`]+)`/g, "$1"); // inline code → text
    // Truncate to ~120 chars at a word boundary
    if (summary.length > 120) {
      summary = summary.slice(0, 117).replace(/\s+\S*$/, "") + "...";
    }
    return summary;
  }
  return "";
}

/**
 * Update SKILL.md TOC descriptions in-place from a slug → description map.
 */
export async function updateSkillMdDescriptions(
  skillDir: string,
  descriptions: Map<string, string>,
): Promise<void> {
  const skillMdPath = join(skillDir, "SKILL.md");
  let content = await Bun.file(skillMdPath).text();

  for (const [slug, description] of descriptions) {
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(\\[[^\\]]+\\]\\(references/${escapedSlug}\\.md\\))( — .+)?$`,
      "gm",
    );
    content = content.replace(pattern, `$1 — ${description}`);
  }

  await Bun.write(skillMdPath, content);
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}
