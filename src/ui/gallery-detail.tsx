/// <reference lib="dom" />

import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

marked.setOptions({
  gfm: true,
  breaks: false,
});

// Highlight code blocks after rendering.
function highlightAll(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>("pre code").forEach((el) => {
    try {
      hljs.highlightElement(el);
    } catch {}
  });
}

interface SkillMeta {
  id: string;
  skillName: string;
  pageTitle: string;
  sourceUrl: string;
  articleCount: number;
  refCount: number;
  createdAt: string;
}

interface DetailResponse {
  meta: SkillMeta;
  files: string[];
}

const root = document.getElementById("detail")!;

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function getId(): string | null {
  const m = window.location.pathname.match(/^\/g\/([^/]+)/);
  return m ? decodeURIComponent(m[1]!) : null;
}

let currentFile: string | null = null;
let currentData: DetailResponse | null = null;

function renderShell(error?: string) {
  if (error) {
    root.innerHTML = `
      <header class="page-header">
        <div class="page-brand">
          <h1>Skill Detail</h1>
        </div>
        <nav class="page-nav">
          <a href="/gallery">\u2190 Back to gallery</a>
        </nav>
      </header>
      <div class="error-banner">${escapeHtml(error)}</div>
    `;
    return;
  }
  root.innerHTML = `
    <header class="page-header">
      <div class="page-brand">
        <h1 id="detail-title">Loading...</h1>
        <p class="subtitle" id="detail-subtitle"></p>
      </div>
      <nav class="page-nav">
        <a href="/gallery">\u2190 Back to gallery</a>
      </nav>
    </header>
    <div class="card" id="detail-meta" style="display:none"></div>
    <div class="detail-layout">
      <aside class="detail-sidebar">
        <h3>Files</h3>
        <ul id="file-list" class="file-list"></ul>
      </aside>
      <main class="detail-main">
        <div class="file-toolbar">
          <span id="file-current" class="file-current"></span>
        </div>
        <pre id="file-content" class="file-content">Select a file to view its contents.</pre>
        <article id="file-rendered" class="file-rendered markdown-body" style="display:none"></article>
      </main>
    </div>
  `;
}

function renderMeta(meta: SkillMeta) {
  const titleEl = document.getElementById("detail-title")!;
  const subEl = document.getElementById("detail-subtitle")!;
  const metaEl = document.getElementById("detail-meta")!;
  titleEl.textContent = meta.pageTitle;
  subEl.innerHTML = `Skill: <code>${escapeHtml(meta.skillName)}</code>`;
  metaEl.style.display = "block";
  const created = (() => {
    try {
      return new Date(meta.createdAt).toLocaleString();
    } catch {
      return meta.createdAt;
    }
  })();
  metaEl.innerHTML = `
    ${
      meta.sourceUrl
        ? `<div class="result-row">
      <span class="result-label">Source</span>
      <span class="result-value"><a href="${escapeHtml(meta.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(meta.sourceUrl)}</a></span>
    </div>`
        : ""
    }
    <div class="result-row">
      <span class="result-label">Articles</span>
      <span class="result-value">${meta.articleCount} (${meta.refCount} references)</span>
    </div>
    <div class="result-row">
      <span class="result-label">Shared</span>
      <span class="result-value">${escapeHtml(created)}</span>
    </div>
    <div class="result-actions">
      <a class="btn btn-sm" href="/s/${encodeURIComponent(meta.id)}">Download ZIP</a>
    </div>
  `;
}

function renderFileList(files: string[]) {
  const ul = document.getElementById("file-list")!;
  // Sort: SKILL.md first, then references alphabetically.
  const sorted = files.slice().sort((a, b) => {
    if (a === "SKILL.md") return -1;
    if (b === "SKILL.md") return 1;
    return a.localeCompare(b);
  });
  ul.innerHTML = sorted
    .map(
      (f) => `
      <li>
        <button class="file-item" data-path="${escapeHtml(f)}">${escapeHtml(f)}</button>
      </li>`,
    )
    .join("");
  ul.querySelectorAll<HTMLButtonElement>(".file-item").forEach((btn) => {
    btn.addEventListener("click", () => loadFile(btn.dataset.path!));
  });
}

async function loadFile(path: string) {
  if (!currentData) return;
  currentFile = path;
  document
    .querySelectorAll<HTMLButtonElement>(".file-item")
    .forEach((b) =>
      b.classList.toggle("file-item-active", b.dataset.path === path),
    );
  const currentEl = document.getElementById("file-current")!;
  const contentEl = document.getElementById("file-content")!;
  const renderedEl = document.getElementById("file-rendered")!;
  currentEl.textContent = path;
  contentEl.style.display = "block";
  renderedEl.style.display = "none";
  contentEl.textContent = "Loading...";
  try {
    const res = await fetch(
      `/api/public-skill/${encodeURIComponent(currentData.meta.id)}/file?path=${encodeURIComponent(path)}`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (path.endsWith(".md")) {
      // Strip YAML frontmatter for cleaner display.
      const stripped = text.replace(/^---\n[\s\S]*?\n---\n*/, "");
      const html = await marked.parse(stripped);
      renderedEl.innerHTML = html;
      renderedEl.style.display = "block";
      contentEl.style.display = "none";
      highlightAll(renderedEl);
    } else {
      contentEl.textContent = text;
    }
  } catch (err: any) {
    contentEl.style.display = "block";
    renderedEl.style.display = "none";
    contentEl.textContent = `Failed to load: ${err.message || err}`;
  }
}

async function load() {
  const id = getId();
  if (!id) {
    renderShell("Invalid URL — no skill id.");
    return;
  }
  renderShell();
  try {
    const res = await fetch(`/api/public-skill/${encodeURIComponent(id)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data: DetailResponse = await res.json();
    currentData = data;
    renderMeta(data.meta);
    renderFileList(data.files);
    if (data.files.includes("SKILL.md")) {
      await loadFile("SKILL.md");
    }
  } catch (err: any) {
    renderShell(err.message || "Failed to load skill");
  }
}

load();
