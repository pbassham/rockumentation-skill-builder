#!/usr/bin/env bun

import { resolve } from "node:path";
import index from "./ui/index.html";
import { fetchPage } from "./fetch";
import { extractArticles } from "./convert";
import { generateSkill } from "./generate";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";

const server = Bun.serve({
  port: 3456,
  routes: {
    "/": index,

    "/api/build": {
      POST: async (req) => {
        const body = await req.json();
        const { url, outputDir, customInstructions, username, password } =
          body as {
            url: string;
            outputDir: string;
            customInstructions?: string;
            username?: string;
            password?: string;
          };

        if (!url) {
          return Response.json({ error: "URL is required" }, { status: 400 });
        }

        try {
          new URL(url);
        } catch {
          return Response.json({ error: "Invalid URL" }, { status: 400 });
        }

        const resolvedOutput = resolve(outputDir || "./output");

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const send = (data: Record<string, unknown>) => {
              controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            };

            try {
              // Authenticate if credentials provided
              let cookie: string | undefined;
              if (username && password) {
                send({ step: 1, status: "running", message: "Logging in..." });
                cookie = await rockLogin(url, username, password);
                send({ step: 1, status: "done", message: "Authenticated" });
              }

              send({ step: 2, status: "running", message: "Fetching page..." });
              const html = await fetchPage(url, cookie);
              send({
                step: 2,
                status: "done",
                message: `Fetched ${(html.length / 1024).toFixed(1)} KB of HTML`,
              });

              send({
                step: 3,
                status: "running",
                message: "Extracting articles with hierarchy...",
              });
              const { articles, pageTitle } = extractArticles(html, url);

              if (articles.length === 0) {
                send({
                  step: 3,
                  status: "error",
                  message:
                    "No Rockumentation articles found. Make sure the URL points to a Rockumentation page.",
                });
                controller.close();
                return;
              }

              const childArticles = articles.filter((a) => a.toc.depth > 0);
              const maxDepth = Math.max(...articles.map((a) => a.toc.depth));
              const depthSummary: string[] = [];
              for (let d = 0; d <= maxDepth; d++) {
                const count = articles.filter((a) => a.toc.depth === d).length;
                depthSummary.push(`Depth ${d}: ${count}`);
              }

              send({
                step: 3,
                status: "done",
                message: `Found ${articles.length} articles (${depthSummary.join(", ")})`,
                pageTitle,
                articleCount: articles.length,
              });

              const skillName = deriveSkillName(url);
              send({
                step: 4,
                status: "running",
                message: `Generating skill "${skillName}"...`,
                skillName,
                pageTitle,
              });

              const skillDir = await generateSkill({
                skillName,
                pageTitle,
                sourceUrl: url,
                articles,
                outputDir: resolvedOutput,
                customInstructions,
              });

              send({
                step: 4,
                status: "done",
                message: `Generated ${childArticles.length} reference files`,
              });

              send({
                step: 5,
                status: "complete",
                message: "Build complete!",
                skillDir,
                skillName,
                pageTitle,
                articleCount: articles.length,
                refCount: childArticles.length,
              });
            } catch (err: any) {
              send({
                step: 0,
                status: "error",
                message: err.message || "Unknown error",
              });
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "application/x-ndjson",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(
  `\n🚀 Rockumentation Skill Builder UI running at http://localhost:${server.port}\n`,
);
