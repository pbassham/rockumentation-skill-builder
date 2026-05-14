/// <reference lib="dom" />

interface ProgressEvent {
  step: number;
  status: "running" | "done" | "error" | "complete" | "auth-required";
  message: string;
  skillDir?: string;
  skillName?: string;
  pageTitle?: string;
  articleCount?: number;
  refCount?: number;
  // Batch metadata — set when /api/build expanded an index URL into N
  // sub-builds, or when the UI is iterating curated URLs.
  urlIndex?: number;
  urlTotal?: number;
  sourceUrl?: string;
  batchTotal?: number;
}

interface CuratedRoot {
  label: string;
  description?: string;
  url: string;
  kind: "single" | "index";
}

interface CuratedRootGroup {
  label: string;
  description?: string;
  items: CuratedRoot[];
}

interface BundledSource {
  url: string;
  note?: string;
  label?: string;
  templateId?: string;
}

interface BundledSkill {
  name: string;
  description?: string;
  generateDescription?: boolean;
  additionalInstructions?: string;
  version?: string;
  sources: BundledSource[];
}

const STATUS_ICONS: Record<string, string> = {
  running: "\u23F3",
  done: "\u2713",
  error: "\u2717",
  complete: "\uD83C\uDF89",
  "auth-required": "\uD83D\uDD12",
};

let currentSkillDir: string | null = null;

const app = document.getElementById("app")!;

app.innerHTML = `
  <header class="page-header">
    <div>
      <h1>Rockumentation Skill Builder</h1>
      <p class="subtitle">Convert Rock RMS documentation into Agent Skills</p>
    </div>
    <nav class="page-nav">
      <a href="/gallery">Browse Gallery \u2192</a>
      <a class="icon-link" href="https://github.com/pbassham/rockumentation-skill-builder" target="_blank" rel="noopener" aria-label="View source on GitHub" title="View source on GitHub">
        <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
      </a>
    </nav>
  </header>

  <section id="bundle-gallery" class="card">
    <h2 class="mode-title">Pick a starter skill</h2>
    <p class="hint">Each skill aggregates one or more Rock RMS docs. Click to see what it covers, then build.</p>
    <div id="bundle-loading" class="hint">Loading skills\u2026</div>
    <div id="bundle-cards" class="bundle-grid"></div>

    <details id="curated-singles-block" class="curated-singles-details" style="display:none">
      <summary>Or pick individual canonical docs</summary>
      <p class="hint">Single-source skills. Most are also included in the developer skill above.</p>
      <div id="curated-singles-groups"></div>
      <div class="curated-actions" id="curated-singles-actions" style="display:none">
        <div class="curated-summary"><span id="curated-singles-count">0</span> selected</div>
        <div class="curated-buttons">
          <button type="button" class="btn-sm btn-secondary" id="singles-clear">Clear</button>
          <button type="button" class="btn-sm" id="singles-build">Build selected</button>
        </div>
      </div>
    </details>

    <p class="hint custom-url-link">
      Need a one-off? <button type="button" class="link-btn" id="show-custom-form">Build from custom URLs \u2192</button>
    </p>
  </section>

  <section id="bundle-detail" class="card" style="display:none">
    <div class="mode-back">
      <button type="button" class="link-btn" id="bundle-back">\u2190 Back to skills</button>
    </div>
    <h2 id="bundle-detail-name"></h2>
    <p class="hint bundle-detail-tagline">
      Customize this skill before building. Anything you change here is baked into the resulting <code>SKILL.md</code> &mdash; the
      <strong>description</strong> and <strong>pre-text</strong> appear above the Topics list and are preserved across rebuilds and AI description regeneration.
    </p>

    <div class="form-group" id="bundle-name-group" style="display:none">
      <label for="bundle-edit-name">Skill name <span class="form-meta">(kebab-case, becomes the folder name)</span></label>
      <input type="text" id="bundle-edit-name" placeholder="my-custom-skill" />
    </div>

    <div class="form-group">
      <div class="form-label-row">
        <label for="bundle-edit-desc">Skill description <span class="form-meta" id="bundle-desc-count"></span></label>
        <button type="button" class="link-btn ai-fill-btn" id="bundle-ai-meta-btn" title="Generate description and pre-text from the source URLs using Claude.">\u2728 Draft with AI</button>
      </div>
      <textarea id="bundle-edit-desc" rows="3" placeholder="Use when&hellip; (keyword-rich, &le; 1024 chars)"></textarea>
      <p class="hint">The frontmatter <code>description:</code>. The agent reads this to decide whether to load the skill at all, so be specific about trigger phrases.</p>
    </div>

    <div class="form-group">
      <label for="bundle-edit-pretext">Pre-text <span class="form-meta">(markdown, optional)</span></label>
      <textarea id="bundle-edit-pretext" rows="5" placeholder="Optional intro paragraph(s), usage notes, or hand-written context. Appears in SKILL.md above the Topics list."></textarea>
      <p class="hint">Free markdown injected just above <code>## Topics</code>. Survives every rebuild and description regeneration.</p>
    </div>

    <h3 class="bundle-sources-heading">Sources <span id="bundle-detail-count" class="bundle-count"></span></h3>
    <p class="hint">Each source becomes a section heading in the Topics list. Edit the label or add an optional note for context.</p>
    <ol id="bundle-detail-sources" class="bundle-source-list"></ol>
    <div class="bundle-add-source-row">
      <button type="button" class="btn-sm btn-secondary" id="bundle-add-source">+ Add source URL</button>
    </div>

    <div id="bundle-ai-meta-status" class="ai-fill-status" style="display:none"></div>

    <div class="bundle-detail-actions">
      <button type="button" class="btn-sm btn-secondary" id="bundle-reset-btn">Reset</button>
      <button type="button" class="btn-sm" id="bundle-build-btn">Build skill</button>
    </div>
  </section>

  <form id="build-form" class="card" style="display:none">
    <div class="mode-back">
      <button type="button" class="link-btn" id="custom-back">\u2190 Back to skills</button>
    </div>
    <div class="form-group">
      <label for="url">Rockumentation URL</label>
      <input type="url" id="url" name="url" placeholder="https://community.rockrms.com/developer/developer-codex" />
      <p class="hint">The root URL of the Rockumentation page you want to convert</p>
    </div>

    <div class="form-group">
      <label for="templateId">Template</label>
      <select id="templateId" name="templateId">
        <option value="">Auto-detect (recommended)</option>
      </select>
      <p class="hint" id="template-hint">Pick a template to override auto-detection. Templates control how the page is split and processed.</p>
    </div>

    <details id="advanced-section">
      <summary>Advanced options</summary>
      <div class="advanced-fields">
        <div class="form-group">
          <label for="customInstructions">Custom Instructions</label>
          <textarea id="customInstructions" name="customInstructions" placeholder="Add any custom instructions to include in the generated SKILL.md..."></textarea>
          <p class="hint">Extra context appended to the skill's overview. You can also edit SKILL.md directly after the build.</p>
        </div>

        <div class="form-group">
          <label for="mergeThreshold">Merge Threshold (lines)</label>
          <input type="number" id="mergeThreshold" name="mergeThreshold" value="50" min="0" step="10" />
          <p class="hint">Merge leaf articles shorter than this many lines into their parent file. Set to 0 to disable.</p>
        </div>

        <div class="form-group">
          <label for="username">Rock Username (for private docs)</label>
          <input type="text" id="username" name="username" placeholder="Optional" autocomplete="username" />
        </div>

        <div class="form-group">
          <label for="password">Rock Password</label>
          <input type="password" id="password" name="password" placeholder="Optional" autocomplete="current-password" />
          <p class="hint">Credentials are sent directly to the Rock site and never stored.</p>
        </div>
      </div>
    </details>

    <button type="submit" id="submit-btn">Build Skill</button>
  </form>

  <section class="info-card" id="info-card">
    <h2>What's an Agent Skill?</h2>
    <p>
      An <strong>Agent Skill</strong> is a packaged folder of Markdown that teaches an AI
      coding agent (like Claude Code) about a specific topic. The agent loads the
      <code>SKILL.md</code> manifest, sees a short "use when" description, and pulls in the
      <code>references/</code> files only when relevant \u2014 so it gains expertise without
      bloating its context window.
    </p>
    <p>
      This builder turns a Rockumentation page into that folder structure, ready to drop
      into your <code>.claude/skills/</code> or any agent's skills directory.
    </p>
    <p class="info-links">
      <a href="https://agentskills.io/home" target="_blank" rel="noopener">Learn more at agentskills.io \u2192</a>
    </p>
  </section>

  <div id="progress" class="progress" style="display:none"></div>
  <div id="error" style="display:none"></div>
  <div id="result" style="display:none"></div>
  <div id="descriptions" style="display:none"></div>
  <div id="finalize" style="display:none"></div>
`;

const form = document.getElementById("build-form") as HTMLFormElement;
const progressDiv = document.getElementById("progress")!;
const resultDiv = document.getElementById("result")!;
const errorDiv = document.getElementById("error")!;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

// View switching ------------------------------------------------------------
//
// The home is a list of curated bundles. Clicking a bundle swaps to a
// detail panel showing its sources + build button. The legacy custom-URL
// form is still available via a small secondary link, and curated single-
// source docs collapse into a `<details>` block under the bundle list.

const bundleGallery = document.getElementById("bundle-gallery")!;
const bundleDetail = document.getElementById("bundle-detail")!;

type View = "gallery" | "detail";

function showView(view: View) {
  bundleGallery.style.display = view === "gallery" ? "block" : "none";
  bundleDetail.style.display = view === "detail" ? "block" : "none";
  // The intro "What's an Agent Skill?" card is contextual to the home
  // landing only — once you're inside a bundle it's noise.
  const infoCard = document.getElementById("info-card");
  if (infoCard) infoCard.style.display = view === "gallery" ? "block" : "none";
  // Legacy custom-URL form is reachable only via /api/build callers, no
  // longer surfaced in the UI \u2014 the editable bundle detail panel is the
  // single source of truth for both curated and ad-hoc skills.
  form.style.display = "none";
  if (view === "gallery" && !curatedLoaded) loadCuratedRoots();
}

document.getElementById("show-custom-form")!.addEventListener("click", () => {
  // Open the bundle detail panel in editable mode with an empty draft
  // so the user can paste one or more URLs and configure them with the
  // same controls as a curated bundle.
  showBundleDetail(
    {
      name: "custom-skill",
      description: "",
      sources: [{ url: "", label: "" }],
    } as BundledSkill,
    { editable: true },
  );
});
document
  .getElementById("custom-back")!
  .addEventListener("click", () => showView("gallery"));
document
  .getElementById("bundle-back")!
  .addEventListener("click", () => showView("gallery"));

// Curated roots -------------------------------------------------------------

let curatedLoaded = false;
/** Stash for bundle objects so detail-view can recover by index. */
let loadedBundles: BundledSkill[] = [];

async function loadCuratedRoots() {
  curatedLoaded = true;
  const loading = document.getElementById("bundle-loading")!;
  const cardsEl = document.getElementById("bundle-cards")!;
  const singlesBlock = document.getElementById("curated-singles-block")!;
  const singlesGroupsEl = document.getElementById("curated-singles-groups")!;
  const singlesActionsEl = document.getElementById("curated-singles-actions")!;
  try {
    const [rootsRes, bundlesRes] = await Promise.all([
      fetch("/api/curated-roots"),
      fetch("/api/curated-bundles"),
    ]);
    if (!rootsRes.ok) throw new Error(`HTTP ${rootsRes.status}`);
    const data = (await rootsRes.json()) as { groups: CuratedRootGroup[] };
    const bundlesData = bundlesRes.ok
      ? ((await bundlesRes.json()) as { bundles: BundledSkill[] })
      : { bundles: [] };
    loading.style.display = "none";

    // Home page lists curated bundles only. Visitor-saved profiles are
    // intentionally NOT merged in here \u2014 we don't want strangers
    // overwriting/cluttering the canonical bundle list. Sharing happens
    // through /gallery instead.
    const combined: { bundle: BundledSkill; saved: boolean }[] =
      bundlesData.bundles.map((b) => ({ bundle: b, saved: false }));
    loadedBundles = combined.map((c) => c.bundle);

    // Bundle cards \u2014 primary entry point.
    cardsEl.innerHTML = combined
      .map(
        (c, i) => `
      <button type="button" class="bundle-card" data-bundle-index="${i}" data-saved="${c.saved ? "1" : "0"}">
        <span class="bundle-card-name">${escapeHtml(c.bundle.name)}${c.saved ? ' <span class="bundle-card-badge">saved</span>' : ""}</span>
        <span class="bundle-card-desc">${escapeHtml(c.bundle.description || "")}</span>
        <span class="bundle-card-meta">${c.bundle.sources.length} source${c.bundle.sources.length === 1 ? "" : "s"}</span>
      </button>`,
      )
      .join("");

    cardsEl
      .querySelectorAll<HTMLButtonElement>(".bundle-card")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.bundleIndex);
          // Saved profiles get full editability so the user can tweak
          // and re-save; curated bundles keep URLs read-only.
          showBundleDetail(loadedBundles[i]!, {
            editable: btn.dataset.saved === "1",
          });
        });
      });

    // Single-source curated docs — collapsed secondary section.
    if (data.groups.length > 0) {
      singlesBlock.style.display = "block";
      singlesGroupsEl.innerHTML = data.groups
        .map(
          (g, gi) => `
      <fieldset class="curated-group">
        <legend>${escapeHtml(g.label)}</legend>
        ${g.description ? `<p class="hint">${escapeHtml(g.description)}</p>` : ""}
        ${g.items
          .map(
            (it, ii) => `
          <label class="curated-item">
            <input type="checkbox" class="singles-check" data-url="${escapeHtml(it.url)}" data-label="${escapeHtml(it.label)}" data-kind="${it.kind}" id="singles-${gi}-${ii}" />
            <span class="curated-item-body">
              <span class="curated-item-label">${escapeHtml(it.label)}${it.kind === "index" ? ' <span class="curated-badge">batch</span>' : ""}</span>
              ${it.description ? `<span class="curated-item-desc">${escapeHtml(it.description)}</span>` : ""}
              <span class="curated-item-url">${escapeHtml(it.url)}</span>
            </span>
          </label>`,
          )
          .join("")}
      </fieldset>`,
        )
        .join("");

      singlesActionsEl.style.display = "flex";

      const checks = () =>
        Array.from(
          singlesGroupsEl.querySelectorAll<HTMLInputElement>(".singles-check"),
        );
      const countEl = document.getElementById("curated-singles-count")!;
      const buildBtn = document.getElementById(
        "singles-build",
      ) as HTMLButtonElement;
      const updateCount = () => {
        const n = checks().filter((c) => c.checked).length;
        countEl.textContent = String(n);
        buildBtn.disabled = n === 0;
      };
      updateCount();
      singlesGroupsEl.addEventListener("change", updateCount);

      document
        .getElementById("singles-clear")!
        .addEventListener("click", () => {
          checks().forEach((c) => (c.checked = false));
          updateCount();
        });
      buildBtn.addEventListener("click", () => {
        const selected: BatchItem[] = checks()
          .filter((c) => c.checked)
          .map((c) => ({
            url: c.dataset.url!,
            label: c.dataset.label!,
            kind: (c.dataset.kind as BatchItem["kind"]) || "single",
          }));
        if (selected.length > 0) runCuratedBatch(selected);
      });
    }
  } catch (err: any) {
    loading.textContent = `Failed to load skills: ${err.message}`;
  }
}

/**
 * Swap to the bundle detail panel and wire up its Build button. Each
 * source is shown in display order so the user can verify URLs and
 * labels before paying for a build.
 */
/**
 * Swap to the bundle detail panel and wire up its Build button. The
 * panel is fully editable: skill description, free-form pre-text, and
 * per-source label/note are all writable form fields. On Build we deep-
 * clone the curated bundle and overlay the user's edits before posting
 * to /api/build-config, so the curated defaults are never mutated.
 */
function showBundleDetail(
  bundle: BundledSkill,
  options: { editable?: boolean } = {},
) {
  // `editable` mode lets the user rename the skill, edit/add/remove source
  // URLs. Curated bundles default to non-editable URLs (label/note still
  // editable); custom and saved-profile-from-scratch flows go through here
  // too with editable=true.
  const editable = options.editable === true;

  // Working draft of sources — mutated by add/remove handlers without
  // touching the original bundle (so Reset still works).
  type DraftSource = {
    url: string;
    label?: string;
    note?: string;
    templateId?: string;
    expand?: BundledSkill["sources"][number]["expand"];
  };
  let draftSources: DraftSource[] = bundle.sources.map((s) => ({ ...s }));
  let draftName = bundle.name;

  const nameGroup = document.getElementById("bundle-name-group")!;
  const nameInput = document.getElementById(
    "bundle-edit-name",
  ) as HTMLInputElement;
  const detailNameEl = document.getElementById(
    "bundle-detail-name",
  ) as HTMLElement;
  const countEl = document.getElementById("bundle-detail-count") as HTMLElement;
  const descInput = document.getElementById(
    "bundle-edit-desc",
  ) as HTMLTextAreaElement;
  const preTextInput = document.getElementById(
    "bundle-edit-pretext",
  ) as HTMLTextAreaElement;
  const descCount = document.getElementById("bundle-desc-count")!;
  const list = document.getElementById("bundle-detail-sources")!;
  const addSourceBtn = document.getElementById(
    "bundle-add-source",
  ) as HTMLButtonElement;
  const aiBtn = document.getElementById(
    "bundle-ai-meta-btn",
  ) as HTMLButtonElement;
  const aiStatus = document.getElementById("bundle-ai-meta-status")!;

  nameGroup.style.display = "block";
  detailNameEl.textContent = bundle.name;
  nameInput.value = bundle.name;

  const setCount = () => {
    countEl.textContent = `(${draftSources.length})`;
  };

  const updateDescCount = () => {
    const len = descInput.value.length;
    descCount.textContent = `${len} / 1024`;
    descCount.className = "form-meta" + (len > 1024 ? " is-error" : "");
  };
  descInput.oninput = updateDescCount;

  // Persist label/note edits from the DOM back into draftSources before
  // any structural mutation (add/remove) so we don't lose typed values.
  const flushSourceFields = () => {
    draftSources.forEach((s, i) => {
      const li = list.querySelector(
        `li.bundle-source-edit[data-src-index="${i}"]`,
      );
      if (!li) return;
      const url = (
        li.querySelector('input[data-field="url"]') as HTMLInputElement | null
      )?.value.trim();
      const label = (
        li.querySelector('input[data-field="label"]') as HTMLInputElement | null
      )?.value;
      const note = (
        li.querySelector('input[data-field="note"]') as HTMLInputElement | null
      )?.value;
      if (url !== undefined) s.url = url;
      if (label !== undefined) s.label = label.trim() || undefined;
      if (note !== undefined) s.note = note.trim() || undefined;
    });
  };

  const renderSourceRows = () => {
    setCount();
    if (draftSources.length === 0) {
      list.innerHTML = `<li class="bundle-source-empty hint">No sources yet \u2014 add at least one URL below.</li>`;
      return;
    }
    list.innerHTML = draftSources
      .map((s, i) => {
        // URL is always an input — adding a source needs to expose the
        // field, and even on curated bundles the user may want to swap
        // a URL before saving as their own profile.
        const urlField = `<input type="url" class="bundle-source-url-input" data-field="url" value="${escapeHtml(s.url)}" placeholder="https://\u2026" />`;
        return `
        <li class="bundle-source-item bundle-source-edit" data-src-index="${i}">
          <div class="bundle-source-head">
            <span class="bundle-source-num">${i + 1}.</span>
            <input type="text" class="bundle-source-label-input" data-field="label" value="${escapeHtml(s.label || "")}" placeholder="Label (section heading)" />
            <button type="button" class="bundle-source-remove" data-action="remove" title="Remove this source" aria-label="Remove source ${i + 1}">\u00D7</button>
          </div>
          <div class="bundle-source-url-row">${urlField}</div>
          <input type="text" class="bundle-source-note-input" data-field="note" value="${escapeHtml(s.note || "")}" placeholder="Note (optional)" />
        </li>`;
      })
      .join("");

    list
      .querySelectorAll<HTMLButtonElement>('[data-action="remove"]')
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          flushSourceFields();
          const li = btn.closest("li.bundle-source-edit") as HTMLElement | null;
          const idx = li ? Number(li.dataset.srcIndex) : -1;
          if (idx >= 0) {
            draftSources.splice(idx, 1);
            renderSourceRows();
          }
        });
      });
  };

  const applyDefaults = () => {
    draftSources = bundle.sources.map((s) => ({ ...s }));
    draftName = bundle.name;
    nameInput.value = draftName;
    descInput.value = bundle.description || "";
    preTextInput.value = (bundle as any).preText || "";
    updateDescCount();
    renderSourceRows();
    aiStatus.style.display = "none";
  };

  applyDefaults();

  addSourceBtn.onclick = () => {
    flushSourceFields();
    draftSources.push({ url: "", label: "" });
    renderSourceRows();
    // Focus the new URL input so the user can paste straight away.
    const last = list.querySelector(
      `li.bundle-source-edit[data-src-index="${draftSources.length - 1}"] input[data-field="url"], ` +
        `li.bundle-source-edit[data-src-index="${draftSources.length - 1}"] input[data-field="label"]`,
    ) as HTMLInputElement | null;
    last?.focus();
  };

  const resetBtn = document.getElementById(
    "bundle-reset-btn",
  ) as HTMLButtonElement;
  resetBtn.onclick = () => applyDefaults();

  // Build the merged BundledSkill from current form state. Used by Build,
  // Save-to-gallery, and the AI generator.
  const buildMergedBundle = (): BundledSkill => {
    flushSourceFields();
    const cleanedSources = draftSources
      .map((s) => ({
        ...s,
        url: s.url.trim(),
        label: s.label?.trim() || undefined,
        note: s.note?.trim() || undefined,
      }))
      .filter((s) => s.url.length > 0);
    return {
      ...bundle,
      name: editable ? nameInput.value.trim() || bundle.name : bundle.name,
      description: descInput.value.trim() || bundle.description,
      ...({
        preText: preTextInput.value.trim() || undefined,
      } as Partial<BundledSkill>),
      sources: cleanedSources as BundledSkill["sources"],
    };
  };

  // AI: draft description + preText from current source URLs/labels/notes.
  aiBtn.onclick = async () => {
    flushSourceFields();
    const sources = draftSources
      .map((s) => ({
        url: s.url.trim(),
        label: s.label?.trim() || undefined,
        note: s.note?.trim() || undefined,
      }))
      .filter((s) => s.url.length > 0);
    const skillName = editable
      ? nameInput.value.trim() || bundle.name
      : bundle.name;
    if (sources.length === 0) {
      aiStatus.style.display = "block";
      aiStatus.className = "ai-fill-status is-error";
      aiStatus.textContent = "Add at least one source URL first.";
      return;
    }
    aiBtn.disabled = true;
    const origText = aiBtn.textContent || "";
    aiBtn.textContent = "Drafting\u2026";
    aiStatus.style.display = "block";
    aiStatus.className = "ai-fill-status";
    aiStatus.textContent = "Calling Claude\u2026";
    try {
      const res = await fetch("/api/ai-skill-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skillName, sources }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as {
        description: string;
        preText: string;
      };
      descInput.value = data.description;
      preTextInput.value = data.preText;
      updateDescCount();
      aiStatus.className = "ai-fill-status is-saved";
      aiStatus.textContent =
        "\u2713 Drafted. Review and edit before saving or building.";
    } catch (err: any) {
      aiStatus.className = "ai-fill-status is-error";
      aiStatus.textContent = err.message || "AI generation failed.";
    } finally {
      aiBtn.disabled = false;
      aiBtn.textContent = origText;
    }
  };

  // Save current configuration to the public gallery as a profile.
  // (Moved into the post-build batch actions; the inline handler used to
  // live here.)

  const buildBtn = document.getElementById(
    "bundle-build-btn",
  ) as HTMLButtonElement;
  buildBtn.onclick = () => {
    const merged = buildMergedBundle();
    if (merged.sources.length === 0) {
      aiStatus.style.display = "block";
      aiStatus.className = "ai-fill-status is-error";
      aiStatus.textContent = "Add at least one source URL first.";
      return;
    }
    runCuratedBatch([
      { kind: "bundle", label: merged.name, url: "", bundle: merged },
    ]);
  };

  // Suppress unused-var warnings when editable=false (draftName is only
  // referenced through nameInput in editable mode).
  void draftName;

  showView("detail");
}

interface BatchItem {
  url: string;
  label: string;
  kind: "single" | "index" | "bundle";
  /** Present when kind === "bundle" — the multi-source skill spec to POST. */
  bundle?: BundledSkill;
}

async function runCuratedBatch(items: BatchItem[]) {
  // Reset progress UI areas (reuse existing slots).
  progressDiv.style.display = "block";
  progressDiv.innerHTML = "";
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <div class="result-card">
      <h3>Batch Build</h3>
      <p class="hint">Building ${items.length} selected source${items.length === 1 ? "" : "s"} sequentially.</p>
      <ul class="batch-list" id="batch-list">
        ${items
          .map(
            (it, i) => `
          <li class="batch-row" id="batch-row-${i}" data-status="pending">
            <span class="batch-status">\u23F3</span>
            <div class="batch-meta">
              <div class="batch-label">${escapeHtml(it.label)}${it.kind === "index" ? ' <span class="curated-badge">batch</span>' : ""}</div>
              <div class="batch-url">${escapeHtml(it.url)}</div>
              <div class="batch-progress" id="batch-progress-${i}"></div>
              <div class="batch-result" id="batch-result-${i}"></div>
            </div>
          </li>`,
          )
          .join("")}
      </ul>
      <div id="batch-actions" class="batch-actions" style="display:none"></div>
    </div>
  `;
  errorDiv.style.display = "none";
  document.getElementById("finalize")!.style.display = "none";
  document.getElementById("descriptions")!.style.display = "none";

  // The build button lives in different places depending on entry point
  // (bundle detail panel, singles fieldset, or none for direct flows).
  // Disable whichever exists.
  const buildBtn = (document.getElementById("bundle-build-btn") ||
    document.getElementById("singles-build")) as HTMLButtonElement | null;
  if (buildBtn) {
    buildBtn.disabled = true;
    buildBtn.dataset.origText = buildBtn.textContent || "Build";
    buildBtn.textContent = "Building\u2026";
  }

  const genDesc = false;
  const apiKey: string | undefined = undefined;

  // Tracks every skill folder produced during this batch run (across all
  // selected sources, including index URLs that expand to multiple skills)
  // so the footer can offer bulk actions over them.
  const producedSkillDirs: string[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const row = document.getElementById(`batch-row-${i}`)!;
    const progRow = document.getElementById(`batch-progress-${i}`)!;
    const resultRow = document.getElementById(`batch-result-${i}`)!;
    row.dataset.status = "running";
    row.querySelector(".batch-status")!.textContent = "\u23F3";

    let lastMessage = "";
    let producedSkills = 0;
    let failed = false;

    try {
      const isBundle = item.kind === "bundle" && item.bundle;
      const res = isBundle
        ? await fetch("/api/build-config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              config: {
                schema: "rockumentation-skill-builder/v1",
                skills: [item.bundle],
              },
              outputDir: "./output",
              generateDescriptions: genDesc,
              apiKey,
            }),
          })
        : await fetch("/api/build", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: item.url,
              outputDir: "./output",
              mergeThreshold: 50,
              generateDescriptions: genDesc,
              apiKey,
            }),
          });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          let evt: ProgressEvent;
          try {
            evt = JSON.parse(line);
          } catch {
            continue;
          }
          lastMessage = evt.message;
          if (evt.urlIndex && evt.urlTotal) {
            progRow.textContent = `[${evt.urlIndex}/${evt.urlTotal}] ${evt.message}`;
          } else {
            progRow.textContent = evt.message;
          }
          if (evt.status === "complete" && evt.skillDir) {
            producedSkills++;
            const dir = evt.skillDir;
            producedSkillDirs.push(dir);
            const div = document.createElement("div");
            div.className = "batch-skill";
            div.innerHTML = `\u2713 <strong>${escapeHtml(evt.skillName || "")}</strong> <span class="hint">(${evt.refCount ?? 0} refs)</span>`;

            const dl = document.createElement("a");
            dl.className = "link-btn";
            dl.href = "#";
            dl.textContent = "Download";
            dl.dataset.skillDir = dir;
            // Track "missing descriptions" state so we can warn (but
            // never hard-block) on download. The flag is updated when
            // `loadReferences` runs after a Manage-skill click or a
            // bulk-describe completion.
            if (!genDesc) {
              dl.dataset.missingDesc = "unknown";
            }
            dl.addEventListener("click", (e) => {
              e.preventDefault();
              if (
                dl.dataset.missingDesc &&
                dl.dataset.missingDesc !== "0" &&
                !confirm(
                  dl.dataset.missingDesc === "unknown"
                    ? "This skill was built without AI descriptions. The agent will not know which references to load. Download anyway?"
                    : `${dl.dataset.missingDesc} reference${dl.dataset.missingDesc === "1" ? "" : "s"} are missing AI descriptions. Download anyway?`,
                )
              ) {
                return;
              }
              downloadZip(dir);
            });

            const sep = document.createElement("span");
            sep.className = "batch-skill-sep";
            sep.textContent = "·";

            const md = document.createElement("a");
            md.className = "link-btn";
            md.href = "#";
            md.textContent = "Manage skill";

            // Per-row inline container that hosts the descriptions + split
            // panels when expanded — keeps the management UI close to the
            // result row instead of jumping to a separate section at the
            // bottom of the page.
            const inline = document.createElement("div");
            inline.className = "batch-desc-inline";
            inline.style.display = "none";

            md.addEventListener("click", (e) => {
              e.preventDefault();
              const descPanel = document.getElementById("descriptions");
              if (!descPanel) return;
              const isHere =
                inline.style.display !== "none" &&
                descPanel.parentElement === inline;
              if (isHere) {
                // Collapse: hide and detach so the next "Manage skill"
                // click on a different row can reclaim the panel.
                inline.style.display = "none";
                descPanel.style.display = "none";
                md.textContent = "Manage skill";
                return;
              }
              currentSkillDir = dir;
              inline.appendChild(descPanel);
              inline.style.display = "block";
              md.textContent = "Hide skill management";
              loadReferences(dir);
              inline.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });

            div.append(" ", dl, " ", sep, " ", md);

            // Surface skill-validation problems (broken frontmatter,
            // missing Topics, references that came back empty, etc.).
            const validation = evt.validation as
              | {
                  ok: boolean;
                  problems: { severity: string; message: string }[];
                }
              | undefined;
            const vWarn =
              validation && validation.problems.length > 0
                ? (() => {
                    const el = document.createElement("div");
                    el.className = validation.ok
                      ? "batch-desc-warn"
                      : "batch-error";
                    const items = validation.problems
                      .map(
                        (p) =>
                          `<li>${p.severity === "error" ? "\u2717" : "\u26A0"} ${escapeHtml(p.message)}</li>`,
                      )
                      .join("");
                    el.innerHTML = `<strong>${validation.ok ? "Skill validation warnings" : "Skill validation failed"}:</strong><ul style="margin:4px 0 0 1.2em;padding:0;">${items}</ul>`;
                    return el;
                  })()
                : null;

            // Warn when AI descriptions weren't auto-generated for this batch
            // — descriptions are required for category routing and search to
            // work well, so flag it inline rather than letting users miss it.
            if (!genDesc && (evt.refCount ?? 0) > 0) {
              const warn = document.createElement("div");
              warn.className = "batch-desc-warn";
              warn.dataset.warnDir = dir;
              warn.innerHTML = `\u26A0 <strong>${evt.refCount} reference${evt.refCount === 1 ? "" : "s"} have no AI description.</strong> Click <em>Manage skill</em> above to add them — they help downstream tools surface the right reference for a query.`;
              resultRow.appendChild(div);
              resultRow.appendChild(warn);
              resultRow.appendChild(inline);
              if (vWarn) resultRow.appendChild(vWarn);
              // The warning's refCount is from the build pipeline and doesn't
              // know about descriptions seeded from the curated cache. Kick
              // off a quiet /api/references load so the count self-corrects
              // (or the warning vanishes) without forcing the user to open
              // Manage skill first.
              loadReferencesQuiet(dir);
            } else {
              resultRow.appendChild(div);
              resultRow.appendChild(inline);
              if (vWarn) resultRow.appendChild(vWarn);
            }
          }
          if (evt.status === "error") {
            failed = true;
            const div = document.createElement("div");
            div.className = "batch-error";
            div.textContent = `\u2717 ${evt.message}`;
            resultRow.appendChild(div);
          }
          if (evt.status === "auth-required") {
            failed = true;
            const div = document.createElement("div");
            div.className = "batch-error";
            div.innerHTML = `\u{1F512} <strong>Login required.</strong> ${escapeHtml(evt.message)}`;
            resultRow.appendChild(div);
          }
        }
      }
    } catch (err: any) {
      failed = true;
      resultRow.innerHTML += `<div class="batch-error">\u2717 ${escapeHtml(err.message)}</div>`;
    }

    row.dataset.status = failed
      ? producedSkills > 0
        ? "partial"
        : "error"
      : "done";
    row.querySelector(".batch-status")!.textContent = failed
      ? producedSkills > 0
        ? "\u26A0"
        : "\u2717"
      : "\u2713";
    progRow.textContent = failed
      ? `Finished with errors. ${producedSkills} skill${producedSkills === 1 ? "" : "s"} created.`
      : producedSkills > 0
        ? `Done. ${producedSkills} skill${producedSkills === 1 ? "" : "s"} created.`
        : lastMessage;
  }

  // Note: download / manage-descriptions click handlers are wired
  // immediately when each `.batch-skill` row is created (above), so users
  // can click them as soon as the skill appears — no need for a final
  // wire-up pass here.

  if (producedSkillDirs.length > 0) {
    renderBatchActions(producedSkillDirs, apiKey, items);
  }

  if (buildBtn) {
    buildBtn.disabled = false;
    buildBtn.textContent = buildBtn.dataset.origText || "Build";
  }
}

// Custom URL form -----------------------------------------------------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = (document.getElementById("url") as HTMLInputElement).value.trim();
  const outputDir = "./output";
  const customInstructions = (
    document.getElementById("customInstructions") as HTMLTextAreaElement
  ).value.trim();
  const username = (
    document.getElementById("username") as HTMLInputElement
  ).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  const mergeThreshold =
    parseInt(
      (document.getElementById("mergeThreshold") as HTMLInputElement).value ||
        "0",
      10,
    ) || 0;
  const templateId = (
    document.getElementById("templateId") as HTMLSelectElement
  ).value.trim();

  if (!url) return;

  // Reset UI
  progressDiv.style.display = "block";
  progressDiv.innerHTML = "";
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";
  errorDiv.style.display = "none";
  errorDiv.innerHTML = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Building...";

  try {
    const response = await fetch("/api/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        outputDir,
        customInstructions: customInstructions || undefined,
        username: username || undefined,
        password: password || undefined,
        mergeThreshold,
        templateId: templateId || undefined,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        const event: ProgressEvent = JSON.parse(line);
        handleEvent(event);
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      const event: ProgressEvent = JSON.parse(buffer);
      handleEvent(event);
    }
  } catch (err: any) {
    errorDiv.style.display = "block";
    errorDiv.className = "error-banner";
    errorDiv.textContent = err.message || "An error occurred";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Build Skill";
  }
});

function handleEvent(event: ProgressEvent) {
  if (event.status === "auth-required") {
    // The fetched page was a Rock login wall. Surface a prominent
    // error and pop open the credentials section so the user can fill
    // them in without hunting through Advanced options.
    errorDiv.style.display = "block";
    errorDiv.className = "error-banner auth-required-banner";
    errorDiv.innerHTML = `\u{1F512} <strong>Login required.</strong> ${escapeHtml(event.message)}`;
    const adv = document.getElementById(
      "advanced-section",
    ) as HTMLDetailsElement | null;
    if (adv) adv.open = true;
    const userField = document.getElementById(
      "username",
    ) as HTMLInputElement | null;
    const pwField = document.getElementById(
      "password",
    ) as HTMLInputElement | null;
    (userField?.value ? pwField : userField)?.focus();
    errorDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (event.status === "error") {
    errorDiv.style.display = "block";
    errorDiv.className = "error-banner";
    errorDiv.textContent = event.message;
    return;
  }

  // Update or create step row
  const stepId = `step-${event.step}`;
  let stepEl = document.getElementById(stepId);

  if (!stepEl) {
    stepEl = document.createElement("div");
    stepEl.id = stepId;
    progressDiv.appendChild(stepEl);
  }

  const icon = STATUS_ICONS[event.status] || "\u2022";
  stepEl.className = `progress-step step-${event.status}`;
  stepEl.innerHTML = `
    <span class="step-icon">${event.status === "running" ? '<span class="spinner">\u23F3</span>' : icon}</span>
    <span class="step-message">${escapeHtml(event.message)}</span>
  `;

  // Show result card on completion
  if (event.status === "complete" && event.skillDir) {
    currentSkillDir = event.skillDir;
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
      <div class="result-card">
        <h3>Step 1 &middot; Skill Generated</h3>
        <div class="result-row">
          <span class="result-label">Skill Name</span>
          <span class="result-value">${escapeHtml(event.skillName || "")}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Page Title</span>
          <span class="result-value">${escapeHtml(event.pageTitle || "")}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Articles</span>
          <span class="result-value">${event.articleCount ?? 0}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Reference Files</span>
          <span class="result-value">${event.refCount ?? 0}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Output</span>
          <span class="result-value">${escapeHtml(event.skillDir)}</span>
        </div>
        <p class="hint result-next-hint">Next: refine the skill using the optional steps below, then download or publish at the bottom.</p>
      </div>
    `;

    const finalizeDiv = document.getElementById("finalize")!;
    finalizeDiv.style.display = "block";
    finalizeDiv.innerHTML = `
      <div class="result-card">
        <h3>Final Step &middot; Download or Publish</h3>
        <p class="hint">When you're happy with the descriptions and structure above, grab a local copy or publish to the public gallery.</p>
        <div id="download-missing-warn" class="batch-desc-warn" style="display:none"></div>
        <div class="result-actions">
          <button class="btn btn-sm" id="download-zip-btn">Download ZIP</button>
          <button class="btn btn-sm btn-secondary" id="publish-btn">Publish to Gallery</button>
        </div>
        <p class="hint" id="publish-hint">Publishing uploads the current state of the skill files to the public gallery.</p>
        <div id="publish-status" class="publish-status" style="display:none"></div>
      </div>
    `;

    document
      .getElementById("download-zip-btn")
      ?.addEventListener("click", () => {
        const warn = document.getElementById("download-missing-warn");
        const visible = warn && warn.style.display !== "none";
        if (
          visible &&
          !confirm(
            "This skill has references without AI descriptions. The agent will not know which references to load. Download anyway?",
          )
        ) {
          return;
        }
        downloadZip(event.skillDir!);
      });

    document.getElementById("publish-btn")?.addEventListener("click", () => {
      publishSkill(event.skillDir!);
    });

    setupPublishButton();

    loadReferences(event.skillDir);
  }
}

async function downloadZip(skillDir: string) {
  const res = await fetch(`/api/zip?skillDir=${encodeURIComponent(skillDir)}`);
  if (!res.ok) {
    const err = await res.json();
    alert(err.error || "Failed to create ZIP");
    return;
  }
  const blob = await res.blob();
  const disposition = res.headers.get("Content-Disposition") || "";
  const filenameMatch = disposition.match(/filename="?(.+?)"?$/);
  const filename = filenameMatch?.[1] || "skill.zip";

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Bundle multiple skill directories into a single ZIP and trigger a
 * download. Used by the curated-batch footer.
 */
async function downloadZipBundle(skillDirs: string[], filename = "skills") {
  const res = await fetch("/api/zip-bundle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skillDirs, filename }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || "Failed to create bundle");
    return;
  }
  const blob = await res.blob();
  const disposition = res.headers.get("Content-Disposition") || "";
  const filenameMatch = disposition.match(/filename="?(.+?)"?$/);
  const dlName = filenameMatch?.[1] || `${filename}.zip`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = dlName;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Publish built skill files to the public /gallery. Does NOT save the
 * bundle config to the home-page profile list \u2014 that flow is reserved
 * for curated bundles to avoid letting visitors clutter the home page.
 */
async function saveBundleProfile(bundle: BundledSkill, skillDir?: string) {
  const btn = document.getElementById(
    "bulk-save-profile-btn",
  ) as HTMLButtonElement | null;
  const status = document.getElementById("bulk-save-status");
  if (!status) return;

  if (!skillDir) {
    status.style.display = "block";
    status.className = "ai-fill-status is-error";
    status.textContent = "No built skill found to publish.";
    return;
  }

  const origText = btn?.textContent || "Save to gallery";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Publishing\u2026";
  }
  status.style.display = "block";
  status.className = "ai-fill-status";
  status.textContent = "Uploading skill files to gallery\u2026";

  try {
    const pubRes = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillDir, bundle }),
    });
    const pubData = (await pubRes.json().catch(() => ({}))) as any;
    if (!pubRes.ok) {
      throw new Error(pubData.error || `Publish failed: HTTP ${pubRes.status}`);
    }

    status.className = "ai-fill-status is-saved";
    status.innerHTML = pubData.publicUrl
      ? `\u2713 Published. <a href="${escapeHtml(pubData.publicUrl)}" target="_blank">View on gallery</a>.`
      : "\u2713 Published. Visible in the gallery on next reload.";
    if (btn) btn.textContent = "Published";
  } catch (err: any) {
    status.className = "ai-fill-status is-error";
    status.textContent = err.message || "Publish failed.";
    if (btn) {
      btn.disabled = false;
      btn.textContent = origText;
    }
  }
}

/**
 * Render the bulk-action footer card under the batch result list. Offers
 * a single button to download all skills as one combined ZIP. (The
 * old "generate all missing descriptions" button was removed \u2014 it
 * didn't refresh the per-row editor and duplicated work that's already
 * available per-skill via Manage skill \u2192 Generate Missing.)
 */
function renderBatchActions(
  skillDirs: string[],
  _apiKey: string | undefined,
  items: BatchItem[] = [],
) {
  const host = document.getElementById("batch-actions");
  if (!host) return;
  // If exactly one source was a bundle config, offer to save it to the
  // public gallery alongside the download.
  const bundleItem =
    items.length === 1 && items[0]?.kind === "bundle" ? items[0] : null;
  const bundle = bundleItem?.bundle;
  const showSave = !!bundle && storageEnabled !== false;
  host.style.display = "block";
  host.innerHTML = `
    <div class="batch-actions-inner">
      <div class="batch-actions-summary">When you're ready, download ${skillDirs.length === 1 ? "your skill" : "all " + skillDirs.length + " skills"}${showSave ? " \u2014 or save this configuration to the gallery so others can build it." : "."}</div>
      <div class="batch-actions-buttons">
        <button class="btn btn-sm" id="bulk-download-btn">Download ${skillDirs.length === 1 ? "ZIP" : "all as ZIP"}</button>
        ${showSave ? '<button class="btn btn-sm btn-secondary" id="bulk-save-profile-btn" title="Save this skill configuration (URLs, description, pre-text) to the public gallery.">Save to gallery</button>' : ""}
      </div>
      <div id="bulk-save-status" class="ai-fill-status" style="display:none"></div>
    </div>
  `;

  if (showSave && bundle) {
    const skillDir = skillDirs[0];
    document
      .getElementById("bulk-save-profile-btn")
      ?.addEventListener("click", () => saveBundleProfile(bundle, skillDir));
  }

  document
    .getElementById("bulk-download-btn")
    ?.addEventListener("click", () => {
      // Soft-warn if any per-row Download is still flagged as missing
      // descriptions \u2014 the user may still want the ZIP for a partial
      // batch (e.g. to spot-check before paying for AI generation).
      const missingRows = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'a.link-btn[data-missing-desc]:not([data-missing-desc="0"])',
        ),
      );
      if (
        missingRows.length > 0 &&
        !confirm(
          `${missingRows.length} skill${missingRows.length === 1 ? " is" : "s are"} missing AI descriptions. The agent will not know which references to load for those skills. Download all anyway?`,
        )
      ) {
        return;
      }
      downloadZipBundle(skillDirs);
    });
}

/**
 * Like `loadReferences` but never re-renders the descriptions panel — it
 * only refreshes the per-row warning. Used by the bulk-describe streamer
 * which would otherwise repeatedly clobber a panel the user might be
 * viewing for a different skill.
 */
async function loadReferencesQuiet(skillDir: string) {
  try {
    const res = await fetch(
      `/api/references?skillDir=${encodeURIComponent(skillDir)}`,
    );
    if (!res.ok) return;
    const data = await res.json();
    refreshBatchDescWarning(skillDir, data.references);
    refreshDownloadGating(skillDir, data.references);
  } catch {}
}

let storageEnabled: boolean | null = null;

function setupPublishButton() {
  const btn = document.getElementById(
    "publish-btn",
  ) as HTMLButtonElement | null;
  const hint = document.getElementById("publish-hint");
  if (!btn) return;
  if (storageEnabled === false) {
    btn.disabled = true;
    if (hint) {
      hint.textContent = "Public sharing is not configured on this server.";
    }
  }
}

async function publishSkill(skillDir: string) {
  const btn = document.getElementById(
    "publish-btn",
  ) as HTMLButtonElement | null;
  const status = document.getElementById("publish-status");
  if (!btn || !status) return;
  if (
    !confirm(
      "Publish the current state of this skill to the public gallery? Anyone with the link will be able to view and download it.",
    )
  ) {
    return;
  }
  btn.disabled = true;
  btn.textContent = "Publishing...";
  status.style.display = "block";
  status.className = "publish-status publish-status-running";
  status.textContent = "Uploading skill files...";

  try {
    const res = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillDir }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    status.className = "publish-status publish-status-done";
    const url = window.location.origin + data.publicUrl;
    status.innerHTML = `Published! <a href="${escapeHtml(data.publicUrl)}" target="_blank">${escapeHtml(url)}</a>`;
    btn.textContent = "Published";
  } catch (err: any) {
    status.className = "publish-status publish-status-error";
    status.textContent = err.message || "Publish failed";
    btn.disabled = false;
    btn.textContent = "Publish to Gallery";
  }
}

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Check API key status on load (used to hide the inline key input when one is already configured server-side).
let serverHasApiKey: boolean | null = null;
(async () => {
  try {
    const res = await fetch("/api/settings");
    const data = await res.json();
    serverHasApiKey = !!data.hasApiKey;
  } catch {
    serverHasApiKey = false;
  }
})();

// Kick off the initial bundle load — the gallery is the home view.
loadCuratedRoots();

// If the URL carries `?bundle=<id>`, fetch that published skill's bundle
// config and open it in the builder. Default behavior: download the
// already-built files from the gallery and open the management view
// (descriptions / split / publish) so the user can edit without
// re-fetching the source documentation. They can still rebuild from
// scratch via the "Rebuild from sources" button on the result row.
(async () => {
  const params = new URLSearchParams(window.location.search);
  const bundleId = params.get("bundle");
  if (!bundleId) return;
  // Clean URL up-front so a refresh doesn't re-trigger.
  window.history.replaceState({}, "", window.location.pathname);
  try {
    const metaRes = await fetch(
      `/api/public-skill/${encodeURIComponent(bundleId)}`,
    );
    if (!metaRes.ok) return;
    const data = (await metaRes.json()) as {
      meta?: { bundle?: BundledSkill };
    };
    const bundle = data.meta?.bundle;

    // Try restoring the built files from object storage. If that
    // succeeds, drop the user straight into the management UI.
    const restoreRes = await fetch("/api/restore-from-gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bundleId }),
    });
    if (restoreRes.ok) {
      const r = (await restoreRes.json()) as {
        skillDir: string;
        skillName: string;
        bundle: BundledSkill | null;
        fileCount: number;
      };
      renderRestoredSkill({
        skillDir: r.skillDir,
        skillName: r.skillName,
        bundle: r.bundle ?? bundle ?? null,
      });
      return;
    }

    // Restore failed (e.g. storage misconfigured) — fall back to
    // opening the bundle config so the user can rebuild from sources.
    if (bundle && bundle.sources && bundle.sources.length > 0) {
      showBundleDetail(bundle, { editable: true });
    }
  } catch {
    // Silent — leave user on the default home view.
  }
})();

/**
 * Render a "restored from gallery" result row that mirrors what
 * `runCuratedBatch` produces when a fresh build completes — Download +
 * Manage skill links, plus a Rebuild-from-sources button that re-runs
 * the original bundle through the build pipeline. Auto-opens the
 * management panel so the user lands directly in the editor.
 */
function renderRestoredSkill(opts: {
  skillDir: string;
  skillName: string;
  bundle: BundledSkill | null;
}) {
  const { skillDir, skillName, bundle } = opts;

  showView("detail");
  errorDiv.style.display = "none";
  progressDiv.style.display = "none";
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <div class="result-card">
      <h3>Restored from gallery</h3>
      <p class="hint">Loaded the previously built files for <strong>${escapeHtml(skillName)}</strong>. Edit descriptions, split, or republish below \u2014 no re-fetching required.</p>
      <ul class="batch-list">
        <li class="batch-row" data-status="success">
          <span class="batch-status">\u2713</span>
          <div class="batch-meta">
            <div class="batch-label">${escapeHtml(skillName)} <span class="curated-badge">restored</span></div>
            <div class="batch-result" id="restored-result"></div>
          </div>
        </li>
      </ul>
    </div>
  `;

  const resultRow = document.getElementById("restored-result")!;
  const div = document.createElement("div");
  div.className = "batch-skill";
  div.innerHTML = `\u2713 <strong>${escapeHtml(skillName)}</strong>`;

  const dl = document.createElement("a");
  dl.className = "link-btn";
  dl.href = "#";
  dl.textContent = "Download";
  dl.dataset.skillDir = skillDir;
  dl.dataset.missingDesc = "unknown";
  dl.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      dl.dataset.missingDesc &&
      dl.dataset.missingDesc !== "0" &&
      dl.dataset.missingDesc !== "unknown" &&
      !confirm(
        `${dl.dataset.missingDesc} reference${dl.dataset.missingDesc === "1" ? "" : "s"} are missing AI descriptions. Download anyway?`,
      )
    ) {
      return;
    }
    downloadZip(skillDir);
  });

  const sep1 = document.createElement("span");
  sep1.className = "batch-skill-sep";
  sep1.textContent = "\u00B7";

  const md = document.createElement("a");
  md.className = "link-btn";
  md.href = "#";
  md.textContent = "Manage skill";

  const inline = document.createElement("div");
  inline.className = "batch-desc-inline";
  inline.style.display = "none";

  md.addEventListener("click", (e) => {
    e.preventDefault();
    const descPanel = document.getElementById("descriptions");
    if (!descPanel) return;
    const isHere =
      inline.style.display !== "none" &&
      descPanel.parentElement === inline;
    if (isHere) {
      inline.style.display = "none";
      descPanel.style.display = "none";
      md.textContent = "Manage skill";
      return;
    }
    currentSkillDir = skillDir;
    inline.appendChild(descPanel);
    inline.style.display = "block";
    md.textContent = "Hide skill management";
    loadReferences(skillDir);
    inline.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  div.append(" ", dl, " ", sep1, " ", md);

  if (bundle && bundle.sources && bundle.sources.length > 0) {
    const sep2 = document.createElement("span");
    sep2.className = "batch-skill-sep";
    sep2.textContent = "\u00B7";

    const rebuild = document.createElement("a");
    rebuild.className = "link-btn";
    rebuild.href = "#";
    rebuild.textContent = "Rebuild from sources";
    rebuild.title =
      "Re-fetch every source URL and regenerate the skill from scratch.";
    rebuild.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        !confirm(
          "Re-fetch every source URL and rebuild this skill from scratch? Your current edits to SKILL.md and references will be overwritten.",
        )
      ) {
        return;
      }
      runCuratedBatch([
        {
          url: bundle.sources![0]!.url,
          label: bundle.name || skillName,
          kind: "bundle",
          bundle,
        },
      ]);
    });

    div.append(" ", sep2, " ", rebuild);
  }

  resultRow.appendChild(div);
  resultRow.appendChild(inline);

  // Refresh download-gating + auto-open the management panel so the
  // user lands in the editor.
  loadReferencesQuiet(skillDir);
  setTimeout(() => md.click(), 50);
}

// Check public storage status; disable publish button if not configured.
(async () => {
  try {
    const res = await fetch("/api/storage-status");
    const data = await res.json();
    storageEnabled = !!data.enabled;
  } catch {
    storageEnabled = false;
  }
  setupPublishButton();
})();

async function loadReferences(skillDir: string) {
  try {
    const res = await fetch(
      `/api/references?skillDir=${encodeURIComponent(skillDir)}`,
    );
    if (!res.ok) return;
    const data = (await res.json()) as ReferencesPayload;
    renderDescriptionsPanel(data.references, data.skillMd);
    // Sync any per-row "missing descriptions" warning bound to this skill
    // so it disappears (or updates its count) once descriptions exist.
    refreshBatchDescWarning(skillDir, data.references);
    // Gate the Download / Publish buttons on having descriptions for
    // every reference. The skill is technically valid without them but
    // far less useful, so we make the user explicitly generate (or
    // dismiss) before letting them ship it.
    refreshDownloadGating(skillDir, data.references);
  } catch {}
}

/**
 * Update the per-row "missing descriptions" warning banner AND the
 * `data-missing-desc` count on the row's Download link, so a later
 * click can surface an accurate confirm() rather than a generic warn.
 * The skill is still downloadable — incomplete descriptions are a
 * usefulness issue, not a correctness one.
 */
function refreshDownloadGating(skillDir: string, refs: RefEntry[]) {
  const missing = refs.filter((r) => !r.hasDescription).length;

  document
    .querySelectorAll<HTMLAnchorElement>(
      `a.link-btn[data-skill-dir="${cssEscape(skillDir)}"]`,
    )
    .forEach((dl) => {
      if (dl.textContent?.trim() !== "Download") return;
      dl.dataset.missingDesc = String(missing);
    });

  if (currentSkillDir === skillDir) {
    const warn = document.getElementById("download-missing-warn");
    if (warn) {
      if (missing > 0) {
        warn.style.display = "block";
        warn.textContent = `\u26A0 ${missing} reference${missing === 1 ? " is" : "s are"} missing AI descriptions. The agent will not know which references to load. You can still download, but it's recommended to generate descriptions first.`;
      } else {
        warn.style.display = "none";
      }
    }
  }
}

/**
 * Update — or remove — the inline "missing AI descriptions" warning that
 * `runCuratedBatch` attaches to a result row when a skill is built without
 * `genDesc`. Called after `loadReferences` so generating descriptions
 * immediately reflects in the row UI.
 */
function refreshBatchDescWarning(skillDir: string, refs: RefEntry[]) {
  const warn = document.querySelector<HTMLElement>(
    `.batch-desc-warn[data-warn-dir="${cssEscape(skillDir)}"]`,
  );
  if (!warn) return;
  const missing = refs.filter((r) => !r.hasDescription).length;
  if (missing === 0) {
    warn.remove();
    return;
  }
  warn.innerHTML = `\u26A0 <strong>${missing} reference${missing === 1 ? "" : "s"} still missing AI descriptions.</strong> Use <em>Manage skill</em> above to generate the rest.`;

  // Auto-expand the Manage skill panel for this row the first time we
  // detect missing descriptions \u2014 the user shouldn't have to hunt for
  // the fix. Only fire once per row so the user can collapse it again.
  const row = warn.closest(".batch-skill") as HTMLElement | null;
  if (row && !row.dataset.autoOpened) {
    const manage = row.querySelector<HTMLAnchorElement>(
      'a.link-btn',
    );
    const manageBtn = Array.from(
      row.querySelectorAll<HTMLAnchorElement>("a.link-btn"),
    ).find((a) => a.textContent?.trim() === "Manage skill");
    if (manageBtn) {
      row.dataset.autoOpened = "1";
      manageBtn.click();
    } else if (manage && manage.textContent?.trim() === "Manage skill") {
      row.dataset.autoOpened = "1";
      manage.click();
    }
  }
}

function cssEscape(value: string): string {
  // CSS.escape is broadly available; fall back to a safe regex if the
  // browser is older.
  if (typeof (window as any).CSS?.escape === "function") {
    return (window as any).CSS.escape(value);
  }
  return value.replace(/["\\\n\r\f\t]/g, (c) => `\\${c}`);
}

interface RefEntry {
  slug: string;
  title: string;
  breadcrumb: string;
  description: string | null;
  hasDescription: boolean;
  bodyPreview?: string;
  /** GitHub edit URL for the curated description cache file. */
  editUrl?: string | null;
}

interface ReferencesPayload {
  skillName?: string;
  pageTitle?: string;
  skillMd?: string;
  references: RefEntry[];
}

function renderDescriptionsPanel(refs: RefEntry[], skillMd?: string) {
  const panel = document.getElementById("descriptions")!;
  const withDesc = refs.filter((r) => r.hasDescription).length;
  const missingCount = refs.length - withDesc;

  const apiKeyBlock = serverHasApiKey
    ? `<p class="hint ai-key-active">\u2713 Anthropic API key loaded from server environment.</p>`
    : `<div class="form-group desc-key">
        <label for="desc-api-key">Anthropic API Key</label>
        <input type="password" id="desc-api-key" placeholder="sk-ant-..." autocomplete="off" />
        <p class="hint">Required to generate descriptions. Used only for this request \u2014 not stored.</p>
      </div>`;

  panel.style.display = "block";
  panel.innerHTML = `
    ${
      skillMd
        ? `<div class="desc-panel preview-panel">
        <div class="desc-header">
          <h3>Step 1 &middot; Review & edit your <code>SKILL.md</code></h3>
          <span class="desc-count">${refs.length} reference${refs.length === 1 ? "" : "s"}</span>
        </div>
        <div class="panel-callout preview-intro">
          <strong>This is the manifest the AI agent reads first.</strong>
          Edits made <em>above</em> the <code>## Topics</code> list \u2014 the description, overview prose, and any hand-written notes \u2014 are preserved across rebuilds and AI description regeneration.
          The <code>## Topics</code> list itself is regenerated from your reference files; to change a topic's description use Step 2 below or hand-edit the matching <code>references/&lt;slug&gt;.md</code> frontmatter.
          To change source labels or add intro text on the next build, go back and edit the bundle config.
        </div>
        <div class="skill-md-editor">
          <div class="skill-md-editor-toolbar">
            <span class="skill-md-meta" id="skill-md-meta">${skillMd.split("\n").length} lines &middot; ${skillMd.length.toLocaleString()} chars</span>
            <span class="skill-md-status" id="skill-md-status"></span>
            <div class="skill-md-actions">
              <button id="skill-md-revert" class="btn-sm btn-secondary" disabled>Revert</button>
              <button id="skill-md-save" class="btn-sm" disabled>Save changes</button>
            </div>
          </div>
          <textarea id="skill-md-textarea" class="skill-md-textarea" spellcheck="false">${escapeHtml(skillMd)}</textarea>
        </div>
      </div>`
        : ""
    }
    <div class="desc-panel">
      <div class="desc-header">
          <h3>Step 2 &middot; Generate AI descriptions <span class="step-optional">(recommended)</span></h3>
        <span class="desc-count">${withDesc} of ${refs.length} have AI descriptions</span>
      </div>
      <div class="panel-callout">
        Each reference file needs a one-line description so the agent knows when to load it. Click <strong>Generate</strong> to have Claude read every reference and draft one.
        Generation calls the Anthropic API <strong>once per reference</strong> (\u2248 ${refs.length} call${refs.length === 1 ? "" : "s"}, billed to your account) and saves the results into both the reference file and SKILL.md.
        After generation, fine-tune any line in the form below \u2014 each edit is saved immediately to disk.
      </div>
      ${missingCount > 0 ? `<div class="desc-missing-banner" role="alert">\u26A0 ${missingCount} reference${missingCount === 1 ? " is" : "s are"} missing a description. The agent may skip ${missingCount === 1 ? "it" : "them"} entirely.</div>` : ""}
      <div class="panel-form">
        ${apiKeyBlock}
        <div class="desc-actions">
          <button id="gen-missing-btn" class="btn-sm"${missingCount === 0 ? " disabled" : ""}>Generate Missing (${missingCount})</button>
          <button id="gen-all-btn" class="btn-sm btn-secondary">Regenerate All (${refs.length})</button>
        </div>
      </div>
      <div id="desc-progress" class="desc-progress" style="display:none"></div>
      <div class="desc-list">
        ${refs
          .map(
            (ref) => `
          <div class="desc-item${ref.hasDescription ? "" : " desc-item-missing"}" id="desc-${escapeHtml(ref.slug)}">
            <div class="desc-item-top">
              <div class="desc-item-info">
                <span class="desc-title">${escapeHtml(ref.title)}</span>
                <span class="desc-breadcrumb">${escapeHtml(ref.breadcrumb)}</span>
              </div>
              <div class="desc-item-tools">
                ${ref.editUrl ? `<a class="desc-suggest-btn" href="${escapeHtml(ref.editUrl)}" target="_blank" rel="noopener" title="Suggest a better description on GitHub">Suggest</a>` : ""}
                <button class="desc-regen-btn" data-slug="${escapeHtml(ref.slug)}" title="Regenerate">\u21BB</button>
              </div>
            </div>
            <div class="desc-edit-wrap" data-slug="${escapeHtml(ref.slug)}">
              <textarea
                class="desc-edit-input${ref.hasDescription ? "" : " desc-edit-missing"}"
                data-slug="${escapeHtml(ref.slug)}"
                rows="2"
                placeholder="Use when&hellip; (one line, &le; 200 chars). Click Generate above to draft with Claude, or write your own."
              >${ref.hasDescription ? escapeHtml(ref.description!) : ""}</textarea>
              <div class="desc-edit-meta">
                <span class="desc-edit-status" data-slug="${escapeHtml(ref.slug)}">${ref.hasDescription ? "" : "\u26A0 No description \u2014 agent will likely skip this reference"}</span>
                <span class="desc-edit-count" data-slug="${escapeHtml(ref.slug)}"></span>
              </div>
            </div>
            ${
              ref.bodyPreview
                ? `<div class="desc-body-wrap" data-slug="${escapeHtml(ref.slug)}">
                    <div class="desc-body-preview" data-mode="snippet">${escapeHtml(ref.bodyPreview)}</div>
                    <button type="button" class="desc-body-toggle" data-slug="${escapeHtml(ref.slug)}">Show full reference</button>
                  </div>`
                : ""
            }
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;

  // Wire up the SKILL.md editor (save / revert / dirty tracking).
  const textarea = document.getElementById(
    "skill-md-textarea",
  ) as HTMLTextAreaElement | null;
  const saveBtn = document.getElementById(
    "skill-md-save",
  ) as HTMLButtonElement | null;
  const revertBtn = document.getElementById(
    "skill-md-revert",
  ) as HTMLButtonElement | null;
  const statusEl = document.getElementById("skill-md-status");
  const metaEl = document.getElementById("skill-md-meta");
  if (textarea && saveBtn && revertBtn && skillMd) {
    let original = skillMd;
    const updateDirty = () => {
      const dirty = textarea.value !== original;
      saveBtn.disabled = !dirty;
      revertBtn.disabled = !dirty;
      if (statusEl) {
        statusEl.textContent = dirty ? "Unsaved changes" : "";
        statusEl.className = "skill-md-status" + (dirty ? " is-dirty" : "");
      }
      if (metaEl) {
        metaEl.textContent = `${textarea.value.split("\n").length} lines · ${textarea.value.length.toLocaleString()} chars`;
      }
    };
    textarea.addEventListener("input", updateDirty);
    revertBtn.addEventListener("click", () => {
      textarea.value = original;
      updateDirty();
    });
    saveBtn.addEventListener("click", async () => {
      if (!currentSkillDir) return;
      saveBtn.disabled = true;
      if (statusEl) {
        statusEl.textContent = "Saving\u2026";
        statusEl.className = "skill-md-status";
      }
      try {
        const res = await fetch("/api/skill-md", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skillDir: currentSkillDir,
            content: textarea.value,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as any).error || `HTTP ${res.status}`);
        }
        original = textarea.value;
        updateDirty();
        if (statusEl) {
          statusEl.textContent = "Saved";
          statusEl.className = "skill-md-status is-saved";
          setTimeout(() => {
            if (statusEl.textContent === "Saved") {
              statusEl.textContent = "";
              statusEl.className = "skill-md-status";
            }
          }, 2000);
        }
      } catch (err: any) {
        if (statusEl) {
          statusEl.textContent = `Save failed: ${err.message}`;
          statusEl.className = "skill-md-status is-error";
        }
        saveBtn.disabled = false;
      }
    });
  }

  // Expand/collapse full reference body on demand.
  panel.querySelectorAll(".desc-body-toggle").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const button = btn as HTMLButtonElement;
      const slug = button.dataset.slug!;
      const wrap = button.closest(".desc-body-wrap") as HTMLElement | null;
      const preview = wrap?.querySelector(
        ".desc-body-preview",
      ) as HTMLElement | null;
      if (!wrap || !preview) return;
      if (preview.dataset.mode === "full") {
        // Collapse back to snippet — stored in dataset.snippet on first expand.
        preview.textContent = preview.dataset.snippet || "";
        preview.dataset.mode = "snippet";
        button.textContent = "Show full reference";
        return;
      }
      if (!currentSkillDir) return;
      // Cache the snippet text before swapping it for the full body.
      if (!preview.dataset.snippet) {
        preview.dataset.snippet = preview.textContent || "";
      }
      button.disabled = true;
      const previousLabel = button.textContent;
      button.textContent = "Loading\u2026";
      try {
        const res = await fetch(
          `/api/reference?skillDir=${encodeURIComponent(currentSkillDir)}&slug=${encodeURIComponent(slug)}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { body?: string };
        preview.textContent = data.body || "(empty)";
        preview.dataset.mode = "full";
        button.textContent = "Hide full reference";
      } catch (err: any) {
        button.textContent = previousLabel || "Show full reference";
        preview.textContent =
          (preview.dataset.snippet || "") +
          `\n\n[Failed to load full reference: ${err.message}]`;
      } finally {
        button.disabled = false;
      }
    });
  });

  document.getElementById("gen-missing-btn")?.addEventListener("click", () => {
    const missing = refs.filter((r) => !r.hasDescription).map((r) => r.slug);
    if (missing.length > 0) generateDescriptions(missing);
  });

  document.getElementById("gen-all-btn")?.addEventListener("click", () => {
    generateDescriptions();
  });

  panel.querySelectorAll(".desc-regen-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = (btn as HTMLElement).dataset.slug!;
      generateDescriptions([slug]);
    });
  });

  // Inline description editor — debounced auto-save on input, flush on blur.
  // Each textarea persists its slug's description back to disk via PUT
  // /api/description, which rewrites the reference frontmatter and the
  // SKILL.md TOC line. Status text mirrors the SKILL.md editor (dirty /
  // saving / saved / error).
  const saveTimers = new Map<string, ReturnType<typeof setTimeout>>();
  const lastSaved = new Map<string, string>();
  for (const ref of refs) {
    lastSaved.set(ref.slug, ref.description || "");
  }

  const setStatus = (slug: string, text: string, cls: string) => {
    const el = panel.querySelector(
      `.desc-edit-status[data-slug="${cssEscape(slug)}"]`,
    ) as HTMLElement | null;
    if (!el) return;
    el.textContent = text;
    el.className = "desc-edit-status" + (cls ? " " + cls : "");
  };

  const updateCount = (slug: string, len: number) => {
    const el = panel.querySelector(
      `.desc-edit-count[data-slug="${cssEscape(slug)}"]`,
    ) as HTMLElement | null;
    if (!el) return;
    el.textContent = `${len} / 200`;
    el.className = "desc-edit-count" + (len > 200 ? " is-warn" : "");
  };

  const saveDescription = async (slug: string, value: string) => {
    if (!currentSkillDir) return;
    const trimmed = value.trim();
    if (!trimmed) {
      setStatus(
        slug,
        "\u26A0 No description \u2014 agent will likely skip this reference",
        "is-warn",
      );
      return;
    }
    if (trimmed === lastSaved.get(slug)) {
      setStatus(slug, "Saved", "is-saved");
      return;
    }
    setStatus(slug, "Saving\u2026", "");
    try {
      const res = await fetch("/api/description", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillDir: currentSkillDir,
          slug,
          description: trimmed,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || `HTTP ${res.status}`);
      }
      lastSaved.set(slug, trimmed);
      // Promote the row out of the missing-description visual state.
      const item = document.getElementById(`desc-${slug}`);
      item?.classList.remove("desc-item-missing");
      const ta = panel.querySelector(
        `.desc-edit-input[data-slug="${cssEscape(slug)}"]`,
      ) as HTMLTextAreaElement | null;
      ta?.classList.remove("desc-edit-missing");
      setStatus(slug, "Saved", "is-saved");
      // Keep the warning banner / batch count in sync without rerendering
      // the whole panel (which would clobber the user's other open edits).
      refreshBatchDescWarning(currentSkillDir!, await fetchRefsLite());
      refreshDownloadGating(currentSkillDir!, await fetchRefsLite());
    } catch (err: any) {
      setStatus(slug, `Save failed: ${err.message}`, "is-error");
    }
  };

  // Helper that pulls a slim references payload for the warning/gating
  // refreshers. Avoids re-rendering the descriptions panel.
  const fetchRefsLite = async () => {
    if (!currentSkillDir) return [] as RefEntry[];
    try {
      const res = await fetch(
        `/api/references?skillDir=${encodeURIComponent(currentSkillDir)}`,
      );
      if (!res.ok) return [];
      const data = (await res.json()) as ReferencesPayload;
      return data.references;
    } catch {
      return [];
    }
  };

  panel.querySelectorAll(".desc-edit-input").forEach((el) => {
    const ta = el as HTMLTextAreaElement;
    const slug = ta.dataset.slug!;
    updateCount(slug, ta.value.length);

    ta.addEventListener("input", () => {
      updateCount(slug, ta.value.length);
      const trimmed = ta.value.trim();
      if (trimmed && trimmed !== lastSaved.get(slug)) {
        setStatus(slug, "Unsaved\u2026", "is-dirty");
      } else if (!trimmed) {
        setStatus(slug, "\u26A0 Empty", "is-warn");
      } else {
        setStatus(slug, "", "");
      }
      const existing = saveTimers.get(slug);
      if (existing) clearTimeout(existing);
      const t = setTimeout(() => {
        saveTimers.delete(slug);
        saveDescription(slug, ta.value);
      }, 800);
      saveTimers.set(slug, t);
    });

    ta.addEventListener("blur", () => {
      const existing = saveTimers.get(slug);
      if (existing) {
        clearTimeout(existing);
        saveTimers.delete(slug);
      }
      saveDescription(slug, ta.value);
    });
  });
}

async function generateDescriptions(slugs?: string[]) {
  if (!currentSkillDir) return;

  const apiKeyInput = document.getElementById(
    "desc-api-key",
  ) as HTMLInputElement | null;
  const apiKey = apiKeyInput?.value.trim() || undefined;

  const genMissingBtn = document.getElementById(
    "gen-missing-btn",
  ) as HTMLButtonElement;
  const genAllBtn = document.getElementById("gen-all-btn") as HTMLButtonElement;
  if (genMissingBtn) genMissingBtn.disabled = true;
  if (genAllBtn) genAllBtn.disabled = true;

  document.querySelectorAll(".desc-regen-btn").forEach((btn) => {
    (btn as HTMLButtonElement).disabled = true;
  });

  const descProgressDiv = document.getElementById("desc-progress")!;
  descProgressDiv.style.display = "block";
  descProgressDiv.className = "desc-progress";
  descProgressDiv.textContent = "Starting description generation...";

  try {
    const response = await fetch("/api/describe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillDir: currentSkillDir,
        slugs,
        apiKey,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        handleDescribeEvent(JSON.parse(line));
      }
    }

    if (buffer.trim()) {
      handleDescribeEvent(JSON.parse(buffer));
    }

    // Refresh the full list
    await loadReferences(currentSkillDir);
  } catch (err: any) {
    descProgressDiv.textContent = err.message;
    descProgressDiv.className = "desc-progress desc-error";
  } finally {
    if (genMissingBtn) genMissingBtn.disabled = false;
    if (genAllBtn) genAllBtn.disabled = false;
    document.querySelectorAll(".desc-regen-btn").forEach((btn) => {
      (btn as HTMLButtonElement).disabled = false;
    });
  }
}

function handleDescribeEvent(event: Record<string, unknown>) {
  const descProgressDiv = document.getElementById("desc-progress")!;

  if (event.status === "running" && event.slug) {
    descProgressDiv.style.display = "block";
    descProgressDiv.textContent = `Generating: ${event.slug}...`;
    const item = document.getElementById(`desc-${event.slug}`);
    if (item) item.classList.add("desc-generating");
  }

  if (event.status === "done" && event.slug) {
    const item = document.getElementById(`desc-${event.slug}`);
    if (item) {
      item.classList.remove("desc-generating");
      item.classList.remove("desc-item-missing");
      // Populate the inline editor with the freshly generated description.
      // We avoid an "Unsaved" flash by writing both the textarea and its
      // status indicator together — the API call has already persisted
      // the value to disk, so no save is needed.
      const ta = item.querySelector(
        ".desc-edit-input",
      ) as HTMLTextAreaElement | null;
      if (ta) {
        ta.value = event.description as string;
        ta.classList.remove("desc-edit-missing");
        const slug = event.slug as string;
        const statusEl = item.querySelector(
          ".desc-edit-status",
        ) as HTMLElement | null;
        if (statusEl) {
          statusEl.textContent = "Saved";
          statusEl.className = "desc-edit-status is-saved";
        }
        const countEl = item.querySelector(
          ".desc-edit-count",
        ) as HTMLElement | null;
        if (countEl) {
          countEl.textContent = `${ta.value.length} / 200`;
          countEl.className =
            "desc-edit-count" + (ta.value.length > 200 ? " is-warn" : "");
        }
        // Touch the slug so further edits compare against the new value.
        // (lastSaved lives inside renderDescriptionsPanel's closure; the
        // next blur/auto-save will compute correctly because the textarea
        // value matches the on-disk value.)
        void slug;
      }
    }
  }

  if (event.status === "error" && event.slug) {
    const item = document.getElementById(`desc-${event.slug}`);
    if (item) {
      item.classList.remove("desc-generating");
      item.classList.add("desc-error-item");
    }
  }

  if (event.status === "complete") {
    descProgressDiv.textContent = event.message as string;
    setTimeout(() => {
      descProgressDiv.style.display = "none";
    }, 3000);
  }
}

// Populate Template dropdown from /api/templates
(async function loadTemplates() {
  try {
    const res = await fetch("/api/templates");
    if (!res.ok) return;
    const { templates } = (await res.json()) as {
      templates: Array<{
        id: string;
        name: string;
        description?: string;
        splitter: string;
        hasInterpreterPipeline: boolean;
      }>;
    };
    const select = document.getElementById(
      "templateId",
    ) as HTMLSelectElement | null;
    if (!select) return;
    for (const t of templates) {
      const opt = document.createElement("option");
      opt.value = t.id;
      const flags: string[] = [t.splitter];
      if (t.hasInterpreterPipeline) flags.push("interpreter");
      opt.textContent = `${t.name} (${flags.join(", ")})`;
      if (t.description) opt.title = t.description;
      select.appendChild(opt);
    }
  } catch {
    // Silent — auto-detect still works with empty dropdown.
  }
})();
