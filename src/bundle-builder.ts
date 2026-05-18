/**
 * Bundle builder — turns a `BundledSkill` (one or more source URLs)
 * into a single skill folder with a FLAT `references/` directory.
 *
 * This lives alongside `generate.ts` (which is single-source). The two
 * generators share frontmatter/description helpers but diverge on
 * Topics rendering: bundles group by source label rather than walking
 * a single hierarchy tree, since multi-source skills don't have one.
 */

import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { extractWithTemplate } from "./extract";
import { fetchPage, looksLikeLoginPage } from "./fetch";
import { rockLogin } from "./auth";
import { ensureDir, slugify } from "./utils";
import { buildFrontmatter, parseFrontmatter } from "./frontmatter";
import { readCachedDescription } from "./description-cache";
import { enumerateDocumentationIndex } from "./curated-roots";
import type { ArticleSection } from "./convert-types";
import type { BundledSkill, BundledSource } from "./build-config";

export interface BundleBuilderEvent {
  step: number;
  status: "running" | "done" | "error" | "auth-required";
  message: string;
  /** Index of the source currently being built (1-based). */
  sourceIndex?: number;
  /** Total number of sources for the current skill. */
  sourceTotal?: number;
  sourceUrl?: string;
  template?: string;
}

export interface BundleResult {
  skillDir: string;
  skillName: string;
  refCount: number;
  /** Per-source metadata embedded into SKILL.md frontmatter. */
  sources: Array<{
    url: string;
    label: string;
    note?: string;
    refCount: number;
  }>;
}

export interface BuildBundleOptions {
  skill: BundledSkill;
  outputDir: string;
  send: (e: BundleBuilderEvent) => void;
  /** Author/version override applied to the SKILL.md `metadata` block. */
  author?: string;
  /**
   * Merge same-source articles whose content is shorter than this many
   * lines into an adjacent sibling so the bundle doesn't end up with
   * many useless single-paragraph reference files. 0 disables merging.
   * Defaults to 50.
   */
  mergeThreshold?: number;
}

export async function buildBundle(
  opts: BuildBundleOptions,
): Promise<BundleResult | null> {
  const { skill, outputDir, send } = opts;
  const skillDir = join(outputDir, skill.name);
  const refsDir = join(skillDir, "references");
  await ensureDir(skillDir);
  await mkdir(refsDir, { recursive: true });

  // ----- 0. Expand index sources --------------------------------------
  // Sources flagged with `expand` are themselves index pages (e.g. the
  // Rock /documentation bookshelf). Replace each one with the URLs it
  // enumerates so the rest of the pipeline sees a flat list.
  const sources = await expandSources(skill.sources, send);
  if (sources.length === 0) {
    send({
      step: 1,
      status: "error",
      message: "No sources to build after expansion.",
    });
    return null;
  }

  // ----- 1. Extract every source ---------------------------------------
  const extracted: Array<{
    source: BundledSource;
    label: string;
    articles: ArticleSection[];
    pageTitle: string;
  }> = [];

  for (let i = 0; i < sources.length; i++) {
    const src = sources[i]!;
    const sourceIndex = i + 1;
    const sourceTotal = sources.length;

    let cookie: string | undefined;
    if (src.username && src.password) {
      send({
        step: 1,
        status: "running",
        message: `[${sourceIndex}/${sourceTotal}] Logging in...`,
        sourceIndex,
        sourceTotal,
        sourceUrl: src.url,
      });
      cookie = await rockLogin(src.url, src.username, src.password);
    }

    send({
      step: 2,
      status: "running",
      message: `[${sourceIndex}/${sourceTotal}] Fetching ${src.url}`,
      sourceIndex,
      sourceTotal,
      sourceUrl: src.url,
    });
    const html = await fetchPage(src.url, cookie);

    if (looksLikeLoginPage(html)) {
      send({
        step: 2,
        status: "auth-required",
        message: cookie
          ? `Authentication did not grant access to ${src.url}.`
          : `${src.url} requires login. Add username/password for that source.`,
        sourceIndex,
        sourceTotal,
        sourceUrl: src.url,
      });
      return null;
    }

    send({
      step: 3,
      status: "running",
      message: `[${sourceIndex}/${sourceTotal}] Extracting articles...`,
      sourceIndex,
      sourceTotal,
      sourceUrl: src.url,
    });
    const { articles, pageTitle, template } = await extractWithTemplate(
      html,
      src.url,
      src.templateId,
      cookie,
    );
    if (articles.length === 0) {
      send({
        step: 3,
        status: "error",
        message: `No articles extracted from ${src.url}.`,
        sourceIndex,
        sourceTotal,
        sourceUrl: src.url,
      });
      return null;
    }
    send({
      step: 3,
      status: "done",
      message: `[${sourceIndex}/${sourceTotal}] ${articles.length} articles via ${template.name}`,
      sourceIndex,
      sourceTotal,
      sourceUrl: src.url,
      template: template.id,
    });

    const label = src.label || pageTitle || src.url;
    extracted.push({ source: src, label, articles, pageTitle });
  }

  // ----- 2. Plan flat reference filenames ------------------------------
  // Strategy: try each article's natural slug first. On collision,
  // prefix with the source label slug. On further collision, append
  // -2, -3, ... Track the final slug per article so the SKILL.md TOC
  // links match disk.
  const mergeThreshold = opts.mergeThreshold ?? 50;
  const usedSlugs = new Set<string>();
  const plan: Array<{
    sourceLabel: string;
    sourceUrl: string;
    article: ArticleSection;
    finalSlug: string;
    /** Articles merged into this one (rendered as sub-sections in the file). */
    mergedChildren: ArticleSection[];
  }> = [];

  for (const ex of extracted) {
    const sourceSlug = slugify(ex.label);
    // Include every concrete article from each source. We don't strip
    // depth-0 here (unlike the single-source generator) because for
    // bundles the depth-0 article often IS the whole source page —
    // dropping it would yield an empty references/ folder.
    const refArticles = ex.articles.filter((a) => !a.toc.isSection);
    // Apply merge threshold within this source so we don't end up with
    // a pile of one-paragraph reference files. See `mergeSmallArticles`.
    const merged = mergeSmallArticles(refArticles, mergeThreshold);

    for (const m of merged) {
      let candidate = m.anchor.slug;
      if (usedSlugs.has(candidate)) {
        candidate = `${sourceSlug}-${m.anchor.slug}`;
      }
      let n = 2;
      let final = candidate;
      while (usedSlugs.has(final)) {
        final = `${candidate}-${n++}`;
      }
      usedSlugs.add(final);
      plan.push({
        sourceLabel: ex.label,
        sourceUrl: ex.source.url,
        article: m.anchor,
        finalSlug: final,
        mergedChildren: m.children,
      });
    }
  }

  // ----- 3. Write reference files --------------------------------------
  // descMap is keyed by finalSlug and used both to seed the new ref
  // frontmatter and to populate the SKILL.md TOC. Lookup order:
  //   1. existing on-disk frontmatter (preserves manual edits)
  //   2. repo-tracked description cache (data/descriptions/<skill>/<slug>.md)
  //   3. extractSummary fallback (used only at TOC-render time)
  const descMap = new Map<string, string>();
  const wroteSlugs = new Set<string>();
  for (const {
    article,
    finalSlug,
    sourceUrl,
    sourceLabel,
    mergedChildren,
  } of plan) {
    const filename = `${finalSlug}.md`;
    const filepath = join(refsDir, filename);
    const breadcrumb = article.toc.breadcrumb.join(" > ");
    let body = `> **Path:** ${breadcrumb}\n\n${article.content}\n`;
    for (const child of mergedChildren) {
      const childCrumb = child.toc.breadcrumb.join(" > ");
      body += `\n---\n\n## ${child.title} {#${child.slug}}\n\n`;
      if (childCrumb) body += `> **Path:** ${childCrumb}\n\n`;
      body += `${child.content}\n`;
    }

    let description: string | undefined;
    try {
      const existing = await Bun.file(filepath).text();
      description = parseFrontmatter(existing).description;
    } catch {
      // file didn't exist — fine.
    }
    if (!description) {
      const cached = await readCachedDescription(opts.skill.name, finalSlug);
      if (cached) description = cached;
    }
    if (description) descMap.set(finalSlug, description);

    const content = buildFrontmatter(
      {
        description,
        source: sourceUrl,
        sourceLabel,
      },
      body,
    );
    await writeFile(filepath, content, "utf-8");
    wroteSlugs.add(finalSlug);
  }

  // Clean up stale refs from previous builds.
  const existing = await readdir(refsDir).catch(() => [] as string[]);
  for (const name of existing) {
    if (!name.endsWith(".md")) continue;
    if (!wroteSlugs.has(name.replace(/\.md$/, ""))) {
      await unlink(join(refsDir, name));
    }
  }

  // ----- 4. Write SKILL.md ---------------------------------------------
  const description =
    skill.description?.trim() ||
    `Use when working with ${extracted.map((e) => e.label).join(", ")}.`;

  const sourcesMeta = extracted.map((ex) => ({
    url: ex.source.url,
    label: ex.label,
    note: ex.source.note,
    refCount: plan.filter((p) => p.sourceLabel === ex.label).length,
  }));

  const skillMd = renderBundleSkillMd({
    skill,
    description,
    plan,
    sources: sourcesMeta,
    author: opts.author,
    descMap,
  });
  await writeFile(join(skillDir, "SKILL.md"), skillMd, "utf-8");

  send({
    step: 4,
    status: "done",
    message: `Wrote SKILL.md and ${plan.length} reference files.`,
  });

  return {
    skillDir,
    skillName: skill.name,
    refCount: plan.length,
    sources: sourcesMeta,
  };
}

function renderBundleSkillMd(args: {
  skill: BundledSkill;
  description: string;
  plan: Array<{
    sourceLabel: string;
    sourceUrl: string;
    article: ArticleSection;
    finalSlug: string;
    mergedChildren: ArticleSection[];
  }>;
  sources: Array<{
    url: string;
    label: string;
    note?: string;
    refCount: number;
  }>;
  author?: string;
  descMap: Map<string, string>;
}): string {
  const { skill, description, plan, sources, author, descMap } = args;
  const lines: string[] = [
    "---",
    `name: ${skill.name}`,
    `description: ${yamlEscape(description)}`,
    "metadata:",
    `  generator: rockumentation-skill-builder`,
    `  generatedAt: ${new Date().toISOString()}`,
  ];
  if (skill.version) lines.push(`  version: ${yamlEscape(skill.version)}`);
  if (author) lines.push(`  author: ${yamlEscape(author)}`);
  lines.push("  sources:");
  for (const s of sources) {
    lines.push(`    - url: ${yamlEscape(s.url)}`);
    lines.push(`      label: ${yamlEscape(s.label)}`);
    if (s.note) lines.push(`      note: ${yamlEscape(s.note)}`);
  }
  lines.push("---", "");

  // Brief overview
  const sourceCount = sources.length;
  const refCount = plan.length;
  lines.push(
    `This skill bundles ${refCount} reference${refCount === 1 ? "" : "s"} ` +
      `from ${sourceCount} source${sourceCount === 1 ? "" : "s"}. ` +
      `Load topics on demand via the index below.`,
    "",
  );

  // Author-supplied pre-text appears above Topics so it survives
  // description-regeneration (which only rewrites lines under `## Topics`).
  if (skill.preText?.trim()) {
    lines.push(skill.preText.trim(), "");
  }

  if (skill.additionalInstructions?.trim()) {
    lines.push("## Additional Instructions", "");
    lines.push(skill.additionalInstructions.trim(), "");
  }

  lines.push("## Topics", "");
  // Group by source label, preserving source order from `sources`.
  for (const s of sources) {
    if (sources.length > 1) {
      lines.push(`### ${s.label}`, "");
      if (s.note) lines.push(`> ${s.note}`, "");
    }
    const items = plan.filter((p) => p.sourceLabel === s.label);
    for (const p of items) {
      const desc =
        descMap.get(p.finalSlug) || extractSummary(p.article.content);
      const suffix = desc ? ` — ${desc}` : "";
      lines.push(
        `- [${p.article.title}](references/${p.finalSlug}.md)${suffix}`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Expand any source flagged with `expand` into the URLs it indexes.
 * Sources without an expand flag pass through unchanged. Order is
 * preserved (expanded children replace the parent in place).
 *
 * Expanded children inherit credentials from their parent (so a single
 * username/password unlocks every book on a private documentation
 * index). The parent's `templateId` is NOT inherited \u2014 each book is a
 * Rockumentation print page and should be auto-detected.
 */
async function expandSources(
  sources: BundledSource[],
  send: (e: BundleBuilderEvent) => void,
): Promise<BundledSource[]> {
  const out: BundledSource[] = [];
  for (const src of sources) {
    if (src.expand !== "documentation-index") {
      out.push(src);
      continue;
    }
    send({
      step: 0,
      status: "running",
      message: `Expanding documentation index ${src.url}...`,
      sourceUrl: src.url,
    });
    let cookie: string | undefined;
    if (src.username && src.password) {
      cookie = await rockLogin(src.url, src.username, src.password);
    }
    const html = await fetchPage(src.url, cookie);
    const urls = enumerateDocumentationIndex(html, src.url);
    if (urls.length === 0) {
      send({
        step: 0,
        status: "error",
        message: `No book links found at ${src.url}.`,
        sourceUrl: src.url,
      });
      continue;
    }
    send({
      step: 0,
      status: "done",
      message: `Expanded ${src.url} into ${urls.length} books.`,
      sourceUrl: src.url,
    });
    for (const url of urls) {
      out.push({
        url,
        username: src.username,
        password: src.password,
        // Each book gets its own page-title-derived label by leaving
        // `label` undefined (bundle-builder falls back to pageTitle).
      });
    }
  }
  return out;
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}

function extractSummary(markdown: string): string {
  const lines = markdown.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (
      !line ||
      line.startsWith("#") ||
      line.startsWith(">") ||
      line.startsWith("-") ||
      line.startsWith("|") ||
      line.startsWith("```") ||
      line.startsWith("!")
    ) {
      continue;
    }
    let s = line
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
      .replace(/`([^`]+)`/g, "$1");
    if (s.length > 120) s = s.slice(0, 117).replace(/\s+\S*$/, "") + "...";
    return s;
  }
  return "";
}

interface MergedGroup {
  /** The article whose slug/title/url anchors the final reference file. */
  anchor: ArticleSection;
  /** Smaller articles folded under the anchor as sub-sections. */
  children: ArticleSection[];
}

/**
 * Combine adjacent same-source articles whose content is below `threshold`
 * lines into a single reference file so the skill doesn't end up with a
 * dozen single-paragraph references. Returns groups in input order; each
 * group becomes one reference file. Threshold of 0 disables merging.
 *
 * Strategy:
 *   - Walk articles left to right.
 *   - Any article >= threshold becomes its own group (anchor).
 *   - A small article attaches to the previous group when present;
 *     otherwise it's held as a pending group until either (a) a larger
 *     article arrives and absorbs it, or (b) the source ends, in which
 *     case the pending small article ships as its own group.
 *   - Once a group's total line count crosses the threshold, the next
 *     small article starts a new pending group instead of growing it
 *     unbounded.
 */
function mergeSmallArticles(
  articles: ArticleSection[],
  threshold: number,
): MergedGroup[] {
  if (threshold <= 0 || articles.length <= 1) {
    return articles.map((a) => ({ anchor: a, children: [] }));
  }

  const lineCount = (a: ArticleSection) => a.content.split("\n").length;
  const groups: MergedGroup[] = [];
  let pending: MergedGroup | null = null;
  let pendingLines = 0;

  const flushPending = () => {
    if (pending) {
      groups.push(pending);
      pending = null;
      pendingLines = 0;
    }
  };

  for (const article of articles) {
    const lines = lineCount(article);
    const isLarge = lines >= threshold;

    if (isLarge) {
      flushPending();
      groups.push({ anchor: article, children: [] });
      continue;
    }

    // Small article. Prefer absorbing into the previous group if it
    // still has room; otherwise start (or grow) a pending group.
    const prev = groups[groups.length - 1];
    if (prev && !pending) {
      prev.children.push(article);
      continue;
    }
    if (!pending) {
      pending = { anchor: article, children: [] };
      pendingLines = lines;
    } else if (pendingLines + lines < threshold) {
      pending.children.push(article);
      pendingLines += lines;
    } else {
      flushPending();
      pending = { anchor: article, children: [] };
      pendingLines = lines;
    }
  }

  flushPending();
  return groups;
}
