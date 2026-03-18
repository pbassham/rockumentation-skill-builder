import { slugify } from "./utils";

export interface Section {
  /** The heading text (without the `# ` prefix) */
  title: string;
  /** Slugified filename (without extension) */
  slug: string;
  /** The full markdown content of this section, including the heading */
  content: string;
}

/**
 * Split markdown content at H1 (`# `) boundaries.
 * Returns an array of sections, each with its heading and content.
 *
 * The first section (content before the first H1, or the page-level H1)
 * is returned with slug "overview".
 */
export function splitByH1(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  const slugCounts = new Map<string, number>();

  let currentTitle = "Overview";
  let currentSlug = "overview";
  let currentLines: string[] = [];

  for (const line of lines) {
    // Match H1 headings: lines starting with "# " (not "## ")
    const h1Match = line.match(/^# (.+)$/);

    if (h1Match) {
      // Save previous section if it has content
      if (currentLines.length > 0) {
        const content = currentLines.join("\n").trim();
        if (content.length > 0) {
          sections.push({
            title: currentTitle,
            slug: currentSlug,
            content,
          });
        }
      }

      // Start new section
      currentTitle = h1Match[1]!.trim();
      let slug = slugify(currentTitle);

      // Handle duplicate slugs
      const count = slugCounts.get(slug) || 0;
      slugCounts.set(slug, count + 1);
      if (count > 0) {
        slug = `${slug}-${count + 1}`;
      }

      currentSlug = slug;
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  // Push the last section
  if (currentLines.length > 0) {
    const content = currentLines.join("\n").trim();
    if (content.length > 0) {
      sections.push({
        title: currentTitle,
        slug: currentSlug,
        content,
      });
    }
  }

  // Deduplicate: merge sections with the same slug
  // (Rockumentation pages sometimes repeat the top-level heading)
  const merged = new Map<string, Section>();
  for (const section of sections) {
    const existing = merged.get(section.slug);
    if (existing) {
      existing.content += "\n\n" + section.content;
    } else {
      merged.set(section.slug, { ...section });
    }
  }

  return Array.from(merged.values());
}

/**
 * Given sections, determine which should be the SKILL.md overview
 * and which should be reference files.
 */
export function categorize(sections: Section[]): {
  overview: Section | null;
  references: Section[];
} {
  if (sections.length === 0) {
    return { overview: null, references: [] };
  }

  // If the first section is "Overview" or matches the page title, use it as overview
  const overview = sections[0] ?? null;
  const references = sections.slice(1);

  // If there's only one section, it's the overview with no references
  if (sections.length === 1) {
    return { overview, references: [] };
  }

  return { overview, references };
}
