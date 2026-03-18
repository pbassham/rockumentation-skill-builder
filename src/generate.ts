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

    // Add breadcrumb context at top of each reference file
    const breadcrumb = article.toc.breadcrumb.join(" > ");
    const content = `> **Path:** ${breadcrumb}\n\n${article.content}\n`;

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

  const description = buildDescription(pageTitle, sourceUrl);

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

  // Build a map of articleId → actual slug for TOC links
  const slugMap = new Map<string, string>();
  for (const article of opts.articles) {
    slugMap.set(article.articleId, article.slug);
  }

  // Add hierarchical table of contents
  if (tree && tree.children.length > 0) {
    bodyParts.push("\n## Topics\n");
    bodyParts.push(renderTreeToc(tree.children, 0, slugMap));
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
    lines.push(`${prefix}- [${node.entry.title}](references/${slug}.md)`);

    if (node.children.length > 0) {
      lines.push(renderTreeToc(node.children, indent + 1, slugMap));
    }
  }

  return lines.join("\n");
}

function buildDescription(pageTitle: string, sourceUrl: string): string {
  const base = `Rock RMS documentation: ${pageTitle}.`;
  const usage = ` Use when working with Rock RMS and need reference information about ${pageTitle.toLowerCase()}.`;
  const source = ` Source: ${sourceUrl}`;

  let desc = base + usage;
  if (desc.length + source.length <= 1024) {
    desc += source;
  }
  if (desc.length > 1024) {
    desc = desc.slice(0, 1021) + "...";
  }
  return desc;
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}
