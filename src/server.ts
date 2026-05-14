#!/usr/bin/env bun

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import index from "./ui/index.html";
import gallery from "./ui/gallery.html";
import galleryDetail from "./ui/gallery-detail.html";
import { fetchPage, looksLikeLoginPage } from "./fetch";
import { extractWithTemplate } from "./extract";
import { allTemplates } from "../templates";
import { getSettings, saveSettings } from "./interpreter";
import { generateSkill, updateSkillMdDescriptions } from "./generate";
import { validateSkill } from "./validate-skill";
import { deriveSkillName } from "./utils";
import { rockLogin } from "./auth";
import {
  CURATED_ROOT_GROUPS,
  CURATED_BUNDLES,
  enumerateDocumentationIndex,
} from "./curated-roots";
import { parseBuildConfig } from "./build-config";
import { buildBundle } from "./bundle-builder";
import { parseFrontmatter, setDescription } from "./frontmatter";
import { generateDescription } from "./describe";
import { writeCachedDescription, editUrlFor } from "./description-cache";
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
  newProfileId,
  saveProfile,
  listProfiles,
  getProfile,
  deleteProfile,
} from "./storage";
import { generateSkillMeta } from "./describe-skill-meta";

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
      // Persist to the repo-tracked cache so curated descriptions are
      // shared across builds and contributors.
      await writeCachedDescription(skillName, slug, desc).catch(() => {});
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

    "/api/templates": {
      GET: () =>
        Response.json({
          templates: allTemplates().map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
            triggers: t.triggers,
            splitter: t.splitter?.id ?? "single",
            hasInterpreterPipeline: (t.interpreterPipeline?.length ?? 0) > 0,
          })),
        }),
    },

    "/api/curated-roots": {
      GET: () => Response.json({ groups: CURATED_ROOT_GROUPS }),
    },

    "/api/curated-bundles": {
      GET: () => Response.json({ bundles: CURATED_BUNDLES }),
    },

    "/api/saved-profiles": {
      GET: async () => {
        if (!isStorageConfigured()) {
          return Response.json({ enabled: false, profiles: [] });
        }
        try {
          const items = await listProfiles();
          return Response.json({
            enabled: true,
            profiles: items.map((x) => ({ ...x.meta, profile: x.profile })),
          });
        } catch (err: any) {
          // An empty/new bucket (no profiles/ prefix yet) or a transient
          // S3 error should not block the gallery from loading. Log and
          // return an empty list so the UI degrades gracefully.
          console.warn("listProfiles failed:", err?.message || err);
          return Response.json({ enabled: true, profiles: [] });
        }
      },
      POST: async (req) => {
        if (!isStorageConfigured()) {
          return Response.json(
            { error: "Public storage is not configured on this server." },
            { status: 400 },
          );
        }
        const body = (await req.json().catch(() => ({}))) as {
          bundle?: unknown;
        };
        if (!body.bundle || typeof body.bundle !== "object") {
          return Response.json(
            { error: "Request body must be { bundle: BundledSkill }." },
            { status: 400 },
          );
        }
        const bundle = body.bundle as { name?: string };
        if (
          !bundle.name ||
          !/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(bundle.name)
        ) {
          return Response.json(
            {
              error:
                "bundle.name must be kebab-case (lowercase letters, digits, dashes).",
            },
            { status: 400 },
          );
        }
        try {
          const id = newProfileId(bundle.name);
          await saveProfile(id, body.bundle);
          return Response.json({ id });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Save failed" },
            { status: 500 },
          );
        }
      },
    },

    "/api/saved-profiles/:id": {
      GET: async (req) => {
        if (!isStorageConfigured()) {
          return Response.json(
            { error: "Public storage is not configured." },
            { status: 404 },
          );
        }
        const id = (req.params as { id: string }).id;
        const profile = await getProfile(id);
        if (!profile) {
          return Response.json({ error: "Profile not found" }, { status: 404 });
        }
        return Response.json({ profile });
      },
      DELETE: async (req) => {
        if (!isStorageConfigured()) {
          return Response.json(
            { error: "Public storage is not configured." },
            { status: 404 },
          );
        }
        const id = (req.params as { id: string }).id;
        try {
          await deleteProfile(id);
          return Response.json({ ok: true });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Delete failed" },
            { status: 500 },
          );
        }
      },
    },

    "/api/ai-skill-meta": {
      POST: async (req) => {
        const body = (await req.json().catch(() => ({}))) as {
          name?: string;
          sources?: { url?: string; label?: string; note?: string }[];
          apiKey?: string;
        };
        const name = (body.name || "").trim();
        const sources = Array.isArray(body.sources) ? body.sources : [];
        const cleaned = sources
          .filter(
            (s): s is { url: string; label?: string; note?: string } =>
              !!s && typeof s.url === "string" && s.url.trim().length > 0,
          )
          .map((s) => ({
            url: s.url.trim(),
            label:
              typeof s.label === "string" && s.label.trim()
                ? s.label.trim()
                : undefined,
            note:
              typeof s.note === "string" && s.note.trim()
                ? s.note.trim()
                : undefined,
          }));
        if (!name) {
          return Response.json({ error: "name is required" }, { status: 400 });
        }
        if (cleaned.length === 0) {
          return Response.json(
            { error: "At least one source URL is required" },
            { status: 400 },
          );
        }
        const apiKey = body.apiKey?.trim() || process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return Response.json(
            {
              error:
                "No API key configured. Set ANTHROPIC_API_KEY in .env or provide one in AI Settings.",
            },
            { status: 400 },
          );
        }
        try {
          const meta = await generateSkillMeta(name, cleaned, apiKey);
          return Response.json(meta);
        } catch (err: any) {
          return Response.json(
            { error: err.message || "AI generation failed" },
            { status: 500 },
          );
        }
      },
    },

    "/api/interpreter": {
      GET: async () => Response.json(await getSettings()),
      POST: async (req) => {
        const body = (await req.json().catch(() => null)) as Awaited<
          ReturnType<typeof getSettings>
        > | null;
        if (!body || typeof body !== "object") {
          return Response.json(
            { error: "Body must be an InterpreterSettings JSON object." },
            { status: 400 },
          );
        }
        await saveSettings(body);
        return Response.json({ ok: true });
      },
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
            skillMd.match(/^\s*-\s*url:\s*"?([^"\n]+)"?\s*$/m) ||
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
          templateId,
        } = body as {
          url: string;
          outputDir: string;
          customInstructions?: string;
          username?: string;
          password?: string;
          mergeThreshold?: number;
          generateDescriptions?: boolean;
          apiKey?: string;
          templateId?: string;
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
            const baseSend = (data: Record<string, unknown>) => {
              controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            };

            // Build a single URL into a single skill. Sends step events
            // through `send`, which may inject batch metadata
            // (urlIndex/urlTotal/sourceUrl) when called inside a batch loop.
            async function buildOneUrl(
              targetUrl: string,
              prefetchedHtml?: string,
              extra?: Record<string, unknown>,
            ): Promise<void> {
              const send = (data: Record<string, unknown>) => {
                baseSend(extra ? { ...extra, ...data } : data);
              };

              // Authenticate if credentials provided
              let cookie: string | undefined;
              if (username && password) {
                send({ step: 1, status: "running", message: "Logging in..." });
                cookie = await rockLogin(targetUrl, username, password);
                send({ step: 1, status: "done", message: "Authenticated" });
              }

              let html = prefetchedHtml;
              if (!html) {
                send({
                  step: 2,
                  status: "running",
                  message: "Fetching page...",
                });
                html = await fetchPage(targetUrl, cookie);
                send({
                  step: 2,
                  status: "done",
                  message: `Fetched ${(html.length / 1024).toFixed(1)} KB of HTML`,
                });
              }

              // Rock returns the login page (HTTP 200) instead of 401
              // when credentials are missing or wrong, so we have to
              // sniff the response body. Abort with a structured
              // `auth-required` event so the UI can prompt for
              // credentials instead of generating a useless skill.
              if (looksLikeLoginPage(html)) {
                send({
                  step: 2,
                  status: "auth-required",
                  message: cookie
                    ? "Authentication did not grant access to this page. Check the username and password and try again."
                    : "This page requires login. Enter Rock credentials in Advanced options and try again.",
                });
                return;
              }

              send({
                step: 3,
                status: "running",
                message: "Extracting articles with hierarchy...",
              });
              const {
                articles,
                pageTitle,
                template: chosenTemplate,
              } = await extractWithTemplate(
                html,
                targetUrl,
                templateId,
                cookie,
              );
              send({
                step: 3,
                status: "running",
                message: `Using template: ${chosenTemplate.name}`,
                template: chosenTemplate.id,
              });

              if (articles.length === 0) {
                send({
                  step: 3,
                  status: "error",
                  message:
                    "No Rockumentation articles found. Make sure the URL points to a Rockumentation page.",
                });
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

              const skillName = deriveSkillName(targetUrl, pageTitle);
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
                sourceUrl: targetUrl,
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
                validation: await validateSkill(skillDir),
              });
            }

            try {
              // Detect the documentation bookshelf index. If we recognise
              // it, expand to N book URLs and process each in a loop within
              // the same NDJSON stream — each sub-build's events are tagged
              // with urlIndex/urlTotal/sourceUrl so the UI can group them.
              let indexHtml: string | undefined;
              let bookUrls: string[] = [];
              try {
                const probe = new URL(url);
                if (
                  probe.host === "community.rockrms.com" &&
                  probe.pathname.replace(/\/+$/, "").toLowerCase() ===
                    "/documentation"
                ) {
                  baseSend({
                    step: 2,
                    status: "running",
                    message: "Fetching documentation index...",
                  });
                  indexHtml = await fetchPage(url);
                  bookUrls = enumerateDocumentationIndex(indexHtml, url);
                }
              } catch {
                // fall through to single-URL build
              }

              if (bookUrls.length > 0) {
                baseSend({
                  step: 2,
                  status: "done",
                  message: `Documentation index detected — ${bookUrls.length} manual${bookUrls.length === 1 ? "" : "s"} to build`,
                });
                for (let i = 0; i < bookUrls.length; i++) {
                  const bookUrl = bookUrls[i]!;
                  const extra = {
                    urlIndex: i + 1,
                    urlTotal: bookUrls.length,
                    sourceUrl: bookUrl,
                  };
                  baseSend({
                    ...extra,
                    step: 0,
                    status: "running",
                    message: `[${i + 1}/${bookUrls.length}] ${bookUrl}`,
                  });
                  try {
                    await buildOneUrl(bookUrl, undefined, extra);
                  } catch (err: any) {
                    baseSend({
                      ...extra,
                      step: 0,
                      status: "error",
                      message: err.message || "Build failed",
                    });
                  }
                }
                baseSend({
                  step: 7,
                  status: "complete",
                  message: `Batch complete: ${bookUrls.length} build${bookUrls.length === 1 ? "" : "s"}.`,
                  batchTotal: bookUrls.length,
                });
              } else {
                await buildOneUrl(url);
              }
            } catch (err: any) {
              baseSend({
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

    /**
     * Build one or many skills from a `BuildConfig`. Each skill in the
     * config produces ONE folder with a flat `references/` directory
     * built from N source URLs. Streams NDJSON events tagged with
     * `skillIndex/skillTotal/skillName` so the UI can show per-skill
     * progress identically to the curated batch flow.
     */
    "/api/build-config": {
      POST: async (req) => {
        const body = (await req.json().catch(() => ({}))) as {
          config?: unknown;
          outputDir?: string;
          generateDescriptions?: boolean;
          apiKey?: string;
        };
        let config;
        try {
          config = parseBuildConfig(body.config);
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Invalid BuildConfig" },
            { status: 400 },
          );
        }

        const resolvedOutput = resolve(body.outputDir || "./output");
        const apiKey = body.apiKey?.trim() || process.env.ANTHROPIC_API_KEY;
        const doGenerateDescriptions = body.generateDescriptions === true;

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const baseSend = (data: Record<string, unknown>) => {
              controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            };

            try {
              const skillTotal = config.skills.length;
              for (let i = 0; i < skillTotal; i++) {
                const skill = config.skills[i]!;
                const skillIndex = i + 1;
                const tag = { skillIndex, skillTotal, skillName: skill.name };

                baseSend({
                  ...tag,
                  step: 0,
                  status: "running",
                  message: `[${skillIndex}/${skillTotal}] Building ${skill.name}`,
                });

                const result = await buildBundle({
                  skill,
                  outputDir: resolvedOutput,
                  author: config.author,
                  send: (e) => baseSend({ ...tag, ...e }),
                });

                if (!result) {
                  // buildBundle already emitted the error/auth-required event.
                  continue;
                }

                if (doGenerateDescriptions) {
                  if (!apiKey) {
                    baseSend({
                      ...tag,
                      step: 5,
                      status: "error",
                      message:
                        "AI description generation requested but no API key configured. Skipping.",
                    });
                  } else {
                    baseSend({
                      ...tag,
                      step: 5,
                      status: "running",
                      message: "Generating AI descriptions for references...",
                    });
                    const { generated, errors } =
                      await generateMissingDescriptions(
                        result.skillDir,
                        apiKey,
                        (e) => baseSend({ ...tag, ...e }),
                      );
                    baseSend({
                      ...tag,
                      step: 5,
                      status: "done",
                      message: `Generated ${generated} description${generated !== 1 ? "s" : ""}${errors > 0 ? ` (${errors} error${errors !== 1 ? "s" : ""})` : ""}`,
                    });
                  }
                }

                baseSend({
                  ...tag,
                  step: 6,
                  status: "complete",
                  message: "Bundle build complete!",
                  skillDir: result.skillDir,
                  skillName: result.skillName,
                  refCount: result.refCount,
                  sources: result.sources,
                  validation: await validateSkill(result.skillDir),
                });
              }

              baseSend({
                step: 7,
                status: "complete",
                message: `All ${skillTotal} skill${skillTotal === 1 ? "" : "s"} built.`,
                batchTotal: skillTotal,
              });
            } catch (err: any) {
              baseSend({
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

    /**
     * Bundle multiple built skills into a single ZIP. Accepts an array of
     * `skillDir` paths (typically the per-row `skillDir`s reported by
     * `/api/build`'s `complete` events during a curated batch run).
     *
     * Each skill is included under its own folder (taken from the skill's
     * SKILL.md `name:` frontmatter) so the resulting archive looks like:
     *
     *   bundle.zip/
     *     rock-helix/SKILL.md
     *     rock-helix/references/...
     *     rock-mobile-docs/SKILL.md
     *     ...
     *
     * Implemented via a temporary staging directory of symlinks so we can
     * drive a single `zip -r` invocation and avoid copying file bytes.
     */
    "/api/zip-bundle": {
      POST: async (req) => {
        const body = (await req.json().catch(() => ({}))) as {
          skillDirs?: string[];
          filename?: string;
        };
        const skillDirs = (body.skillDirs ?? []).filter(
          (d): d is string => typeof d === "string" && d.length > 0,
        );
        if (skillDirs.length === 0) {
          return Response.json(
            { error: "skillDirs (non-empty array) is required" },
            { status: 400 },
          );
        }

        const { mkdtemp, symlink, rm } = await import("node:fs/promises");
        const { tmpdir } = await import("node:os");
        const stage = await mkdtemp(join(tmpdir(), "skill-bundle-"));
        const folderNames: string[] = [];
        try {
          for (const dir of skillDirs) {
            let folderName = "skill";
            try {
              const skillMd = await Bun.file(join(dir, "SKILL.md")).text();
              const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
              folderName = nameMatch?.[1]?.trim() || "skill";
            } catch {
              continue; // skip skills we can't read
            }
            // Disambiguate duplicate folder names by suffixing -2, -3, ...
            let unique = folderName;
            let n = 2;
            while (folderNames.includes(unique))
              unique = `${folderName}-${n++}`;
            folderNames.push(unique);
            await symlink(dir, join(stage, unique));
          }

          if (folderNames.length === 0) {
            return Response.json(
              { error: "No valid skill directories found" },
              { status: 400 },
            );
          }

          // -y preserves symlinks but we want their *contents* — omit -y so
          // zip follows links into the real skill directories.
          const proc = Bun.spawn(["zip", "-r", "-", ...folderNames], {
            cwd: stage,
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

          const filename =
            (body.filename || "skills-bundle").replace(/[^a-z0-9._-]+/gi, "-") +
            ".zip";
          return new Response(zipBytes, {
            headers: {
              "Content-Type": "application/zip",
              "Content-Disposition": `attachment; filename="${filename}"`,
            },
          });
        } finally {
          await rm(stage, { recursive: true, force: true }).catch(() => {});
        }
      },
    },

    /**
     * Streaming bulk-describe across multiple skill directories. Reuses
     * `generateMissingDescriptions` per skill and emits NDJSON events so
     * the UI can show per-skill progress.
     */
    "/api/describe/missing-bulk": {
      POST: async (req) => {
        const body = (await req.json().catch(() => ({}))) as {
          skillDirs?: string[];
          apiKey?: string;
        };
        const skillDirs = (body.skillDirs ?? []).filter(
          (d): d is string => typeof d === "string" && d.length > 0,
        );
        const apiKey = body.apiKey?.trim() || process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return Response.json(
            {
              error:
                "No API key configured. Set ANTHROPIC_API_KEY in .env or provide one in AI Settings.",
            },
            { status: 400 },
          );
        }
        if (skillDirs.length === 0) {
          return Response.json(
            { error: "skillDirs (non-empty array) is required" },
            { status: 400 },
          );
        }

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const send = (data: Record<string, unknown>) =>
              controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
            let totalGenerated = 0;
            let totalErrors = 0;
            for (let i = 0; i < skillDirs.length; i++) {
              const dir = skillDirs[i]!;
              send({
                status: "running",
                skillDir: dir,
                index: i + 1,
                total: skillDirs.length,
                message: `Describing skill ${i + 1}/${skillDirs.length}`,
              });
              try {
                const { generated, errors } = await generateMissingDescriptions(
                  dir,
                  apiKey,
                  (evt) => send({ ...evt, skillDir: dir }),
                );
                totalGenerated += generated;
                totalErrors += errors;
                send({
                  status: "skill-complete",
                  skillDir: dir,
                  generated,
                  errors,
                });
              } catch (err: any) {
                totalErrors++;
                send({
                  status: "error",
                  skillDir: dir,
                  message: err.message || "Failed to describe skill",
                });
              }
            }
            send({
              status: "complete",
              message: `Generated ${totalGenerated} description${totalGenerated === 1 ? "" : "s"}${totalErrors > 0 ? `, ${totalErrors} error${totalErrors === 1 ? "" : "s"}` : ""}`,
              generated: totalGenerated,
              errors: totalErrors,
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

    "/api/skill-md": {
      // Read or overwrite the SKILL.md for a generated skill so the user
      // can hand-edit the manifest before downloading or publishing.
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
          const content = await Bun.file(join(skillDir, "SKILL.md")).text();
          return Response.json({ content });
        } catch {
          return Response.json(
            { error: "SKILL.md not found" },
            { status: 404 },
          );
        }
      },
      PUT: async (req) => {
        const body = (await req.json()) as {
          skillDir?: string;
          content?: string;
        };
        const skillDir = body.skillDir;
        const content = body.content;
        if (!skillDir || typeof content !== "string") {
          return Response.json(
            { error: "skillDir and content are required" },
            { status: 400 },
          );
        }
        const target = join(skillDir, "SKILL.md");
        try {
          // Ensure the file already exists — refuse to write to arbitrary paths.
          await Bun.file(target).text();
        } catch {
          return Response.json(
            { error: "SKILL.md not found at that skillDir" },
            { status: 404 },
          );
        }
        try {
          await Bun.write(target, content);
          return Response.json({ ok: true, bytes: content.length });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to save SKILL.md" },
            { status: 500 },
          );
        }
      },
    },

    "/api/description": {
      // Persist a hand-edited description back to disk: rewrites the
      // reference file's frontmatter, updates SKILL.md's TOC line for
      // that slug, and refreshes the curated cache so contributions
      // can be shared. Used by the inline editor in Step 2.
      PUT: async (req) => {
        const body = (await req.json()) as {
          skillDir?: string;
          slug?: string;
          description?: string;
        };
        const skillDir = body.skillDir;
        const slug = body.slug;
        const description = body.description;
        if (!skillDir || !slug || typeof description !== "string") {
          return Response.json(
            { error: "skillDir, slug, and description are required" },
            { status: 400 },
          );
        }
        if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
          return Response.json({ error: "Invalid slug" }, { status: 400 });
        }
        const trimmed = description.trim();
        if (!trimmed) {
          return Response.json(
            { error: "description cannot be empty" },
            { status: 400 },
          );
        }
        // Look up the skill name so the curated cache write lands in
        // the right folder. Missing SKILL.md → bail with 404.
        let skillName = "";
        try {
          const skillMd = await Bun.file(join(skillDir, "SKILL.md")).text();
          const nameMatch = skillMd.match(/^name:\s*"?(.+?)"?\s*$/m);
          skillName = nameMatch?.[1]?.trim() || "";
        } catch {
          return Response.json(
            { error: "SKILL.md not found at that skillDir" },
            { status: 404 },
          );
        }
        const refPath = join(skillDir, "references", `${slug}.md`);
        let raw: string;
        try {
          raw = await Bun.file(refPath).text();
        } catch {
          return Response.json(
            { error: "Reference not found" },
            { status: 404 },
          );
        }
        try {
          const updated = setDescription(raw, trimmed);
          await Bun.write(refPath, updated);
          await updateSkillMdDescriptions(skillDir, new Map([[slug, trimmed]]));
          if (skillName) {
            await writeCachedDescription(skillName, slug, trimmed).catch(
              () => {},
            );
          }
          return Response.json({ ok: true, slug, description: trimmed });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to save description" },
            { status: 500 },
          );
        }
      },
    },

    "/api/reference": {
      // Return the full body of one reference file, used when the user
      // expands the inline preview to see the entire article.
      GET: async (req) => {
        const url = new URL(req.url);
        const skillDir = url.searchParams.get("skillDir");
        const slug = url.searchParams.get("slug");
        if (!skillDir || !slug) {
          return Response.json(
            { error: "skillDir and slug are required" },
            { status: 400 },
          );
        }
        // Reject path traversal — slug must be a simple filename component.
        if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
          return Response.json({ error: "Invalid slug" }, { status: 400 });
        }
        try {
          const raw = await Bun.file(
            join(skillDir, "references", `${slug}.md`),
          ).text();
          const { body } = parseFrontmatter(raw);
          return Response.json({ slug, body });
        } catch {
          return Response.json(
            { error: "Reference not found" },
            { status: 404 },
          );
        }
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

            // First ~240 chars of meaningful body, after stripping the
            // H1 + breadcrumb blockquote so the preview shows actual
            // article prose. Used for the "this is what the agent will
            // see" preview screen before paying for AI descriptions.
            const stripped = body
              .replace(/^#\s+.+$/m, "")
              .replace(/^>\s*\*\*Path:\*\*.*$/m, "")
              .replace(/^>\s*\*\*Source:\*\*.*$/m, "")
              .trim();
            const bodyPreview =
              stripped.length > 240
                ? stripped.slice(0, 240).replace(/\s+\S*$/, "") + "\u2026"
                : stripped;

            return {
              slug: filename.replace(".md", ""),
              title,
              breadcrumb,
              description: description || null,
              hasDescription: !!description,
              bodyPreview,
              editUrl: skillName
                ? editUrlFor(skillName, filename.replace(".md", ""))
                : null,
            };
          }),
        );

        references.sort((a, b) => a.title.localeCompare(b.title));
        return Response.json({
          skillName,
          pageTitle,
          skillMd,
          references,
        });
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
                // Persist to the repo-tracked cache as well.
                await writeCachedDescription(
                  skillName,
                  slug,
                  description,
                ).catch(() => {});

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
