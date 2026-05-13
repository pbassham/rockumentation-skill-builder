/**
 * One-shot script: walk every `output/<skill>/references/*.md`, read the
 * `description:` from its YAML frontmatter (if any), and copy it into
 * `data/descriptions/<skill>/<slug>.md`.
 *
 * Use this to bootstrap the curated description cache from skills that
 * were already built before the cache existed. Safe to re-run — existing
 * cache files are simply overwritten with the same contents.
 *
 * Usage: bun run scripts/seed-description-cache.ts
 */
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { parseFrontmatter } from "../src/frontmatter";
import { writeCachedDescription } from "../src/description-cache";

const root = join(import.meta.dir, "..", "output");
const skills = await readdir(root, { withFileTypes: true });
let total = 0;
for (const s of skills) {
  if (!s.isDirectory()) continue;
  const refsDir = join(root, s.name, "references");
  let files: string[];
  try {
    files = await readdir(refsDir);
  } catch {
    continue;
  }
  for (const f of files.filter((f) => f.endsWith(".md"))) {
    const slug = f.replace(/\.md$/, "");
    const text = await Bun.file(join(refsDir, f)).text();
    const { description } = parseFrontmatter(text);
    if (!description) continue;
    await writeCachedDescription(s.name, slug, description);
    total++;
  }
}
console.log(`Seeded ${total} cached descriptions.`);
