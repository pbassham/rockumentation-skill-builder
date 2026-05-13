#!/usr/bin/env bun

import { resolve } from "node:path";
import { fetchPage } from "./fetch";
import { extractWithTemplate } from "./extract";
import { allTemplates, getById } from "../templates";
import { generateSkill } from "./generate";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";

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

  console.log("\nStep 2: Extracting articles...");
  const { articles, pageTitle, template } = await extractWithTemplate(
    html,
    url,
    templateId,
    cookie,
  );
  console.log(`  Template: ${template.name} (${template.id})`);
  console.log(`  Found ${articles.length} articles`);

  if (articles.length === 0) {
    console.error(
      "\nNo articles extracted. Try `--template default-defuddle` or `--list-templates`.",
    );
    process.exit(1);
  }

  const rootArticle = articles.find((a) => a.toc.depth === 0);
  const childArticles = articles.filter((a) => a.toc.depth > 0);
  const maxDepth = Math.max(...articles.map((a) => a.toc.depth));
  for (let d = 0; d <= maxDepth; d++) {
    const count = articles.filter((a) => a.toc.depth === d).length;
    console.log(`  Depth ${d}: ${count} articles`);
  }

  const skillName = deriveSkillName(url, pageTitle);
  console.log(`\nStep 3: Generating skill "${skillName}"...`);
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

  console.log(`\n✓ Skill generated at: ${skillDir}`);
  console.log(
    `\nTo use this skill, copy "${skillName}/" to your AI agent's skills directory.`,
  );
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});
