import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { getBaseOrigin } from "./utils";
import { parseToc, type TocEntry } from "./hierarchy";

export interface ArticleSection {
  /** Article ID from data-article-id */
  articleId: string;
  /** Display title (from H1 heading) */
  title: string;
  /** Slugified filename (from last URL segment) */
  slug: string;
  /** Markdown content of this article */
  content: string;
  /** Hierarchy info from the TOC */
  toc: TocEntry;
}

/**
 * Parse a Rockumentation print page and extract each article as a separate
 * markdown section, with hierarchy metadata from the TOC.
 */
export function extractArticles(
  html: string,
  sourceUrl: string,
): { articles: ArticleSection[]; pageTitle: string } {
  const baseOrigin = getBaseOrigin(sourceUrl);
  const $ = cheerio.load(html);

  // Clean up global junk
  $("script, style").remove();

  // Remove Rockumentation navigation elements that duplicate the TOC
  $(".article-cards-container").remove();

  // Remove "Navigate to header" and "Copy page" links
  $("a").each((_, el) => {
    const text = $(el).text().trim();
    if (text === "Navigate to header" || text === "Copy page") {
      $(el).remove();
    }
  });

  // Remove images without src
  $("img").each((_, el) => {
    if (!$(el).attr("src")) $(el).remove();
  });

  // Parse the TOC BEFORE converting relative URLs to absolute
  // (TOC links use relative paths like /developer/developer-codex/...)
  const tocMap = parseToc($, sourceUrl);

  // Convert relative URLs to absolute
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/")) {
      $(el).attr("href", `${baseOrigin}${href}`);
    }
  });
  $("img[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (src && src.startsWith("/")) {
      $(el).attr("src", `${baseOrigin}${src}`);
    }
  });

  // Build a reusable Turndown instance
  const turndown = createTurndown();

  // Extract articles from .center-container
  // Structure: .article-header (with H1) → article.rockumentation-article → .article-footer (repeating)
  const center = $(".doc-container .center-container");
  const articles: ArticleSection[] = [];
  let pageTitle = "Rock RMS Documentation";

  center.find("article.rockumentation-article").each((_, el) => {
    const $article = $(el);
    const articleId = $article.attr("data-article-id");
    if (!articleId) return;

    const tocEntry = tocMap.get(articleId);
    if (!tocEntry) return;

    // The H1 is in the preceding .article-header sibling
    const $header = $article.prev(".article-header");
    const title = $header.find("h1").text().trim() || tocEntry.title;

    // Track the page title from the main (root) article
    if ($article.attr("data-main-article") === "true") {
      pageTitle = title || pageTitle;
    }

    // Convert this article's HTML to markdown
    // Include the heading from .article-header + the article body
    const headerHtml = $header.length ? $.html($header) : "";
    const articleHtml = $.html($article);
    const combinedHtml = headerHtml + articleHtml;

    let markdown = turndown.turndown(combinedHtml);
    markdown = postProcess(markdown);

    // Derive slug from the last URL segment
    const urlSegments = tocEntry.url.split("/").filter((s) => s.length > 0);
    const slug = urlSegments[urlSegments.length - 1] || "overview";

    articles.push({
      articleId,
      title,
      slug,
      content: markdown,
      toc: tocEntry,
    });
  });

  // Disambiguate duplicate slugs by prepending the parent segment
  const slugCounts = new Map<string, number>();
  for (const a of articles) {
    slugCounts.set(a.slug, (slugCounts.get(a.slug) || 0) + 1);
  }
  for (const a of articles) {
    if ((slugCounts.get(a.slug) || 0) > 1) {
      const urlSegments = a.toc.url.split("/").filter((s) => s.length > 0);
      if (urlSegments.length >= 2) {
        a.slug = `${urlSegments[urlSegments.length - 2]}-${a.slug}`;
      }
    }
  }

  return { articles, pageTitle };
}

function createTurndown(): TurndownService {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
  });

  turndown.use(gfm);

  // Custom rule: preserve code blocks with language hints
  turndown.addRule("codeBlocks", {
    filter: (node) => {
      return node.nodeName === "PRE" && node.querySelector("code") !== null;
    },
    replacement: (_content, node) => {
      const codeEl = node.querySelector("code");
      if (!codeEl) return _content;

      const className = (codeEl as any).className || "";
      const langMatch = className.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : "";
      const code = codeEl.textContent || "";

      return `\n\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n\n`;
    },
  });

  // Custom rule: handle placeholder images
  turndown.addRule("skipPlaceholderImages", {
    filter: (node) => {
      if (node.nodeName !== "IMG") return false;
      const alt =
        (node as any).alt || (node as any).getAttribute?.("alt") || "";
      return alt === "Image" || alt === "[Image: Image]";
    },
    replacement: (_content, node) => {
      const src = (node as any).src || (node as any).getAttribute?.("src");
      if (src) {
        return `\n\n![Image](${src})\n\n`;
      }
      return "";
    },
  });

  return turndown;
}

function postProcess(markdown: string): string {
  return markdown
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/^\s+/, "")
    .replace(/\s+$/, "\n");
}
