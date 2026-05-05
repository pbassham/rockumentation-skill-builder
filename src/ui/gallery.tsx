/// <reference lib="dom" />

interface SkillMeta {
  id: string;
  skillName: string;
  pageTitle: string;
  sourceUrl: string;
  articleCount: number;
  refCount: number;
  createdAt: string;
}

const root = document.getElementById("gallery")!;

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function render(state: {
  loading?: boolean;
  enabled?: boolean;
  error?: string;
  skills?: SkillMeta[];
}) {
  let body = "";

  if (state.loading) {
    body = `<p class="hint">Loading...</p>`;
  } else if (state.error) {
    body = `<div class="error-banner">${escapeHtml(state.error)}</div>`;
  } else if (!state.enabled) {
    body = `<p class="hint">Public sharing is not configured on this server.</p>`;
  } else if (!state.skills || state.skills.length === 0) {
    body = `
      <p class="hint">
        No shared skills yet. Build one with the
        <strong>Share publicly in gallery</strong> option enabled and it'll
        show up here.
      </p>
    `;
  } else {
    body = `
      <div class="gallery-list">
        ${state.skills
          .map(
            (s) => `
          <article class="gallery-card">
            <a href="/g/${encodeURIComponent(s.id)}" class="gallery-card-title">${escapeHtml(s.pageTitle)}</a>
            <p class="gallery-card-skill"><code>${escapeHtml(s.skillName)}</code></p>
            <dl class="gallery-card-meta">
              <div>
                <dt>Articles</dt>
                <dd>${s.articleCount} <span class="meta-dim">(${s.refCount} refs)</span></dd>
              </div>
              <div>
                <dt>Shared</dt>
                <dd>${escapeHtml(formatDate(s.createdAt))}</dd>
              </div>
              ${
                s.sourceUrl
                  ? `<div class="gallery-card-source">
                      <dt>Source</dt>
                      <dd><a href="${escapeHtml(s.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(
                        s.sourceUrl.replace(/^https?:\/\//, ""),
                      )}</a></dd>
                    </div>`
                  : ""
              }
            </dl>
            <div class="gallery-card-actions">
              <a class="btn btn-sm" href="/g/${encodeURIComponent(s.id)}">View</a>
              <a class="btn btn-sm btn-secondary" href="/s/${encodeURIComponent(s.id)}">Download ZIP</a>
            </div>
          </article>`,
          )
          .join("")}
      </div>
    `;
  }

  root.innerHTML = `
    <header class="page-header">
      <div class="page-brand">
        <h1>Skill Gallery</h1>
        <p class="subtitle">Publicly shared Agent Skills built from Rock RMS docs</p>
      </div>
      <nav class="page-nav">
        <a href="/">\u2190 Build a Skill</a>
        <a class="icon-link" href="https://github.com/pbassham/rockumentation-skill-builder" target="_blank" rel="noopener" aria-label="View source on GitHub" title="View source on GitHub">
          <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
      </nav>
    </header>
    ${body}
  `;
}

async function load() {
  render({ loading: true });
  try {
    const res = await fetch("/api/public-skills");
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    render({ enabled: data.enabled, skills: data.skills });
  } catch (err: any) {
    render({ error: err.message || "Failed to load gallery" });
  }
}

load();
