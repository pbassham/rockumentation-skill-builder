#!/usr/bin/env bun

import { resolve } from "node:path";
import { fetchPage } from "./fetch";
import { extractArticles } from "./convert";
import { generateSkill } from "./generate";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";

function parseArgs(args: string[]): {
  url: string;
  outputDir: string;
  username?: string;
  password?: string;
  mergeThreshold: number;
} {
  const positional: string[] = [];
  let outputDir = "./output";
  let username: string | undefined;
  let password: string | undefined;
  let mergeThreshold = 0;

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
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  if (positional.length === 0) {
    console.error(
      "Usage: bun run src/index.ts <rockumentation-url> [--output <dir>] [--username <user> --password <pass>] [--merge-threshold <lines>]",
    );
    console.error(
      "\nExample: bun run src/index.ts https://community.rockrms.com/developer/developer-codex",
    );
    console.error(
      "\nOptions:",
      "\n  -o, --output <dir>            Output directory (default: ./output)",
      "\n  -u, --username <user>         Rock RMS username for private docs",
      "\n  -p, --password <pass>         Rock RMS password",
      "\n  -m, --merge-threshold <lines> Merge leaf articles under this line count into parent (0 = disabled)",
    );
    process.exit(1);
  }

  return {
    url: positional[0]!,
    outputDir: resolve(outputDir),
    username,
    password,
    mergeThreshold,
  };
}

async function main() {
  const { url, outputDir, username, password, mergeThreshold } = parseArgs(
    process.argv.slice(2),
  );

  console.log("=== Rockumentation Skill Builder ===\n");

  // 0. Authenticate if credentials provided
  let cookie: string | undefined;
  if (username && password) {
    console.log("Step 0: Logging in...");
    cookie = await rockLogin(url, username, password);
    console.log("  Authenticated\n");
  }

  // 1. Fetch
  console.log("Step 1: Fetching page...");
  const html = await fetchPage(url, cookie);

  // 2. Extract articles with hierarchy
  console.log("\nStep 2: Extracting articles with hierarchy...");
  const { articles, pageTitle } = extractArticles(html, url);
  console.log(`Found ${articles.length} articles`);

  if (articles.length === 0) {
    console.error(
      "\nNo Rockumentation articles found on this page.",
      "\nMake sure the URL points to a Rockumentation documentation page",
      "(e.g. https://community.rockrms.com/developer/developer-codex).",
    );
    process.exit(1);
  }

  const rootArticle = articles.find((a) => a.toc.depth === 0);
  const childArticles = articles.filter((a) => a.toc.depth > 0);

  // Show hierarchy summary
  const maxDepth = Math.max(...articles.map((a) => a.toc.depth));
  for (let d = 0; d <= maxDepth; d++) {
    const count = articles.filter((a) => a.toc.depth === d).length;
    console.log(`  Depth ${d}: ${count} articles`);
  }

  // Derive skill name
  const skillName = deriveSkillName(url);

  console.log(`\nStep 3: Generating skill "${skillName}"...`);
  console.log(`  Page title: ${pageTitle}`);
  console.log(`  Root article: ${rootArticle ? "yes" : "no"}`);
  console.log(`  Child articles: ${childArticles.length}`);

  // 3. Generate
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
