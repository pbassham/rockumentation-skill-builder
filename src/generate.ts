import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ensureDir } from "./utils";
import type { ArticleSection } from "./convert";
import { buildTree, type HierarchyNode, type TocEntry } from "./hierarchy";

interface GenerateOptions {
  skillName: string;
  pageTitle: string;
  sourceUrl: string;
  articles: ArticleSection[];
  outputDir: string;
  customInstructions?: string;
}

/**
 * Generate a complete Agent Skills directory from parsed articles.
 */
export async function generateSkill(opts: GenerateOptions): Promise<string> {
  const skillDir = join(opts.outputDir, opts.skillName);
  const refsDir = join(skillDir, "references");

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

  // Build SKILL.md
  const skillMd = buildSkillMd(opts, rootArticle, childArticles, tree);
  await writeFile(join(skillDir, "SKILL.md"), skillMd, "utf-8");
  console.log(`  Written: SKILL.md (${skillMd.split("\n").length} lines)`);

  // Write reference files with breadcrumbs
  for (const article of childArticles) {
    const filename = `${article.slug}.md`;
    const filepath = join(refsDir, filename);

    // Add breadcrumb + description at top of each reference file
    const breadcrumb = article.toc.breadcrumb.join(" > ");
    const summary = extractSummary(article.content);
    const descLine = summary ? `\n> ${summary}\n` : "";
    const content = `> **Path:** ${breadcrumb}${descLine}\n${article.content}\n`;

    await writeFile(filepath, content, "utf-8");
    console.log(
      `  Written: references/${filename} (${content.split("\n").length} lines)`,
    );
  }

  return skillDir;
}

function buildSkillMd(
  opts: GenerateOptions,
  rootArticle: ArticleSection | undefined,
  childArticles: ArticleSection[],
  tree: HierarchyNode | null,
): string {
  const { skillName, pageTitle, sourceUrl } = opts;

  const description = buildDescription(pageTitle, sourceUrl, opts.articles);

  // YAML frontmatter
  const frontmatter = [
    "---",
    `name: ${skillName}`,
    `description: ${yamlEscape(description)}`,
    `metadata:`,
    `  source: ${yamlEscape(sourceUrl)}`,
    `  generated: "${new Date().toISOString().split("T")[0]}"`,
    `  platform: rockrms`,
    "---",
  ].join("\n");

  const bodyParts: string[] = [];

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

  // Build maps of articleId → slug and articleId → summary for TOC
  const slugMap = new Map<string, string>();
  const summaryMap = new Map<string, string>();
  for (const article of opts.articles) {
    slugMap.set(article.articleId, article.slug);
    summaryMap.set(article.articleId, extractSummary(article.content));
  }

  // Add hierarchical table of contents with descriptions
  if (tree && tree.children.length > 0) {
    bodyParts.push("\n## Topics\n");
    bodyParts.push(renderTreeToc(tree.children, 0, slugMap, summaryMap));
  }

  const body = bodyParts.join("\n");
  return `${frontmatter}\n\n${body}\n`;
}

/**
 * Recursively render a tree of articles as an indented markdown list.
 */
function renderTreeToc(
  nodes: HierarchyNode[],
  indent: number,
  slugMap: Map<string, string>,
  summaryMap: Map<string, string>,
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
    const summary = summaryMap.get(node.entry.articleId) || "";
    const desc = summary ? ` — ${summary}` : "";
    lines.push(
      `${prefix}- [${node.entry.title}](references/${slug}.md)${desc}`,
    );

    if (node.children.length > 0) {
      lines.push(renderTreeToc(node.children, indent + 1, slugMap, summaryMap));
    }
  }

  return lines.join("\n");
}

function buildDescription(
  pageTitle: string,
  sourceUrl: string,
  articles: ArticleSection[],
): string {
  // Collect top-level category titles for breadth
  const topLevel = articles
    .filter((a) => a.toc.depth === 1)
    .map((a) => a.title);
  const topicList =
    topLevel.length > 0 ? ` Covers: ${topLevel.join(", ")}.` : "";

  // Imperative phrasing focused on user intent (per Agent Skills guide)
  const desc =
    `Use when working with Rock RMS ${pageTitle.toLowerCase()} — ` +
    `building, configuring, or troubleshooting features described in the ${pageTitle} documentation.` +
    topicList +
    ` Use this skill even if the user doesn't mention "Rock" explicitly but is asking about concepts covered here.` +
    ` Source: ${sourceUrl}`;

  if (desc.length <= 1024) return desc;

  // Trim topics list if too long
  const short =
    `Use when working with Rock RMS ${pageTitle.toLowerCase()} — ` +
    `building, configuring, or troubleshooting features described in the ${pageTitle} documentation.` +
    ` Use this skill even if the user doesn't mention "Rock" explicitly but is asking about concepts covered here.` +
    ` Source: ${sourceUrl}`;
  return short.length > 1024 ? short.slice(0, 1021) + "..." : short;
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

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}
