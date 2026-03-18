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

    <button type="submit" id="submit-btn">Build Skill</button>
  </form>

  <div id="progress" class="progress" style="display:none"></div>
  <div id="result" style="display:none"></div>
  <div id="error" style="display:none"></div>
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
      </div>
    `;
  }
}

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
