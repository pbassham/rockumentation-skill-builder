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

  <form id="build-form" class="card">
    <div class="form-group">
      <label for="url">Rockumentation URL</label>
      <input type="url" id="url" name="url" placeholder="https://community.rockrms.com/developer/developer-codex" required />
      <p class="hint">The root URL of the Rockumentation page you want to convert</p>
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
  } catch {}
}

interface RefEntry {
  slug: string;
  title: string;
  breadcrumb: string;
  description: string | null;
  hasDescription: boolean;
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
              <button class="desc-regen-btn" data-slug="${escapeHtml(ref.slug)}" title="Regenerate">\u21BB</button>
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
