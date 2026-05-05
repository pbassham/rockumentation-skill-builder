#!/usr/bin/env bun

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import index from "./ui/index.html";
import gallery from "./ui/gallery.html";
import galleryDetail from "./ui/gallery-detail.html";
import { fetchPage } from "./fetch";
import { extractArticles } from "./convert";
import { generateSkill, updateSkillMdDescriptions } from "./generate";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";
import { parseFrontmatter, setDescription } from "./frontmatter";
import { generateDescription } from "./describe";
import { listCategories, splitSkill } from "./split-skill";
import {
  isStorageConfigured,
  newSkillId,
  uploadSkill,
  uploadSkillFile,
  listSkillFiles,
  getSkillFileText,
  listPublicSkills,
  getSkillMeta,
  getSkillZipFile,
} from "./storage";

async function zipSkillDir(skillDir: string): Promise<Uint8Array> {
  const proc = Bun.spawn(["zip", "-r", "-q", "-", "SKILL.md", "references"], {
    cwd: skillDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  const bytes = new Uint8Array(await new Response(proc.stdout).arrayBuffer());
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`zip failed: ${stderr}`);
  }
  return bytes;
}

/**
 * Read SKILL.md + every references/*.md from disk and return them as a
 * relative-path → content map suitable for uploading to the public gallery.
 */
async function collectSkillFiles(
  skillDir: string,
): Promise<{ path: string; content: string }[]> {
  const files: { path: string; content: string }[] = [];
  try {
    const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
    files.push({ path: "SKILL.md", content: skillMd });
  } catch {}
  const refsDir = join(skillDir, "references");
  const names = await readdir(refsDir).catch(() => [] as string[]);
  for (const name of names.filter((n) => n.endsWith(".md")).sort()) {
    try {
      const content = await Bun.file(join(refsDir, name)).text();
      files.push({ path: `references/${name}`, content });
    } catch {}
  }
  return files;
}

/**
 * Generate AI descriptions for every reference file in `skillDir` that
 * doesn't already have one in its frontmatter, then update SKILL.md's TOC.
 */
async function generateMissingDescriptions(
  skillDir: string,
  apiKey: string,
  send: (data: Record<string, unknown>) => void,
): Promise<{ generated: number; errors: number }> {
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
    return { generated: 0, errors: 0 };
  }

  const allFiles = await readdir(refsDir).catch(() => [] as string[]);
  const mdFiles = allFiles.filter((f) => f.endsWith(".md"));
  const updatedDescs = new Map<string, string>();
  let generated = 0;
  let errors = 0;

  for (let i = 0; i < mdFiles.length; i++) {
    const filename = mdFiles[i]!;
    const slug = filename.replace(".md", "");
    const filepath = join(refsDir, filename);
    const content = await Bun.file(filepath).text();
    const { description, body } = parseFrontmatter(content);
    if (description) continue; // already has one, skip

    send({
      step: 5,
      status: "running",
      message: `Describing ${i + 1}/${mdFiles.length}: ${slug}`,
    });

    try {
      const refTitleMatch = body.match(/^#\s+(.+)$/m);
      const title = refTitleMatch?.[1]?.trim() || slug;
      const bcMatch = body.match(/^>\s*\*\*Path:\*\*\s*(.+)$/m);
      const breadcrumb = bcMatch?.[1]?.trim() || "";

      const desc = await generateDescription(
        { slug, title, breadcrumb, content: body },
        { skillName, pageTitle },
        apiKey,
      );
      const updated = setDescription(content, desc);
      await Bun.write(filepath, updated);
      updatedDescs.set(slug, desc);
      generated++;
    } catch (err: any) {
      errors++;
      send({
        step: 5,
        status: "running",
        message: `Failed to describe ${slug}: ${err.message || err}`,
      });
    }
  }

  if (updatedDescs.size > 0) {
    try {
      await updateSkillMdDescriptions(skillDir, updatedDescs);
    } catch {}
  }

  return { generated, errors };
}

const server = Bun.serve({
  port: Number(process.env.PORT) || 3456,
  routes: {
    "/": index,
    "/gallery": gallery,

    "/api/storage-status": {
      GET: () => Response.json({ enabled: isStorageConfigured() }),
    },

    "/api/public-skills": {
      GET: async () => {
        if (!isStorageConfigured()) {
          return Response.json({ enabled: false, skills: [] });
        }
        try {
          const skills = await listPublicSkills();
          return Response.json({ enabled: true, skills });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to list skills" },
            { status: 500 },
          );
        }
      },
    },

    "/s/:id": {
      GET: async (req) => {
        const id = (req.params as { id: string }).id;
        if (!isStorageConfigured()) {
          return new Response("Public storage is not configured.", {
            status: 404,
          });
        }
        const meta = await getSkillMeta(id);
        if (!meta) {
          return new Response("Skill not found.", { status: 404 });
        }
        const file = getSkillZipFile(id);
        return new Response(file.stream(), {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${meta.skillName}.zip"`,
          },
        });
      },
    },

    "/g/:id": galleryDetail,

    "/api/public-skill/:id": {
      GET: async (req) => {
        const id = (req.params as { id: string }).id;
        if (!isStorageConfigured()) {
          return Response.json(
            { error: "Public storage is not configured." },
            { status: 404 },
          );
        }
        const meta = await getSkillMeta(id);
        if (!meta) {
          return Response.json({ error: "Skill not found" }, { status: 404 });
        }
        const files = await listSkillFiles(id);
        return Response.json({ meta, files });
      },
    },

    "/api/public-skill/:id/file": {
      GET: async (req) => {
        const id = (req.params as { id: string }).id;
        const path = new URL(req.url).searchParams.get("path");
        if (!path) {
          return new Response("path query param required", { status: 400 });
        }
        if (!isStorageConfigured()) {
          return new Response("Public storage is not configured.", {
            status: 404,
          });
        }
        const text = await getSkillFileText(id, path);
        if (text === null) {
          return new Response("File not found", { status: 404 });
        }
        return new Response(text, {
          headers: { "Content-Type": "text/markdown; charset=utf-8" },
        });
      },
    },

    "/api/publish": {
      POST: async (req) => {
        if (!isStorageConfigured()) {
          return Response.json(
            { error: "Public storage is not configured on this server." },
            { status: 400 },
          );
        }
        const body = await req.json().catch(() => ({}));
        const { skillDir } = body as { skillDir?: string };
        if (!skillDir) {
          return Response.json(
            { error: "skillDir is required" },
            { status: 400 },
          );
        }

        // Read meta from SKILL.md.
        let skillName = "";
        let pageTitle = "";
        let sourceUrl = "";
        try {
          const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
          const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
          skillName = nameMatch?.[1]?.trim() || "";
          const headingMatch = skillMd.match(/^#\s+(.+)$/m);
          pageTitle = headingMatch?.[1]?.trim() || skillName;
          const sourceMatch =
            skillMd.match(/\*\*Source:\*\*\s*(\S+)/i) ||
            skillMd.match(/^\s*source:\s*(.+)$/m);
          sourceUrl = sourceMatch?.[1]?.trim() || "";
        } catch {
          return Response.json(
            { error: "Invalid skill directory" },
            { status: 400 },
          );
        }

        try {
          const refsDir = join(skillDir, "references");
          const refNames = (await readdir(refsDir).catch(() => [])).filter(
            (n) => n.endsWith(".md"),
          );
          const zipBytes = await zipSkillDir(skillDir);
          const id = newSkillId(skillName || "skill");
          await uploadSkill(id, zipBytes, {
            id,
            skillName,
            pageTitle,
            sourceUrl,
            articleCount: refNames.length + 1,
            refCount: refNames.length,
            createdAt: new Date().toISOString(),
          });
          const files = await collectSkillFiles(skillDir);
          for (const f of files) {
            await uploadSkillFile(id, f.path, f.content);
          }
          return Response.json({
            id,
            publicUrl: `/g/${id}`,
            fileCount: files.length,
          });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Publish failed" },
            { status: 500 },
          );
        }
      },
    },

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
          generateDescriptions: doGenerateDescriptions,
          apiKey: reqApiKey,
        } = body as {
          url: string;
          outputDir: string;
          customInstructions?: string;
          username?: string;
          password?: string;
          mergeThreshold?: number;
          generateDescriptions?: boolean;
          apiKey?: string;
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

              const apiKey = reqApiKey?.trim() || process.env.ANTHROPIC_API_KEY;
              if (doGenerateDescriptions) {
                if (!apiKey) {
                  send({
                    step: 5,
                    status: "error",
                    message:
                      "AI description generation requested but no API key configured. Skipping.",
                  });
                } else {
                  send({
                    step: 5,
                    status: "running",
                    message: "Generating AI descriptions for references...",
                  });
                  const { generated, errors } =
                    await generateMissingDescriptions(skillDir, apiKey, send);
                  send({
                    step: 5,
                    status: "done",
                    message: `Generated ${generated} description${generated !== 1 ? "s" : ""}${errors > 0 ? ` (${errors} error${errors !== 1 ? "s" : ""})` : ""}`,
                  });
                }
              }

              send({
                step: 6,
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
