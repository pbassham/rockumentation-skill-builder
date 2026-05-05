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
