#!/usr/bin/env bun

import { resolve } from "node:path";
import { fetchPage, looksLikeLoginPage } from "./fetch";
import { extractWithTemplate } from "./extract";
import { allTemplates, getById } from "../templates";
import { generateSkill } from "./generate";
import { validateSkill, formatProblems } from "./validate-skill";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";
import { enumerateDocumentationIndex } from "./curated-roots";

function parseArgs(args: string[]): {
  url?: string;
  outputDir: string;
  username?: string;
  password?: string;
  mergeThreshold: number;
  templateId?: string;
  listTemplates: boolean;
  printTemplate?: string;
} {
  const positional: string[] = [];
  let outputDir = "./output";
  let username: string | undefined;
  let password: string | undefined;
  let mergeThreshold = 0;
  let templateId: string | undefined;
  let listTemplates = false;
  let printTemplate: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === "--output" || arg === "-o") {
      outputDir = args[++i] ?? outputDir;
    } else if (arg.startsWith("--output=")) {
      outputDir = arg.split("=")[1] ?? outputDir;
    } else if (arg === "--username" || arg === "-u") {
      username = args[++i];
    } else if (arg.startsWith("--username=")) {
      username = arg.split("=").slice(1).join("=");
    } else if (arg === "--password" || arg === "-p") {
      password = args[++i];
    } else if (arg.startsWith("--password=")) {
      password = arg.split("=").slice(1).join("=");
    } else if (arg === "--merge-threshold" || arg === "-m") {
      mergeThreshold = parseInt(args[++i] ?? "0", 10) || 0;
    } else if (arg.startsWith("--merge-threshold=")) {
      mergeThreshold = parseInt(arg.split("=")[1] ?? "0", 10) || 0;
    } else if (arg === "--template" || arg === "-t") {
      templateId = args[++i];
    } else if (arg.startsWith("--template=")) {
      templateId = arg.split("=")[1];
    } else if (arg === "--list-templates") {
      listTemplates = true;
    } else if (arg === "--print-template") {
      printTemplate = args[++i];
    } else if (arg.startsWith("--print-template=")) {
      printTemplate = arg.split("=")[1];
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  return {
    url: positional[0],
    outputDir: resolve(outputDir),
    username,
    password,
    mergeThreshold,
    templateId,
    listTemplates,
    printTemplate,
  };
}

function printUsage() {
  console.error(
    "Usage: bun run src/index.ts <url> [--output <dir>] [--template <id>]",
    "\n                              [--username <user> --password <pass>]",
    "\n                              [--merge-threshold <lines>]",
    "\n       bun run src/index.ts --list-templates",
    "\n       bun run src/index.ts --print-template <id>",
  );
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.listTemplates) {
    console.log("Available templates:\n");
    for (const t of allTemplates()) {
      console.log(`  ${t.id.padEnd(28)} ${t.name}`);
      console.log(
        `    splitter: ${t.splitter?.id ?? "single"}`,
        t.interpreterPipeline?.length
          ? `, pipeline: ${t.interpreterPipeline.length} step(s)`
          : "",
      );
      console.log(`    triggers: ${t.triggers.join(" | ")}`);
      if (t.description) console.log(`    ${t.description}`);
      console.log();
    }
    return;
  }

  if (opts.printTemplate) {
    const t = getById(opts.printTemplate);
    if (!t) {
      console.error(`No such template: ${opts.printTemplate}`);
      process.exit(1);
    }
    console.log(JSON.stringify(t, null, 2));
    return;
  }

  if (!opts.url) {
    printUsage();
    process.exit(1);
  }

  const { url, outputDir, username, password, mergeThreshold, templateId } =
    opts;

  console.log("=== Rockumentation Skill Builder ===\n");

  let cookie: string | undefined;
  if (username && password) {
    console.log("Step 0: Logging in...");
    cookie = await rockLogin(url, username, password);
    console.log("  Authenticated\n");
  }

  console.log("Step 1: Fetching page...");
  const html = await fetchPage(url, cookie);

  if (looksLikeLoginPage(html)) {
    const hint = cookie
      ? "Authentication did not grant access. Check the username/password."
      : "This page requires login. Pass --username and --password and try again.";
    console.error(`\n\u2717 ${hint}`);
    process.exit(2);
  }

  // If this is the Rock documentation index, enumerate every manual on the
  // bookshelf and process each one as a separate skill.
  const indexBookUrls = enumerateDocumentationIndex(html, url);
  if (indexBookUrls.length > 0) {
    console.log(
      `\nDocumentation index detected — found ${indexBookUrls.length} manual(s) to process.\n`,
    );
    let successes = 0;
    const failures: Array<{ url: string; error: string }> = [];
    for (let i = 0; i < indexBookUrls.length; i++) {
      const bookUrl = indexBookUrls[i]!;
      console.log(`\n--- [${i + 1}/${indexBookUrls.length}] ${bookUrl} ---`);
      try {
        await processSingleUrl({
          url: bookUrl,
          outputDir,
          cookie,
          templateId,
          mergeThreshold,
        });
        successes++;
      } catch (err) {
        const msg = (err as Error).message;
        console.error(`  ✗ Failed: ${msg}`);
        failures.push({ url: bookUrl, error: msg });
      }
    }
    console.log(
      `\n=== Batch complete: ${successes} succeeded, ${failures.length} failed ===`,
    );
    for (const f of failures) console.error(`  ✗ ${f.url}: ${f.error}`);
    if (failures.length > 0) process.exit(1);
    return;
  }

  await processSingleUrl({
    url,
    outputDir,
    cookie,
    templateId,
    mergeThreshold,
    prefetchedHtml: html,
  });
}

interface SingleUrlOptions {
  url: string;
  outputDir: string;
  cookie?: string;
  templateId?: string;
  mergeThreshold: number;
  /** Reuse already-fetched HTML when available. */
  prefetchedHtml?: string;
}

async function processSingleUrl(opts: SingleUrlOptions): Promise<void> {
  const { url, outputDir, cookie, templateId, mergeThreshold } = opts;
  const html = opts.prefetchedHtml ?? (await fetchPage(url, cookie));

  if (!opts.prefetchedHtml && looksLikeLoginPage(html)) {
    const hint = cookie
      ? "Authentication did not grant access. Check the username/password."
      : "This page requires login. Pass --username and --password and try again.";
    throw new Error(hint);
  }

  console.log("Extracting articles...");
  const { articles, pageTitle, template } = await extractWithTemplate(
    html,
    url,
    templateId,
    cookie,
  );
  console.log(`  Template: ${template.name} (${template.id})`);
  console.log(`  Found ${articles.length} articles`);

  if (articles.length === 0) {
    throw new Error(
      "No articles extracted. Try `--template default-defuddle` or `--list-templates`.",
    );
  }

  const rootArticle = articles.find((a) => a.toc.depth === 0);
  const childArticles = articles.filter((a) => a.toc.depth > 0);
  const maxDepth = Math.max(...articles.map((a) => a.toc.depth));
  for (let d = 0; d <= maxDepth; d++) {
    const count = articles.filter((a) => a.toc.depth === d).length;
    console.log(`  Depth ${d}: ${count} articles`);
  }

  const skillName = deriveSkillName(url, pageTitle);
  console.log(`Generating skill "${skillName}"...`);
  console.log(`  Page title: ${pageTitle}`);
  console.log(`  Root article: ${rootArticle ? "yes" : "no"}`);
  console.log(`  Child articles: ${childArticles.length}`);

  const skillDir = await generateSkill({
    skillName,
    pageTitle,
    sourceUrl: url,
    articles,
    outputDir,
    mergeThreshold,
  });

  console.log(`✓ Skill generated at: ${skillDir}`);

  const validation = await validateSkill(skillDir);
  if (validation.problems.length > 0) {
    console.log(`\nValidation:`);
    console.log(formatProblems(validation));
    if (!validation.ok) {
      console.log(
        `\n✗ Skill failed validation. Fix the errors above before publishing.`,
      );
      process.exit(2);
    }
  }
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});
