/**
 * `BuildConfig` is the canonical, persisted shape that drives every
 * multi-source build in this app. It is what:
 *   - the UI's multi-URL composer emits,
 *   - the gallery stores next to each published skill,
 *   - users can download (`config.json`) and re-upload to edit/regenerate,
 *   - starter bundles in `curated-roots.ts` declare statically.
 *
 * One config produces one OR more skills. Each skill's `references/`
 * folder is a FLAT directory built from every source listed for that
 * skill (collisions are disambiguated with a numeric suffix).
 *
 * Wire format is JSON; we never use YAML for build configs so the file
 * is portable and easy to diff.
 */

export const BUILD_CONFIG_SCHEMA = "rockumentation-skill-builder/v1";

export interface BuildConfig {
  /** Schema sentinel — bumped only on breaking changes. */
  schema: typeof BUILD_CONFIG_SCHEMA;
  /** Optional human-meaningful label (e.g. "Rock Developer Bundle"). */
  label?: string;
  /** Author handle for gallery attribution. */
  author?: string;
  /** Skills to build. At least one is required. */
  skills: BundledSkill[];
}

export interface BundledSkill {
  /** kebab-case folder name AND frontmatter `name:`. */
  name: string;
  /**
   * Literal SKILL.md description. If omitted and `generateDescription`
   * is true, the description is produced via the interpreter from the
   * assembled source list.
   */
  description?: string;
  /**
   * When true and `description` is empty, run the interpreter to
   * synthesise a "Use when…" description from the bundled source titles.
   */
  generateDescription?: boolean;
  /** Free text appended to SKILL.md as `## Additional Instructions`. */
  additionalInstructions?: string;
  /**
   * Free-form markdown injected into SKILL.md *above* the `## Topics`
   * list (after the brief overview line). Use this to add an editorial
   * intro, usage notes, or hand-written context that should survive
   * regeneration. Edits made here are preserved every time the skill
   * is rebuilt or descriptions are regenerated.
   */
  preText?: string;
  /** Optional version label (e.g. "1.0", "2026-05-14"). */
  version?: string;
  /** Sources contributing references to this skill. Order matters for TOC. */
  sources: BundledSource[];
}

export interface BundledSource {
  url: string;
  /**
   * Free-text rationale for inclusion (shown in SKILL.md metadata and
   * gallery). Encourages contributors to explain *why* a non-obvious
   * URL belongs (e.g. "Bootstrap Sass docs — Rock themes are Bootstrap
   * based").
   */
  note?: string;
  /** Override the source's section heading in `## Topics`. */
  label?: string;
  /** Force a specific extraction template instead of auto-detection. */
  templateId?: string;
  /**
   * Per-source credentials for private Rockumentation. Only used at
   * build time; NEVER persisted to disk or the gallery.
   */
  username?: string;
  password?: string;
  /**
   * If set, treat the source URL as an index page and replace it with
   * the URLs it links to before extraction. Currently supports:
   *   - "documentation-index" — Rock /documentation bookshelf page
   *     whose `book` cards link to `/documentation/bookcontent/<id>/<id>`.
   */
  expand?: "documentation-index";
}

/**
 * Validate a parsed JSON object as a `BuildConfig`. Returns the typed
 * object on success or throws an `Error` with a human-readable message.
 *
 * Hand-rolled (no Zod) to keep the dep surface small — this is the
 * only schema we own.
 */
export function parseBuildConfig(raw: unknown): BuildConfig {
  if (!raw || typeof raw !== "object") {
    throw new Error("BuildConfig must be a JSON object.");
  }
  const o = raw as Record<string, unknown>;
  if (o.schema !== BUILD_CONFIG_SCHEMA) {
    throw new Error(
      `Unsupported config schema "${String(o.schema)}". Expected "${BUILD_CONFIG_SCHEMA}".`,
    );
  }
  if (!Array.isArray(o.skills) || o.skills.length === 0) {
    throw new Error("BuildConfig.skills must be a non-empty array.");
  }
  const skills = o.skills.map((s, i) => parseBundledSkill(s, i));
  return {
    schema: BUILD_CONFIG_SCHEMA,
    label: typeof o.label === "string" ? o.label : undefined,
    author: typeof o.author === "string" ? o.author : undefined,
    skills,
  };
}

function parseBundledSkill(raw: unknown, index: number): BundledSkill {
  if (!raw || typeof raw !== "object") {
    throw new Error(`skills[${index}] must be an object.`);
  }
  const o = raw as Record<string, unknown>;
  const name = String(o.name ?? "").trim();
  if (!/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(name)) {
    throw new Error(
      `skills[${index}].name must be kebab-case (got "${String(o.name)}").`,
    );
  }
  if (!Array.isArray(o.sources) || o.sources.length === 0) {
    throw new Error(`skills[${index}].sources must be a non-empty array.`);
  }
  const sources = o.sources.map((s, j) => parseBundledSource(s, index, j));
  return {
    name,
    description: typeof o.description === "string" ? o.description : undefined,
    generateDescription: o.generateDescription === true,
    additionalInstructions:
      typeof o.additionalInstructions === "string"
        ? o.additionalInstructions
        : undefined,
    preText: typeof o.preText === "string" ? o.preText : undefined,
    version: typeof o.version === "string" ? o.version : undefined,
    sources,
  };
}

function parseBundledSource(
  raw: unknown,
  skillIndex: number,
  sourceIndex: number,
): BundledSource {
  if (!raw || typeof raw !== "object") {
    throw new Error(
      `skills[${skillIndex}].sources[${sourceIndex}] must be an object.`,
    );
  }
  const o = raw as Record<string, unknown>;
  const url = String(o.url ?? "").trim();
  if (!url) {
    throw new Error(
      `skills[${skillIndex}].sources[${sourceIndex}].url is required.`,
    );
  }
  try {
    new URL(url);
  } catch {
    throw new Error(
      `skills[${skillIndex}].sources[${sourceIndex}].url is not a valid URL: "${url}".`,
    );
  }
  return {
    url,
    note: typeof o.note === "string" ? o.note : undefined,
    label: typeof o.label === "string" ? o.label : undefined,
    templateId: typeof o.templateId === "string" ? o.templateId : undefined,
    username: typeof o.username === "string" ? o.username : undefined,
    password: typeof o.password === "string" ? o.password : undefined,
    expand:
      o.expand === "documentation-index" ? "documentation-index" : undefined,
  };
}

/**
 * Strip credentials from a config before persistence (download/gallery).
 */
export function redactCredentials(config: BuildConfig): BuildConfig {
  return {
    ...config,
    skills: config.skills.map((s) => ({
      ...s,
      sources: s.sources.map((src) => {
        const { username: _u, password: _p, ...rest } = src;
        return rest;
      }),
    })),
  };
}
