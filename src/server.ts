#!/usr/bin/env bun

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import index from "./ui/index.html";
import { fetchPage } from "./fetch";
import { extractArticles } from "./convert";
import { generateSkill, updateSkillMdDescriptions } from "./generate";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";
import { parseFrontmatter, setDescription } from "./frontmatter";
import { generateDescription } from "./describe";
import { listCategories, splitSkill } from "./split-skill";

const server = Bun.serve({
  port: 3456,
  routes: {
    "/": index,

    "/api/build": {
      POST: async (req) => {
        const body = await req.json();
        const {
          url,
          outputDir,
          customInstructions,
          username,
          password,
          mergeThreshold,
        } = body as {
          url: string;
          outputDir: string;
          customInstructions?: string;
          username?: string;
          password?: string;
          mergeThreshold?: number;
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
                mergeThreshold: mergeThreshold || 0,
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

    "/api/zip": {
      GET: async (req) => {
        const url = new URL(req.url);
        const skillDir = url.searchParams.get("skillDir");
        if (!skillDir) {
          return Response.json(
            { error: "skillDir query parameter is required" },
            { status: 400 },
          );
        }

        // Read skill name from SKILL.md frontmatter
        let folderName: string;
        try {
          const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
          const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
          folderName = nameMatch?.[1]?.trim() || "skill";
        } catch {
          return Response.json(
            { error: "Invalid skill directory" },
            { status: 400 },
          );
        }

        // Create ZIP with proper structure: folderName/SKILL.md + folderName/references/*
        const proc = Bun.spawn(["zip", "-r", "-", "SKILL.md", "references"], {
          cwd: skillDir,
          stdout: "pipe",
          stderr: "pipe",
        });

        const zipBytes = await new Response(proc.stdout).arrayBuffer();
        const exitCode = await proc.exited;

        if (exitCode !== 0) {
          const stderr = await new Response(proc.stderr).text();
          return Response.json(
            { error: `ZIP creation failed: ${stderr}` },
            { status: 500 },
          );
        }

        return new Response(zipBytes, {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${folderName}.zip"`,
          },
        });
      },
    },

    "/api/categories": {
      GET: async (req) => {
        const url = new URL(req.url);
        const skillDir = url.searchParams.get("skillDir");
        if (!skillDir) {
          return Response.json(
            { error: "skillDir query parameter is required" },
            { status: 400 },
          );
        }
        try {
          const result = await listCategories(skillDir);
          return Response.json(result);
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to list categories" },
            { status: 400 },
          );
        }
      },
    },

    "/api/split": {
      POST: async (req) => {
        const body = await req.json();
        const { skillDir, categorySlugs } = body as {
          skillDir: string;
          categorySlugs: string[];
        };
        if (!skillDir || !categorySlugs?.length) {
          return Response.json(
            { error: "skillDir and categorySlugs are required" },
            { status: 400 },
          );
        }
        try {
          const results = await splitSkill(skillDir, categorySlugs);
          return Response.json({ results });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Split failed" },
            { status: 500 },
          );
        }
      },
    },

    "/api/settings": {
      GET: () => {
        return Response.json({
          hasApiKey: !!process.env.ANTHROPIC_API_KEY,
        });
      },
    },

    "/api/references": {
      GET: async (req) => {
        const url = new URL(req.url);
        const skillDir = url.searchParams.get("skillDir");
        if (!skillDir) {
          return Response.json(
            { error: "skillDir query parameter is required" },
            { status: 400 },
          );
        }

        let skillMd: string;
        try {
          skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
        } catch {
          return Response.json(
            { error: "Invalid skill directory" },
            { status: 400 },
          );
        }

        const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
        const skillName = nameMatch?.[1]?.trim() || "";
        const headingMatch = skillMd.match(/^#\s+(.+)$/m);
        const pageTitle = headingMatch?.[1]?.trim() || skillName;

        const refsDir = join(skillDir, "references");
        const files = await readdir(refsDir).catch(() => [] as string[]);
        const mdFiles = files.filter((f) => f.endsWith(".md"));

        const references = await Promise.all(
          mdFiles.map(async (filename) => {
            const content = await Bun.file(join(refsDir, filename)).text();
            const { description, body } = parseFrontmatter(content);

            const titleMatch = body.match(/^#\s+(.+)$/m);
            const title =
              titleMatch?.[1]?.trim() || filename.replace(".md", "");

            const bcMatch = body.match(/^>\s*\*\*Path:\*\*\s*(.+)$/m);
            const breadcrumb = bcMatch?.[1]?.trim() || "";

            return {
              slug: filename.replace(".md", ""),
              title,
              breadcrumb,
              description: description || null,
              hasDescription: !!description,
            };
          }),
        );

        references.sort((a, b) => a.title.localeCompare(b.title));
        return Response.json({ skillName, pageTitle, references });
      },
    },

    "/api/describe": {
      POST: async (req) => {
        const body = await req.json();
        const {
          skillDir,
          slugs,
          apiKey: reqApiKey,
        } = body as {
          skillDir: string;
          slugs?: string[];
          apiKey?: string;
        };

        const apiKey = reqApiKey?.trim() || process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return Response.json(
            {
              error:
                "No API key configured. Set ANTHROPIC_API_KEY in .env or provide one in AI Settings.",
            },
            { status: 400 },
          );
        }

        if (!skillDir) {
          return Response.json(
            { error: "skillDir is required" },
            { status: 400 },
          );
        }

        const refsDir = join(skillDir, "references");
        let skillName = "";
        let pageTitle = "";
        try {
          const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
          const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
          skillName = nameMatch?.[1]?.trim() || "";
          const headingMatch = skillMd.match(/^#\s+(.+)$/m);
          pageTitle = headingMatch?.[1]?.trim() || skillName;
        } catch {
          return Response.json(
            { error: "Invalid skill directory" },
            { status: 400 },
          );
        }

        const allFiles = await readdir(refsDir).catch(() => [] as string[]);
        const mdFiles = allFiles.filter((f) => f.endsWith(".md"));
        const targetFiles = slugs
          ? mdFiles.filter((f) => slugs.includes(f.replace(".md", "")))
          : mdFiles;

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const send = (data: Record<string, unknown>) => {
              controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            };

            const updatedDescs = new Map<string, string>();
            let generated = 0;
            let errors = 0;

            for (const filename of targetFiles) {
              const slug = filename.replace(".md", "");
              send({ slug, status: "running" });

              try {
                const filepath = join(refsDir, filename);
                const content = await Bun.file(filepath).text();
                const { body } = parseFrontmatter(content);

                const refTitleMatch = body.match(/^#\s+(.+)$/m);
                const title = refTitleMatch?.[1]?.trim() || slug;
                const bcMatch = body.match(/^>\s*\*\*Path:\*\*\s*(.+)$/m);
                const breadcrumb = bcMatch?.[1]?.trim() || "";

                const description = await generateDescription(
                  { slug, title, breadcrumb, content: body },
                  { skillName, pageTitle },
                  apiKey,
                );

                const updated = setDescription(content, description);
                await Bun.write(filepath, updated);

                updatedDescs.set(slug, description);
                generated++;
                send({ slug, status: "done", description });
              } catch (err: any) {
                errors++;
                send({
                  slug,
                  status: "error",
                  message: err.message || "Failed to generate description",
                });
              }
            }

            if (updatedDescs.size > 0) {
              try {
                await updateSkillMdDescriptions(skillDir, updatedDescs);
              } catch (err: any) {
                send({
                  status: "error",
                  message: `Failed to update SKILL.md: ${err.message}`,
                });
              }
            }

            send({
              status: "complete",
              message: `Generated ${generated} description${generated !== 1 ? "s" : ""}${errors > 0 ? `, ${errors} error${errors !== 1 ? "s" : ""}` : ""}`,
              generated,
              errors,
            });

            controller.close();
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
