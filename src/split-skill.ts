import { join } from "node:path";
import { readdir, rename, writeFile } from "node:fs/promises";
import { ensureDir } from "./utils";
import { parseFrontmatter } from "./frontmatter";

interface CategoryInfo {
  title: string;
  slug: string;
  fileCount: number;
  /** Direct reference files belonging to this category subtree */
  files: string[];
}

/**
 * Parse a SKILL.md file to extract category info from the TOC.
 * Returns the top-level categories (depth-1) with their descendant file counts.
 */
export async function listCategories(
  skillDir: string,
): Promise<{ skillName: string; categories: CategoryInfo[] }> {
  const skillMdPath = join(skillDir, "SKILL.md");
  const content = await Bun.file(skillMdPath).text();

  const nameMatch = content.match(/^name:\s*"?(.+?)"?\s*$/m);
  const skillName = nameMatch?.[1]?.trim() || "skill";

  // Parse the TOC to find top-level categories and their descendant files
  const lines = content.split("\n");
  const categories: CategoryInfo[] = [];
  let currentCategory: CategoryInfo | null = null;

  for (const line of lines) {
    // Match TOC lines: "- [Title](references/slug.md)" or "  - [Title](references/slug.md)"
    const tocMatch = line.match(
      /^(\s*)- \[([^\]]+)\]\(references\/([^)]+?)(?:\.md)?(?:#[^)]+)?\)/,
    );
    if (!tocMatch) continue;

    const indent = tocMatch[1]!.length;
    const title = tocMatch[2]!;
    const refPath = tocMatch[3]!;
    // Extract just the slug (file name without .md or anchor)
    const slug = refPath.replace(/\.md$/, "").replace(/#.*$/, "");

    if (indent === 0) {
      // Top-level category (depth 1)
      currentCategory = { title, slug, fileCount: 1, files: [slug] };
      categories.push(currentCategory);
    } else if (currentCategory) {
      // Descendant of current category — only count if it's a file (not an anchor ref to the same file)
      if (!currentCategory.files.includes(slug)) {
        currentCategory.files.push(slug);
        currentCategory.fileCount++;
      }
    }
  }

  return { skillName, categories };
}

interface SplitResult {
  /** Path to the new extracted skill directory */
  newSkillDir: string;
  /** Number of files moved */
  filesMoved: number;
  /** New skill name */
  skillName: string;
}

/**
 * Split specified categories out of an existing skill into a new skill.
 * Moves their reference files and generates a new SKILL.md for the extracted skill.
 * Updates the original skill's SKILL.md to remove the extracted categories.
 */
export async function splitSkill(
  skillDir: string,
  categorySlugs: string[],
): Promise<SplitResult[]> {
  const skillMdPath = join(skillDir, "SKILL.md");
  const originalContent = await Bun.file(skillMdPath).text();
  const refsDir = join(skillDir, "references");

  const nameMatch = originalContent.match(/^name:\s*"?(.+?)"?\s*$/m);
  const baseSkillName = nameMatch?.[1]?.trim() || "skill";

  const descMatch = originalContent.match(/^description:\s*"?(.+?)"?\s*$/m);
  const baseDescription = descMatch?.[1]?.trim() || "";

  // Parse full TOC structure to identify which files belong to which categories
  const lines = originalContent.split("\n");
  const categoryBlocks = new Map<
    string,
    { title: string; tocLines: string[]; files: string[] }
  >();

  let currentCatSlug: string | null = null;
  let currentCatTitle = "";
  let tocStartIndex = -1;
  let tocEndIndex = -1;

  // Find TOC section boundaries
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]!.match(/^## Topics/)) {
      tocStartIndex = i;
    }
  }

  if (tocStartIndex === -1) return [];

  // Parse TOC line by line to group by top-level category
  const tocLines = lines.slice(tocStartIndex + 1);
  let currentBlock: {
    title: string;
    tocLines: string[];
    files: string[];
  } | null = null;

  for (const line of tocLines) {
    if (!line.trim()) continue;

    const tocMatch = line.match(
      /^(\s*)- \[([^\]]+)\]\(references\/([^)#]+?)(?:\.md)?(?:#[^)]+)?\)/,
    );
    if (!tocMatch) continue;

    const indent = tocMatch[1]!.length;
    const title = tocMatch[2]!;
    const slug = tocMatch[3]!.replace(/\.md$/, "");

    if (indent === 0) {
      // Save previous block
      if (currentBlock && currentCatSlug) {
        categoryBlocks.set(currentCatSlug, currentBlock);
      }
      currentCatSlug = slug;
      currentCatTitle = title;
      currentBlock = { title, tocLines: [line], files: [slug] };
    } else if (currentBlock) {
      currentBlock.tocLines.push(line);
      if (!currentBlock.files.includes(slug)) {
        currentBlock.files.push(slug);
      }
    }
  }
  // Save last block
  if (currentBlock && currentCatSlug) {
    categoryBlocks.set(currentCatSlug, currentBlock);
  }

  const results: SplitResult[] = [];
  const extractedCatSlugs = new Set<string>();
  const allMovedFiles = new Set<string>();

  for (const catSlug of categorySlugs) {
    const block = categoryBlocks.get(catSlug);
    if (!block) continue;

    extractedCatSlugs.add(catSlug);
    const newSkillName = `${baseSkillName}-${catSlug}`;
    const parentDir = join(skillDir, "..");
    const newSkillDir = join(parentDir, newSkillName);
    const newRefsDir = join(newSkillDir, "references");

    await ensureDir(newSkillDir);
    await ensureDir(newRefsDir);

    // Move reference files
    let filesMoved = 0;
    for (const slug of block.files) {
      const filename = `${slug}.md`;
      const srcPath = join(refsDir, filename);
      const destPath = join(newRefsDir, filename);
      try {
        if (await Bun.file(srcPath).exists()) {
          await rename(srcPath, destPath);
          allMovedFiles.add(slug);
          filesMoved++;
        }
      } catch {}
    }

    // Re-indent TOC lines (they were children, now they're top-level in the new skill)
    const newTocLines = block.tocLines
      .slice(1) // skip the category header itself
      .map((l) => l.replace(/^\s{2}/, "")); // remove one level of indentation

    // Generate new SKILL.md
    const newDescription =
      `Rock RMS ${block.title.replace(/[^\w\s]/g, "").trim()} reference — ${baseDescription}`.slice(
        0,
        200,
      );
    const newSkillMd = [
      "---",
      `name: ${newSkillName}`,
      `description: ${yamlEscape(newDescription)}`,
      "---",
      "",
      `# ${block.title}`,
      "",
      `> Extracted from **${baseSkillName}**`,
      "",
      "## Topics",
      "",
      ...newTocLines,
      "",
    ].join("\n");

    await writeFile(join(newSkillDir, "SKILL.md"), newSkillMd, "utf-8");

    results.push({ newSkillDir, filesMoved, skillName: newSkillName });
  }

  // Update original SKILL.md: remove extracted categories from TOC
  if (extractedCatSlugs.size > 0) {
    const updatedLines: string[] = [];
    let inToc = false;
    let skipCategory = false;

    for (const line of lines) {
      if (line.match(/^## Topics/)) {
        inToc = true;
        updatedLines.push(line);
        continue;
      }

      if (inToc) {
        const tocMatch = line.match(
          /^(\s*)- \[([^\]]+)\]\(references\/([^)#]+?)(?:\.md)?(?:#[^)]+)?\)/,
        );
        if (tocMatch) {
          const indent = tocMatch[1]!.length;
          const slug = tocMatch[3]!.replace(/\.md$/, "");

          if (indent === 0) {
            skipCategory = extractedCatSlugs.has(slug);
          }

          if (skipCategory) continue;
        } else if (line.trim() && !line.match(/^\s*-/)) {
          // End of TOC section
          inToc = false;
          skipCategory = false;
        }
      }

      updatedLines.push(line);
    }

    await writeFile(skillMdPath, updatedLines.join("\n"), "utf-8");

    // Also clean up any orphaned reference files that were moved
    // (files that belong to extracted categories but might still be referenced by anchor)
  }

  return results;
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}
