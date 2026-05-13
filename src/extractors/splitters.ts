import { parseHTML, htmlToMarkdown } from "../dom";
import { compile, evaluate } from "../template-engine";
import type { Template, Variables } from "../template-engine/types";
import type { ArticleSection, TocEntry } from "../convert-types";

/**
 * One article produced by a splitter. The shape mirrors today's
 * `ArticleSection` so downstream `generateSkill` keeps working.
 */
export type SplitArticle = ArticleSection;

export interface SplitContext {
  html: string;
  url: string;
  variables: Variables;
  template: Template;
  /** Outputs from the interpreter pipeline, keyed by step id. */
  stepOutputs: Record<string, string>;
  promptResolutions: Record<string, string>;
  /** Optional auth cookie for splitters that fetch additional pages. */
  cookie?: string;
}

/**
 * The `single` splitter renders the template's `noteContentFormat` once
 * and emits one article.
 */
export async function splitSingle(ctx: SplitContext): Promise<SplitArticle[]> {
  const compiled = compile(ctx.template.noteContentFormat);
  const content = await evaluate(compiled, {
    variables: ctx.variables,
    url: ctx.url,
    stepOutputs: ctx.stepOutputs,
    promptResolutions: ctx.promptResolutions,
  });
  const titleCompiled = compile(ctx.template.noteNameFormat || "{{title}}");
  const title = await evaluate(titleCompiled, {
    variables: ctx.variables,
    url: ctx.url,
    stepOutputs: ctx.stepOutputs,
    promptResolutions: ctx.promptResolutions,
  });
  return [
    {
      articleId: "root",
      title: title || String(ctx.variables.title || "Untitled"),
      slug: slugify(title || String(ctx.variables.title || "article")),
      content: content.trim() + "\n",
      toc: rootToc(ctx.url, title),
    },
  ];
}

/**
 * Split rendered markdown by `^## ` (H2 by default) headings.
 */
export async function splitByHeading(
  ctx: SplitContext,
  level: number = 2,
): Promise<SplitArticle[]> {
  const single = await splitSingle(ctx);
  const md = single[0]?.content ?? "";
  const heading = "#".repeat(level);
  const lines = md.split("\n");
  const sections: { title: string; lines: string[] }[] = [];
  let current: { title: string; lines: string[] } = {
    title: single[0]?.title || "Overview",
    lines: [],
  };
  for (const line of lines) {
    const m = line.match(new RegExp(`^${heading}\\s+(.+)$`));
    if (m) {
      if (current.lines.length > 0) sections.push(current);
      current = { title: m[1]!, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.length > 0) sections.push(current);
  return sections.map((s, i) => ({
    articleId: `h-${i}`,
    title: s.title,
    slug: slugify(s.title),
    content: s.lines.join("\n").trim() + "\n",
    toc: {
      articleId: `h-${i}`,
      title: s.title,
      url: ctx.url,
      depth: i === 0 ? 0 : 1,
      parentUrl: i === 0 ? null : ctx.url,
      breadcrumb: i === 0 ? [s.title] : [single[0]!.title, s.title],
    },
  }));
}

/**
 * Walk the Rockumentation TOC sidebar, locate each in-page
 * `<article data-article-id>`, and render each as one markdown article.
 * Linkedom port of the original cheerio implementation.
 */
export async function splitByTocLinks(
  ctx: SplitContext,
): Promise<SplitArticle[]> {
  const baseOrigin = safeOrigin(ctx.url);
  const { document } = parseHTML(ctx.html);

  // Pre-clean global junk (mirrors prior cheerio cleanup).
  document.querySelectorAll("script,style").forEach((n) => n.remove());
  document
    .querySelectorAll(".article-cards-container")
    .forEach((n) => n.remove());
  document.querySelectorAll("a").forEach((el) => {
    const txt = (el.textContent || "").trim();
    if (txt === "Navigate to header" || txt === "Copy page") el.remove();
  });
  document.querySelectorAll("img").forEach((el) => {
    if (!(el as Element).getAttribute("src")) el.remove();
  });

  // Absolutize relative URLs.
  if (baseOrigin) {
    document.querySelectorAll("a[href]").forEach((el) => {
      const href = (el as Element).getAttribute("href");
      if (href && href.startsWith("/")) {
        (el as Element).setAttribute("href", `${baseOrigin}${href}`);
      }
    });
    document.querySelectorAll("img[src]").forEach((el) => {
      const src = (el as Element).getAttribute("src");
      if (src && src.startsWith("/")) {
        (el as Element).setAttribute("src", `${baseOrigin}${src}`);
      }
    });
  }

  const tocMap = parseTocLinkedom(document, ctx.url);

  const articles: SplitArticle[] = [];
  let pageTitle = "Rock RMS Documentation";

  const center = document.querySelector(".doc-container .center-container");
  const articleEls = center
    ? Array.from(center.querySelectorAll("article.rockumentation-article"))
    : [];

  for (const el of articleEls) {
    const articleId = (el as Element).getAttribute("data-article-id");
    if (!articleId) continue;
    const tocEntry = tocMap.get(articleId);
    if (!tocEntry) continue;

    // The H1 lives in the preceding .article-header sibling.
    const header = previousSiblingMatching(el as Element, ".article-header");
    const title =
      header?.querySelector("h1")?.textContent?.trim() || tocEntry.title;

    if ((el as Element).getAttribute("data-main-article") === "true") {
      pageTitle = title || pageTitle;
    }

    const headerHtml = header?.outerHTML ?? "";
    const articleHtml = (el as Element).outerHTML;
    const combinedHtml = stripPresentationAttrs(headerHtml + articleHtml);
    let markdown = await htmlToMarkdown(combinedHtml, ctx.url);
    markdown = postProcess(markdown);

    const urlSegments = tocEntry.url.split("/").filter((s) => s.length > 0);
    const slug = urlSegments[urlSegments.length - 1] || "overview";

    articles.push({
      articleId,
      title,
      slug,
      content: markdown,
      toc: tocEntry,
    });
  }

  // Disambiguate duplicate slugs by prepending the parent segment.
  const counts = new Map<string, number>();
  for (const a of articles) counts.set(a.slug, (counts.get(a.slug) || 0) + 1);
  for (const a of articles) {
    if ((counts.get(a.slug) || 0) > 1) {
      const segs = a.toc.url.split("/").filter((s) => s.length > 0);
      if (segs.length >= 2) {
        a.slug = `${segs[segs.length - 2]}-${a.slug}`;
      }
    }
  }

  // Stash the page title on the first article so callers can pick it up.
  if (articles.length > 0) (articles[0] as any)._pageTitle = pageTitle;

  return articles;
}

function parseTocLinkedom(
  document: Document,
  rootUrl: string,
): Map<string, TocEntry> {
  const rootPath = new URL(rootUrl).pathname.replace(/\/+$/, "");
  const entries = new Map<string, TocEntry>();
  const urlToTitle = new Map<string, string>();

  const left = document.querySelector(".doc-container .left-container");
  const lis = left
    ? Array.from(left.querySelectorAll("li[data-article-id]"))
    : [];

  const raw: { articleId: string; title: string; url: string }[] = [];
  for (const li of lis) {
    const articleId = (li as Element).getAttribute("data-article-id");
    const a = (li as Element).querySelector("a");
    const title = (a?.textContent || "").trim();
    const url = (a?.getAttribute("href") || "").replace(/\/+$/, "");
    if (articleId && title && url) {
      raw.push({ articleId, title, url });
      urlToTitle.set(url, title);
    }
  }

  for (const entry of raw) {
    const relative = entry.url.startsWith(rootPath)
      ? entry.url.slice(rootPath.length)
      : entry.url;
    const segments = relative.split("/").filter((s) => s.length > 0);
    const depth = segments.length;

    let parentUrl: string | null = null;
    if (segments.length > 0) {
      const parentPath = rootPath + "/" + segments.slice(0, -1).join("/");
      const normalizedParent = parentPath.replace(/\/+$/, "");
      if (urlToTitle.has(normalizedParent) || normalizedParent === rootPath) {
        parentUrl = normalizedParent;
      }
    }

    const breadcrumb: string[] = [];
    for (let i = 0; i <= segments.length; i++) {
      const crumbPath =
        i === 0 ? rootPath : rootPath + "/" + segments.slice(0, i).join("/");
      const t = urlToTitle.get(crumbPath);
      if (t) breadcrumb.push(t);
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

function previousSiblingMatching(
  el: Element,
  selector: string,
): Element | null {
  let cur = el.previousElementSibling;
  while (cur) {
    if ((cur as Element).matches?.(selector)) return cur as Element;
    cur = cur.previousElementSibling;
  }
  return null;
}

function postProcess(md: string): string {
  return md
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "\n");
}

/**
 * Re-parse a fragment of HTML and remove presentational attributes
 * (`style`, `class`, `data-*`) that confuse defuddle's HTML→Markdown
 * converter. Rockumentation embeds multi-KB inline `style` blobs and
 * tailwind class soup on every `<code>` element, which causes the
 * converter to fall back to "Partial conversion completed with errors."
 */
function stripPresentationAttrs(html: string): string {
  const { document } = parseHTML(
    `<!doctype html><html><body>${html}</body></html>`,
  );
  document.querySelectorAll("*").forEach((el) => {
    const e = el as Element;
    e.removeAttribute("style");
    e.removeAttribute("class");
    // Remove any data-* attribute (cheap iteration over a snapshot).
    const names: string[] = [];
    for (let i = 0; i < e.attributes.length; i++) {
      const n = e.attributes[i]?.name;
      if (n && n.startsWith("data-")) names.push(n);
    }
    for (const n of names) e.removeAttribute(n);
  });
  return document.body?.innerHTML ?? html;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[''""]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-|-$/g, "") || "article"
  );
}

function rootToc(url: string, title: string): TocEntry {
  return {
    articleId: "root",
    title,
    url,
    depth: 0,
    parentUrl: null,
    breadcrumb: [title || "Overview"],
  };
}

function safeOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

/**
 * Dispatch a splitter by id.
 */
export async function runSplitter(ctx: SplitContext): Promise<SplitArticle[]> {
  const cfg = ctx.template.splitter ?? { id: "single" };
  switch (cfg.id) {
    case "single":
      return splitSingle(ctx);
    case "by-heading":
      return splitByHeading(ctx, cfg.level ?? 2);
    case "by-toc-links":
      return splitByTocLinks(ctx);
    case "by-toc-anchors":
      return splitByTocAnchors(ctx, cfg.tocSelector ?? "#toc a[href^='#']");
    case "by-toc-pages":
      return splitByTocPages(ctx, {
        tocSelector: cfg.tocSelector ?? "",
        pageContentSelector: cfg.pageContentSelector,
        urlIncludes: cfg.urlIncludes,
      });
    case "by-selector":
      return splitBySelector(ctx, cfg.selector ?? "", cfg.titleSelector);
    case "interpreter":
      // Interpreter-driven splitter expects a step output to contain
      // `{ articles: [{ slug, title, content }] }` JSON.
      return splitByInterpreter(ctx, cfg.stepId);
    default:
      return splitSingle(ctx);
  }
}

async function splitByInterpreter(
  ctx: SplitContext,
  stepId?: string,
): Promise<SplitArticle[]> {
  const raw = stepId ? ctx.stepOutputs[stepId] : "";
  if (!raw) return [];
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  const arr = Array.isArray(parsed?.articles)
    ? parsed.articles
    : Array.isArray(parsed)
      ? parsed
      : [];
  return arr.map((a: any, i: number) => ({
    articleId: a.id || `ai-${i}`,
    title: String(a.title || `Section ${i + 1}`),
    slug: slugify(String(a.slug || a.title || `section-${i + 1}`)),
    content: String(a.content || "").trim() + "\n",
    toc: {
      articleId: a.id || `ai-${i}`,
      title: String(a.title || ""),
      url: ctx.url,
      depth: i === 0 ? 0 : 1,
      parentUrl: i === 0 ? null : ctx.url,
      breadcrumb: [String(a.title || "")],
    },
  }));
}

/**
 * Split the page by a CSS selector — each match becomes one article.
 * Title comes from `titleSelector` (relative to each match) when provided;
 * otherwise falls back to the first heading inside the match, then to the
 * page title with an index suffix.
 */
export async function splitBySelector(
  ctx: SplitContext,
  selector: string,
  titleSelector?: string,
): Promise<SplitArticle[]> {
  if (!selector) return splitSingle(ctx);
  const baseOrigin = safeOrigin(ctx.url);
  const { document } = parseHTML(ctx.html);

  // Pre-clean global junk and absolutize before slicing per match.
  document.querySelectorAll("script,style").forEach((n) => n.remove());
  if (baseOrigin) {
    document.querySelectorAll("a[href]").forEach((el) => {
      const href = (el as Element).getAttribute("href");
      if (href && href.startsWith("/")) {
        (el as Element).setAttribute("href", `${baseOrigin}${href}`);
      }
    });
    document.querySelectorAll("img[src]").forEach((el) => {
      const src = (el as Element).getAttribute("src");
      if (src && src.startsWith("/")) {
        (el as Element).setAttribute("src", `${baseOrigin}${src}`);
      }
    });
  }

  const matches = Array.from(document.querySelectorAll(selector));
  if (matches.length === 0) return [];

  // Prefer the first <h1> in the document over defuddle's `<title>`,
  // because Rock pages (and most sectioned content) wrap a clean, brief
  // page heading there while the `<title>` tag often appends boilerplate
  // like " - Rock Community" that bleeds into derived skill names.
  const firstH1 = document.querySelector("h1")?.textContent?.trim() || "";
  let pageTitle =
    firstH1 || String(ctx.variables.title || "").trim() || "Untitled";
  ctx.variables.title = pageTitle;
  const articles: SplitArticle[] = [];
  const slugCounts = new Map<string, number>();

  for (let i = 0; i < matches.length; i++) {
    const el = matches[i] as Element;
    let title = "";
    if (titleSelector) {
      title = el.querySelector(titleSelector)?.textContent?.trim() || "";
    }
    if (!title) {
      title = el.querySelector("h1,h2,h3,h4,h5,h6")?.textContent?.trim() || "";
    }
    if (!title) title = `${pageTitle} ${i + 1}`;

    const html = stripPresentationAttrs(el.outerHTML);
    let markdown = await htmlToMarkdown(html, ctx.url);
    markdown = postProcess(markdown);

    let slug = slugify(title);
    const count = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, count);
    if (count > 1) slug = `${slug}-${count}`;

    const articleId = `sel-${i}`;
    articles.push({
      articleId,
      title,
      slug,
      content: markdown.trim() + "\n",
      toc: {
        articleId,
        title,
        url: ctx.url,
        depth: i === 0 ? 0 : 1,
        parentUrl: i === 0 ? null : ctx.url,
        breadcrumb: i === 0 ? [title] : [pageTitle, title],
      },
    });
  }

  // Stash the page title on the first article so callers can pick it up.
  if (articles.length > 0) (articles[0] as any)._pageTitle = pageTitle;

  return articles;
}

/**
 * Split a long single-page document into chapters using a sidebar / TOC
 * whose links point at in-page anchors (`<a href="#welcome">Welcome</a>`).
 *
 * Each TOC link defines one chapter. The chapter content is everything in
 * document order from the link's target anchor (`<a name="welcome">` or any
 * element with `id="welcome"`) up to (but not including) the next anchor in
 * the TOC sequence. A synthetic depth-0 root article is emitted with a
 * brief overview that lists every chapter, so `generateSkill` produces a
 * proper SKILL.md Topics tree.
 *
 * Rationale: Rock manuals at /documentation/bookcontent/<id>/<v> render the
 * entire book as one HTML page, with `#toc.book-toc` listing chapters and
 * the body containing matching anchors. Splitting on `<section>` or `<h1>`
 * tags is unreliable because section nesting and heading reuse vary; the
 * TOC is the only authoritative chapter map.
 */
export async function splitByTocAnchors(
  ctx: SplitContext,
  tocSelector: string,
): Promise<SplitArticle[]> {
  const baseOrigin = safeOrigin(ctx.url);
  const { document } = parseHTML(ctx.html);

  document.querySelectorAll("script,style").forEach((n) => n.remove());
  if (baseOrigin) {
    document.querySelectorAll("a[href]").forEach((el) => {
      const href = (el as Element).getAttribute("href");
      if (href && href.startsWith("/")) {
        (el as Element).setAttribute("href", `${baseOrigin}${href}`);
      }
    });
    document.querySelectorAll("img[src]").forEach((el) => {
      const src = (el as Element).getAttribute("src");
      if (src && src.startsWith("/")) {
        (el as Element).setAttribute("src", `${baseOrigin}${src}`);
      }
    });
  }

  // Collect TOC entries (fragment + title) in document order.
  const tocLinks = Array.from(document.querySelectorAll(tocSelector));
  const entries: { fragment: string; title: string; anchor: Element | null }[] =
    [];
  for (const link of tocLinks) {
    const href = (link as Element).getAttribute("href") || "";
    if (!href.startsWith("#")) continue;
    const fragment = href.slice(1);
    if (!fragment) continue;
    const title = (link.textContent || "").trim();
    if (!title) continue;
    const anchor =
      document.querySelector(`[id="${cssEscape(fragment)}"]`) ||
      document.querySelector(`a[name="${cssEscape(fragment)}"]`);
    entries.push({ fragment, title, anchor });
  }

  const valid = entries.filter((e) => e.anchor);
  if (valid.length === 0) return [];

  const pageTitle =
    document.querySelector("h1")?.textContent?.trim() ||
    String(ctx.variables.title || "").trim() ||
    "Untitled";
  ctx.variables.title = pageTitle;

  const articles: SplitArticle[] = [];
  const slugCounts = new Map<string, number>();

  // Synthetic depth-0 root so `generateSkill` renders a proper Topics tree.
  const rootId = "root";
  const overviewLines = [
    `This skill catalogs the chapters of *${pageTitle}* from the Rock RMS documentation.`,
    "",
    "Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.",
  ];
  articles.push({
    articleId: rootId,
    title: pageTitle,
    slug: slugify(pageTitle),
    content: overviewLines.join("\n") + "\n",
    toc: {
      articleId: rootId,
      title: pageTitle,
      url: ctx.url,
      depth: 0,
      parentUrl: null,
      breadcrumb: [pageTitle],
    },
  });

  for (let i = 0; i < valid.length; i++) {
    const { fragment, title, anchor } = valid[i]!;
    const nextAnchor = valid[i + 1]?.anchor ?? null;
    const sliceHtml = collectHtmlBetween(anchor!, nextAnchor);
    const cleaned = stripPresentationAttrs(sliceHtml);
    let markdown = await htmlToMarkdown(`<div>${cleaned}</div>`, ctx.url);
    markdown = postProcess(markdown);
    if (!markdown.trim()) continue;

    let slug = slugify(title) || fragment;
    const count = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, count);
    if (count > 1) slug = `${slug}-${count}`;

    const articleId = `toc-${i}-${fragment}`;
    const chapterUrl = `${ctx.url}#${fragment}`;
    articles.push({
      articleId,
      title,
      slug,
      content: markdown.trim() + "\n",
      toc: {
        articleId,
        title,
        url: chapterUrl,
        depth: 1,
        parentUrl: ctx.url,
        breadcrumb: [pageTitle, title],
      },
    });
  }

  (articles[0] as any)._pageTitle = pageTitle;
  return articles;
}

/**
 * Collect outerHTML of every node strictly between `start` and `end` in
 * document order. The `start` anchor itself is skipped (it's a marker, not
 * content). If `end` is null, walks to the end of the document.
 */
function collectHtmlBetween(start: Element, end: Element | null): string {
  const parts: string[] = [];
  let node: any = nextNode(start);
  while (node && node !== end) {
    if (end && node.contains && node.contains(end)) {
      // Descend into this node so we can stop precisely at `end`.
      node = node.firstChild;
      continue;
    }
    if (node.nodeType === 1) parts.push((node as Element).outerHTML);
    else if (node.nodeType === 3) parts.push(node.textContent || "");
    node = stepOver(node);
  }
  return parts.join("");
}

/** Move to next node in document order (depth-first, descends in). */
function nextNode(node: any): any {
  if (!node) return null;
  if (node.firstChild) return node.firstChild;
  return stepOver(node);
}

/** Move to next node in document order WITHOUT descending into `node`. */
function stepOver(node: any): any {
  while (node) {
    if (node.nextSibling) return node.nextSibling;
    node = node.parentNode;
  }
  return null;
}

/** Minimal escape for attribute values used in CSS selectors. */
function cssEscape(s: string): string {
  return s.replace(/(["\\\]\[#.():>+~*=^$|])/g, "\\$1");
}

/**
 * Split a documentation hub page (e.g. `/lava`, `/styling`) by following
 * the sidebar TOC links to separate child pages and rendering each as one
 * reference file in the same skill.
 *
 * Each `<a href="...">` inside `tocSelector` becomes one chapter:
 *   - href is resolved to an absolute URL
 *   - the linked page is fetched (with the same auth cookie as the hub)
 *   - defuddle extracts its title + markdown
 *   - the markdown becomes the chapter content
 *
 * By default only same-origin links whose pathname starts with the hub
 * page's pathname are followed (so `/lava` follows `/lava/...` but skips
 * `/page/3759` and external URLs). Pass `urlIncludes` globs to widen the
 * filter.
 *
 * Section headings (`<h6>` inside the TOC, e.g. "Filters", "Tags") become
 * grouping prefixes in the generated TOC; chapter titles use the link text.
 *
 * Pages are fetched with limited concurrency (5) to avoid hammering the
 * server. A synthetic depth-0 root article is emitted so `generateSkill`
 * produces a real Topics tree.
 */
export async function splitByTocPages(
  ctx: SplitContext,
  opts: {
    tocSelector: string;
    pageContentSelector?: string;
    urlIncludes?: string[];
  },
): Promise<SplitArticle[]> {
  const { fetchPage } = await import("../fetch");
  const { extractVariables } = await import("./defuddle");

  if (!opts.tocSelector) return [];
  const baseOrigin = safeOrigin(ctx.url);
  const basePathname = (() => {
    try {
      return new URL(ctx.url).pathname.replace(/\/+$/, "").toLowerCase();
    } catch {
      return "";
    }
  })();

  const { document } = parseHTML(ctx.html);
  document.querySelectorAll("script,style").forEach((n) => n.remove());

  // Build the include matcher.
  const includeGlobs =
    opts.urlIncludes && opts.urlIncludes.length > 0
      ? opts.urlIncludes
      : [`${basePathname}/**`];
  const matchers = includeGlobs.map((g) => globToRegex(g));
  const matchesInclude = (pathname: string) =>
    matchers.some((re) => re.test(pathname));

  // Page title: <h1> or first heading on the hub page.
  const pageTitle =
    document.querySelector("h1")?.textContent?.trim() ||
    String(ctx.variables.title || "").trim() ||
    "Documentation";
  ctx.variables.title = pageTitle;

  // Walk the TOC: collect (sectionTitle | null, linkTitle, absUrl) in order.
  // The TOC selector identifies the container element. We then walk for
  // section headings (`<h1>`-`<h6>`) and `<a href>` links inside it in
  // document order.
  const tocRoot =
    document.querySelector(opts.tocSelector) || document.body || document;
  type Item =
    | { kind: "section"; title: string }
    | { kind: "link"; title: string; absUrl: string; pathname: string };

  const items: Item[] = [];
  const seen = new Set<string>();

  // Walk the TOC subtree once in document order so section headings stay
  // associated with the link group that follows them.
  const walk = (node: any) => {
    const tag = (node?.tagName || "").toLowerCase();
    if (tag && /^h[1-6]$/.test(tag)) {
      const title = (node.textContent || "").trim();
      if (title) items.push({ kind: "section", title });
      return;
    }
    if (tag === "a") {
      const href = node.getAttribute("href") || "";
      const text = (node.textContent || "").trim();
      if (text) {
        let absUrl: string | null = null;
        try {
          absUrl = new URL(href, ctx.url).toString();
        } catch {
          absUrl = null;
        }
        if (absUrl) {
          const u = new URL(absUrl);
          const pathname = u.pathname.replace(/\/+$/, "").toLowerCase();
          const sameOrigin = !baseOrigin || u.origin === baseOrigin;
          if (
            sameOrigin &&
            pathname &&
            pathname !== basePathname &&
            matchesInclude(pathname) &&
            !seen.has(pathname)
          ) {
            seen.add(pathname);
            items.push({ kind: "link", title: text, absUrl, pathname });
          }
        }
      }
      // Don't descend into <a> — its text already captured.
      return;
    }
    const children = node?.childNodes || [];
    for (let i = 0; i < children.length; i++) walk(children[i]);
  };
  walk(tocRoot);

  const linkItems = items.filter(
    (i): i is Extract<Item, { kind: "link" }> => i.kind === "link",
  );
  if (linkItems.length === 0) return [];

  console.log(
    `  by-toc-pages: following ${linkItems.length} TOC links from ${pageTitle}`,
  );

  // Compile the template's note format ONCE — each fetched page is then
  // rendered with its own variables. This lets the template (e.g. the lava
  // hub) strip `.panel-body { display:none }` styles via `remove_attr` so
  // collapsed accordion content is exposed before markdown conversion.
  const compiledContent = compile(ctx.template.noteContentFormat);
  const compiledTitle = compile(ctx.template.noteNameFormat || "{{title}}");

  // Fetch all linked pages with bounded concurrency.
  const fetched = new Map<string, { title: string; markdown: string } | null>();
  const concurrency = 5;
  let cursor = 0;
  async function worker() {
    while (cursor < linkItems.length) {
      const idx = cursor++;
      const item = linkItems[idx]!;
      try {
        const html = await fetchPage(item.absUrl, ctx.cookie);
        const vars = await extractVariables(html, item.absUrl);
        const rendered = await evaluate(compiledContent, {
          variables: vars,
          url: item.absUrl,
          stepOutputs: ctx.stepOutputs,
          promptResolutions: ctx.promptResolutions,
        });
        const renderedTitle = await evaluate(compiledTitle, {
          variables: vars,
          url: item.absUrl,
          stepOutputs: ctx.stepOutputs,
          promptResolutions: ctx.promptResolutions,
        });
        const md = postProcess(rendered).trim();
        const title =
          renderedTitle.trim() || String(vars.title || "").trim() || item.title;
        if (!md) {
          fetched.set(item.absUrl, null);
        } else {
          fetched.set(item.absUrl, { title, markdown: md });
        }
      } catch (err) {
        console.warn(
          `  by-toc-pages: failed to fetch ${item.absUrl}: ${(err as Error).message}`,
        );
        fetched.set(item.absUrl, null);
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, linkItems.length) }, worker),
  );

  // Emit articles in this order:
  //   1. depth-0 ROOT — rendered from the hub page's own HTML so the user
  //      sees the actual Lava/Styling overview text, not a stub.
  //   2. depth-1 synthetic SECTION entries (one per `<h6>` in the TOC).
  //      Marked `isSection: true` so generate.ts skips writing a reference
  //      file and instead renders them as bold group labels in Topics.
  //   3. depth-2 PAGE entries, each parented to its preceding section
  //      (or to the root when the link appears before any section).
  const articles: SplitArticle[] = [];
  const slugCounts = new Map<string, number>();
  const reservedSlugs = new Set<string>([slugify(pageTitle)]);
  const claimSlug = (preferred: string, fallback: string): string => {
    let slug = slugify(preferred);
    if (!slug || reservedSlugs.has(slug)) slug = slugify(fallback) || slug;
    if (!slug) slug = "section";
    const count = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, count);
    if (count > 1 || reservedSlugs.has(slug)) slug = `${slug}-${count}`;
    reservedSlugs.add(slug);
    return slug;
  };

  // Render the hub page itself so the root has the real overview content.
  let rootContent = "";
  try {
    const rootRendered = await evaluate(compiledContent, {
      variables: ctx.variables,
      url: ctx.url,
      stepOutputs: ctx.stepOutputs,
      promptResolutions: ctx.promptResolutions,
    });
    rootContent = postProcess(rootRendered).trim();
  } catch (err) {
    console.warn(
      `  by-toc-pages: failed to render hub page: ${(err as Error).message}`,
    );
  }
  if (!rootContent) {
    rootContent = buildHubOverview(pageTitle, items, ctx.url);
  }

  articles.push({
    articleId: "root",
    title: pageTitle,
    slug: slugify(pageTitle),
    content: rootContent + "\n",
    toc: {
      articleId: "root",
      title: pageTitle,
      url: ctx.url,
      depth: 0,
      parentUrl: null,
      breadcrumb: [pageTitle],
    },
  });

  // Walk items, emitting section entries on the fly so each link can be
  // parented to the most recent section.
  let currentSectionUrl: string | null = null;
  let currentSectionTitle = "";
  for (const item of items) {
    if (item.kind === "section") {
      const sectionSlug = claimSlug(item.title, "section");
      currentSectionTitle = item.title;
      currentSectionUrl = `${ctx.url}#section-${sectionSlug}`;
      articles.push({
        articleId: `toc-section-${sectionSlug}`,
        title: item.title,
        slug: sectionSlug,
        content: "",
        toc: {
          articleId: `toc-section-${sectionSlug}`,
          title: item.title,
          url: currentSectionUrl,
          depth: 1,
          parentUrl: ctx.url,
          breadcrumb: [pageTitle, item.title],
          isSection: true,
        },
      });
      continue;
    }

    const got = fetched.get(item.absUrl);
    if (!got) continue;

    const lastSeg = item.pathname.split("/").filter(Boolean).pop() || "";
    const slug = claimSlug(item.title, lastSeg);

    const breadcrumb = currentSectionTitle
      ? [pageTitle, currentSectionTitle, item.title]
      : [pageTitle, item.title];

    articles.push({
      articleId: `toc-page-${slug}`,
      title: item.title,
      slug,
      content: got.markdown + "\n",
      toc: {
        articleId: `toc-page-${slug}`,
        title: item.title,
        url: item.absUrl,
        depth: currentSectionUrl ? 2 : 1,
        parentUrl: currentSectionUrl ?? ctx.url,
        breadcrumb,
      },
    });
  }

  (articles[0] as any)._pageTitle = pageTitle;
  return articles;
}

function buildHubOverview(
  pageTitle: string,
  _items: Array<
    | { kind: "section"; title: string }
    | { kind: "link"; title: string; absUrl: string; pathname: string }
  >,
  hubUrl: string,
): string {
  return (
    `This skill catalogs the *${pageTitle}* documentation from [${hubUrl}](${hubUrl}). ` +
    `Each topic listed below is available as a separate reference file — load only the ones relevant to the task at hand.\n`
  );
}

/** Glob → RegExp (mirrors triggers.ts: `**` → `.*`, `*` → `[^/]*`). */
function globToRegex(glob: string): RegExp {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "\u0001")
    .replace(/\*/g, "[^/]*")
    .replace(/\u0001/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}
