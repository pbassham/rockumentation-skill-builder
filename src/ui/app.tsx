/// <reference lib="dom" />

interface ProgressEvent {
  step: number;
  status: "running" | "done" | "error" | "complete";
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

const STATUS_ICONS: Record<string, string> = {
  running: "\u23F3",
  done: "\u2713",
  error: "\u2717",
  complete: "\uD83C\uDF89",
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

  <div id="mode-picker" class="card">
    <h2 class="mode-title">What do you want to build?</h2>
    <p class="hint">Pick a starting point. You can switch back and forth.</p>
    <div class="mode-grid">
      <button type="button" class="mode-card" data-mode="curated">
        <h3>Build from Rock canonical docs</h3>
        <p>Pick from a curated list of Rock RMS documentation roots. Best for keeping your skills library refreshed.</p>
      </button>
      <button type="button" class="mode-card" data-mode="custom">
        <h3>Use a custom URL</h3>
        <p>Paste any Rockumentation page or other doc URL and pick a template.</p>
      </button>
    </div>
  </div>

  <section id="curated-panel" class="card" style="display:none">
    <div class="mode-back">
      <button type="button" class="link-btn" data-back="mode">\u2190 Back</button>
    </div>
    <h2>Rock canonical docs</h2>
    <p class="hint">Select the docs you want to (re)build. Each selection becomes its own skill folder under <code>./output</code>.</p>
    <div id="curated-loading" class="hint">Loading sources\u2026</div>
    <div id="curated-groups"></div>
    <div class="curated-actions" id="curated-actions" style="display:none">
      <div class="curated-summary"><span id="curated-count">0</span> selected</div>
      <div class="curated-buttons">
        <label class="curated-toggle"><input type="checkbox" id="curated-gen-desc" /> Generate AI descriptions</label>
        <button type="button" class="btn-sm btn-secondary" id="curated-select-all">Select all</button>
        <button type="button" class="btn-sm btn-secondary" id="curated-clear">Clear</button>
        <button type="button" class="btn-sm" id="curated-build">Build selected</button>
      </div>
    </div>
    <div id="curated-key-block" class="form-group" style="display:none">
      <label for="curated-api-key">Anthropic API Key</label>
      <input type="password" id="curated-api-key" placeholder="sk-ant-..." autocomplete="off" />
      <p class="hint">Required to generate descriptions during the batch. Used only for this request \u2014 not stored.</p>
    </div>
  </section>

  <form id="build-form" class="card" style="display:none">
    <div class="mode-back">
      <button type="button" class="link-btn" data-back="mode">\u2190 Back</button>
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

  <section class="info-card">
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
  <div id="split-panel" style="display:none"></div>
  <div id="finalize" style="display:none"></div>
`;

const form = document.getElementById("build-form") as HTMLFormElement;
const progressDiv = document.getElementById("progress")!;
const resultDiv = document.getElementById("result")!;
const errorDiv = document.getElementById("error")!;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

// Mode switching ------------------------------------------------------------

const modePicker = document.getElementById("mode-picker")!;
const curatedPanel = document.getElementById("curated-panel")!;

function showMode(mode: "picker" | "curated" | "custom") {
  modePicker.style.display = mode === "picker" ? "block" : "none";
  curatedPanel.style.display = mode === "curated" ? "block" : "none";
  form.style.display = mode === "custom" ? "block" : "none";
  if (mode === "curated" && !curatedLoaded) loadCuratedRoots();
}

modePicker.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const m = btn.dataset.mode === "curated" ? "curated" : "custom";
    showMode(m);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => showMode("picker"));
});

// Curated roots -------------------------------------------------------------

let curatedLoaded = false;

async function loadCuratedRoots() {
  curatedLoaded = true;
  const loading = document.getElementById("curated-loading")!;
  const groupsEl = document.getElementById("curated-groups")!;
  const actionsEl = document.getElementById("curated-actions")!;
  try {
    const res = await fetch("/api/curated-roots");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { groups: CuratedRootGroup[] };
    loading.style.display = "none";
    groupsEl.innerHTML = data.groups
      .map(
        (g, gi) => `
      <fieldset class="curated-group">
        <legend>${escapeHtml(g.label)}</legend>
        ${g.description ? `<p class="hint">${escapeHtml(g.description)}</p>` : ""}
        ${g.items
          .map(
            (it, ii) => `
          <label class="curated-item">
            <input type="checkbox" class="curated-check" data-url="${escapeHtml(it.url)}" data-label="${escapeHtml(it.label)}" data-kind="${it.kind}" id="curated-${gi}-${ii}" />
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
    actionsEl.style.display = "flex";

    const checks = () =>
      Array.from(groupsEl.querySelectorAll<HTMLInputElement>(".curated-check"));
    const countEl = document.getElementById("curated-count")!;
    const buildBtn = document.getElementById(
      "curated-build",
    ) as HTMLButtonElement;
    const updateCount = () => {
      const n = checks().filter((c) => c.checked).length;
      countEl.textContent = String(n);
      buildBtn.disabled = n === 0;
    };
    updateCount();
    groupsEl.addEventListener("change", updateCount);

    document
      .getElementById("curated-select-all")!
      .addEventListener("click", () => {
        checks().forEach((c) => (c.checked = true));
        updateCount();
      });
    document.getElementById("curated-clear")!.addEventListener("click", () => {
      checks().forEach((c) => (c.checked = false));
      updateCount();
    });
    buildBtn.addEventListener("click", () => {
      const selected = checks()
        .filter((c) => c.checked)
        .map((c) => ({
          url: c.dataset.url!,
          label: c.dataset.label!,
          kind: (c.dataset.kind as "single" | "index") || "single",
        }));
      if (selected.length > 0) runCuratedBatch(selected);
    });

    const genDescCb = document.getElementById(
      "curated-gen-desc",
    ) as HTMLInputElement;
    const keyBlock = document.getElementById("curated-key-block")!;
    const updateKeyBlock = () => {
      keyBlock.style.display =
        genDescCb.checked && serverHasApiKey === false ? "block" : "none";
    };
    genDescCb.addEventListener("change", updateKeyBlock);
    updateKeyBlock();
  } catch (err: any) {
    loading.textContent = `Failed to load sources: ${err.message}`;
  }
}

interface BatchItem {
  url: string;
  label: string;
  kind: "single" | "index";
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
  document.getElementById("split-panel")!.style.display = "none";

  const buildBtn = document.getElementById(
    "curated-build",
  ) as HTMLButtonElement;
  buildBtn.disabled = true;
  buildBtn.textContent = "Building\u2026";

  const genDesc =
    (document.getElementById("curated-gen-desc") as HTMLInputElement | null)
      ?.checked ?? false;
  const apiKey =
    (
      document.getElementById("curated-api-key") as HTMLInputElement | null
    )?.value.trim() || undefined;

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
      const res = await fetch("/api/build", {
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
            dl.addEventListener("click", (e) => {
              e.preventDefault();
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
              const splitPanel = document.getElementById("split-panel");
              if (!descPanel) return;
              const isHere =
                inline.style.display !== "none" &&
                descPanel.parentElement === inline;
              if (isHere) {
                // Collapse: hide and detach so the next "Manage skill"
                // click on a different row can reclaim the panels.
                inline.style.display = "none";
                descPanel.style.display = "none";
                if (splitPanel) splitPanel.style.display = "none";
                md.textContent = "Manage skill";
                return;
              }
              currentSkillDir = dir;
              inline.appendChild(descPanel);
              if (splitPanel) inline.appendChild(splitPanel);
              inline.style.display = "block";
              md.textContent = "Hide skill management";
              loadReferences(dir);
              loadCategories(dir);
              inline.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });

            div.append(" ", dl, " ", sep, " ", md);

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
            } else {
              resultRow.appendChild(div);
              resultRow.appendChild(inline);
            }
          }
          if (evt.status === "error") {
            failed = true;
            const div = document.createElement("div");
            div.className = "batch-error";
            div.textContent = `\u2717 ${evt.message}`;
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
    renderBatchActions(producedSkillDirs, apiKey);
  }

  buildBtn.disabled = false;
  buildBtn.textContent = "Build selected";
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
        downloadZip(event.skillDir!);
      });

    document.getElementById("publish-btn")?.addEventListener("click", () => {
      publishSkill(event.skillDir!);
    });

    setupPublishButton();

    loadReferences(event.skillDir);
    loadCategories(event.skillDir);
  }
}

async function loadCategories(skillDir: string) {
  const splitPanel = document.getElementById("split-panel")!;
  try {
    const res = await fetch(
      `/api/categories?skillDir=${encodeURIComponent(skillDir)}`,
    );
    if (!res.ok) return;
    const data = await res.json();
    const categories: { title: string; slug: string; fileCount: number }[] =
      data.categories;

    if (categories.length <= 1) {
      splitPanel.style.display = "none";
      return;
    }

    splitPanel.style.display = "block";
    splitPanel.innerHTML = `
      <div class="desc-panel">
        <div class="desc-header">
          <h3>Step 3 &middot; Split Skill <span class="step-optional">(optional)</span></h3>
          <span class="desc-count">Select categories to extract into separate skills</span>
        </div>
        <div class="desc-list">
          ${categories
            .map(
              (cat) => `
            <label class="split-item">
              <input type="checkbox" value="${escapeHtml(cat.slug)}" class="split-check" />
              <span class="split-title">${escapeHtml(cat.title)}</span>
              <span class="split-count">${cat.fileCount} files</span>
            </label>`,
            )
            .join("")}
        </div>
        <div class="desc-actions">
          <button id="split-btn" class="btn-sm" disabled>Split Selected</button>
          <span id="split-status" class="desc-progress" style="display:none"></span>
        </div>
      </div>
    `;

    const checks = splitPanel.querySelectorAll(".split-check");
    const splitBtn = document.getElementById("split-btn") as HTMLButtonElement;

    checks.forEach((cb) => {
      cb.addEventListener("change", () => {
        const anyChecked = splitPanel.querySelector(".split-check:checked");
        splitBtn.disabled = !anyChecked;
      });
    });

    splitBtn.addEventListener("click", () => {
      const selected = Array.from(
        splitPanel.querySelectorAll<HTMLInputElement>(".split-check:checked"),
      ).map((cb) => cb.value);
      if (selected.length > 0) splitSelectedCategories(skillDir, selected);
    });
  } catch {}
}

async function splitSelectedCategories(
  skillDir: string,
  categorySlugs: string[],
) {
  const splitBtn = document.getElementById("split-btn") as HTMLButtonElement;
  const statusEl = document.getElementById("split-status")!;

  splitBtn.disabled = true;
  splitBtn.textContent = "Splitting...";
  statusEl.style.display = "inline";
  statusEl.textContent = "";

  try {
    const res = await fetch("/api/split", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillDir, categorySlugs }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Split failed");
    }

    const data = await res.json();
    const results: {
      skillName: string;
      filesMoved: number;
      newSkillDir: string;
    }[] = data.results;

    statusEl.className = "desc-progress";
    statusEl.textContent = results
      .map((r) => `${r.skillName}: ${r.filesMoved} files`)
      .join(", ");

    // Reload categories to reflect the updated state
    await loadCategories(skillDir);
    await loadReferences(skillDir);
  } catch (err: any) {
    statusEl.className = "desc-progress desc-error";
    statusEl.textContent = err.message;
  } finally {
    splitBtn.disabled = false;
    splitBtn.textContent = "Split Selected";
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
 * Render the bulk-action footer card under the batch result list. Offers
 * a single button to generate every missing AI description across all
 * built skills, and another to download all skills as one combined ZIP.
 */
function renderBatchActions(skillDirs: string[], apiKey: string | undefined) {
  const host = document.getElementById("batch-actions");
  if (!host) return;
  host.style.display = "block";
  host.innerHTML = `
    <div class="batch-actions-inner">
      <div class="batch-actions-summary">${skillDirs.length} skill${skillDirs.length === 1 ? "" : "s"} ready.</div>
      <div class="batch-actions-buttons">
        <button class="btn btn-sm" id="bulk-describe-btn">Generate all missing descriptions</button>
        <button class="btn btn-sm" id="bulk-download-btn">Download all as ZIP</button>
      </div>
      <div class="desc-progress" id="bulk-describe-status" style="display:none"></div>
    </div>
  `;

  document
    .getElementById("bulk-download-btn")
    ?.addEventListener("click", () => {
      downloadZipBundle(skillDirs);
    });

  document
    .getElementById("bulk-describe-btn")
    ?.addEventListener("click", async () => {
      const btn = document.getElementById(
        "bulk-describe-btn",
      ) as HTMLButtonElement;
      const status = document.getElementById("bulk-describe-status")!;
      btn.disabled = true;
      btn.textContent = "Generating\u2026";
      status.style.display = "block";
      status.className = "desc-progress";
      status.textContent = "Starting\u2026";
      try {
        const res = await fetch("/api/describe/missing-bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skillDirs, apiKey }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let totalGenerated = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const evt = JSON.parse(line);
            if (typeof evt.message === "string")
              status.textContent = evt.message;
            if (evt.status === "skill-complete" && evt.skillDir) {
              // Refresh per-row warning so it disappears as each skill
              // finishes describing.
              loadReferencesQuiet(evt.skillDir);
            }
            if (evt.status === "complete") {
              totalGenerated = evt.generated || 0;
              status.textContent = evt.message || "Done";
            }
          }
        }
        status.className = "desc-progress desc-success";
        if (totalGenerated === 0 && !status.textContent) {
          status.textContent = "All skills already had descriptions.";
        }
      } catch (err: any) {
        status.className = "desc-progress desc-error";
        status.textContent = err.message || "Failed";
      } finally {
        btn.disabled = false;
        btn.textContent = "Generate all missing descriptions";
      }
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
    const data = await res.json();
    renderDescriptionsPanel(data.references);
    // Sync any per-row "missing descriptions" warning bound to this skill
    // so it disappears (or updates its count) once descriptions exist.
    refreshBatchDescWarning(skillDir, data.references);
  } catch {}
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
  /** GitHub edit URL for the curated description cache file. */
  editUrl?: string | null;
}

function renderDescriptionsPanel(refs: RefEntry[]) {
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
    <div class="desc-panel">
      <div class="desc-header">
          <h3>Step 2 &middot; Reference Descriptions <span class="step-optional">(optional)</span></h3>
        <span class="desc-count">${withDesc} of ${refs.length} have AI descriptions</span>
      </div>
      ${apiKeyBlock}
      <div class="desc-actions">
        <button id="gen-missing-btn" class="btn-sm"${missingCount === 0 ? " disabled" : ""}>Generate Missing (${missingCount})</button>
        <button id="gen-all-btn" class="btn-sm btn-secondary">Regenerate All (${refs.length})</button>
      </div>
      <div id="desc-progress" class="desc-progress" style="display:none"></div>
      <div class="desc-list">
        ${refs
          .map(
            (ref) => `
          <div class="desc-item" id="desc-${escapeHtml(ref.slug)}">
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
            <div class="desc-text${ref.hasDescription ? "" : " desc-missing"}">${ref.hasDescription ? escapeHtml(ref.description!) : "No description"}</div>
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;

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
      const descEl = item.querySelector(".desc-text");
      if (descEl) {
        descEl.textContent = event.description as string;
        descEl.classList.remove("desc-missing");
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
