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
  <h1>Rockumentation Skill Builder</h1>
  <p class="subtitle">Convert Rock RMS documentation into Agent Skills</p>

  <form id="build-form">
    <div class="form-group">
      <label for="url">Rockumentation URL</label>
      <input type="url" id="url" name="url" placeholder="https://community.rockrms.com/developer/developer-codex" required />
      <p class="hint">The root URL of the Rockumentation page you want to convert</p>
    </div>

    <div class="form-group">
      <label for="outputDir">Output Directory</label>
      <input type="text" id="outputDir" name="outputDir" value="./output" />
      <p class="hint">Relative or absolute path where the skill directory will be created</p>
    </div>

    <div class="form-group">
      <label for="customInstructions">Custom Instructions (optional)</label>
      <textarea id="customInstructions" name="customInstructions" placeholder="Add any custom instructions to include in the generated SKILL.md..."></textarea>
      <p class="hint">Extra context or instructions that will be appended to the skill's overview</p>
    </div>

    <div class="form-group">
      <label for="mergeThreshold">Merge Threshold (lines)</label>
      <input type="number" id="mergeThreshold" name="mergeThreshold" value="50" min="0" step="10" />
      <p class="hint">Merge leaf articles shorter than this many lines into their parent file. Set to 0 to disable merging.</p>
    </div>

    <details id="auth-section">
      <summary>Login for Private Docs</summary>
      <div class="auth-fields">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Your Rock RMS username" autocomplete="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Your Rock RMS password" autocomplete="current-password" />
        </div>
        <p class="hint">Credentials are sent directly to the Rock site and are never stored.</p>
      </div>
    </details>

    <details id="ai-section">
      <summary>AI Settings</summary>
      <div class="ai-fields">
        <div class="form-group">
          <label for="apiKey">Anthropic API Key</label>
          <input type="password" id="apiKey" name="apiKey" placeholder="sk-ant-..." autocomplete="off" />
          <p class="hint" id="api-key-hint">Checking...</p>
        </div>
      </div>
    </details>

    <button type="submit" id="submit-btn">Build Skill</button>
  </form>

  <div id="progress" class="progress" style="display:none"></div>
  <div id="result" style="display:none"></div>
  <div id="error" style="display:none"></div>
  <div id="split-panel" style="display:none"></div>
  <div id="descriptions" style="display:none"></div>
`;

const form = document.getElementById("build-form") as HTMLFormElement;
const progressDiv = document.getElementById("progress")!;
const resultDiv = document.getElementById("result")!;
const errorDiv = document.getElementById("error")!;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = (document.getElementById("url") as HTMLInputElement).value.trim();
  const outputDir = (
    document.getElementById("outputDir") as HTMLInputElement
  ).value.trim();
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
        <h3>Skill Generated</h3>
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
        <div class="result-actions">
          <button class="btn btn-sm" id="download-zip-btn">Download ZIP</button>
        </div>
      </div>
    `;

    document
      .getElementById("download-zip-btn")
      ?.addEventListener("click", () => {
        downloadZip(event.skillDir!);
      });

    loadCategories(event.skillDir);
    loadReferences(event.skillDir);
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
          <h3>Split Skill</h3>
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

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Check API key status on load
(async () => {
  try {
    const res = await fetch("/api/settings");
    const data = await res.json();
    const hint = document.getElementById("api-key-hint");
    if (hint) {
      if (data.hasApiKey) {
        hint.textContent = "\u2713 Key loaded from .env";
        hint.className = "hint ai-key-active";
      } else {
        hint.textContent =
          "Required for AI description generation. Set ANTHROPIC_API_KEY in .env or enter above.";
      }
    }
  } catch {}
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

  panel.style.display = "block";
  panel.innerHTML = `
    <div class="desc-panel">
      <div class="desc-header">
        <h3>Reference Descriptions</h3>
        <span class="desc-count">${withDesc} of ${refs.length} have AI descriptions</span>
      </div>
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

  const apiKeyInput = document.getElementById("apiKey") as HTMLInputElement;
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
