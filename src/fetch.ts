import { buildPrintUrl } from "./utils";

/**
 * Fetch a Rockumentation page in print mode, returning raw HTML.
 * Automatically appends the print query parameters to get all content on one page.
 */
export async function fetchPage(
  baseUrl: string,
  cookie?: string,
): Promise<string> {
  const printUrl = buildPrintUrl(baseUrl);
  console.log(`Fetching: ${printUrl}`);

  const headers: Record<string, string> = {
    "User-Agent":
      "RockumentationSkillBuilder/1.0 (https://github.com/rockumentation-skill-builder)",
  };
  if (cookie) {
    headers["Cookie"] = cookie;
  }

  const response = await fetch(printUrl, { headers });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${printUrl}: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  console.log(`Fetched ${(html.length / 1024).toFixed(1)} KB of HTML`);
  return html;
}

/**
 * Detect a Rock RMS / Rockumentation login wall. When credentials are
 * not supplied (or are wrong), Rock returns the login page with HTTP
 * 200 instead of 401 — so the only signal is the page content itself.
 *
 * Modern Rock themes render the login form via Obsidian (Vue) so the
 * server-rendered HTML often has NO `<input type="password">` — the
 * field is mounted client-side. We therefore lean on three strong
 * static markers, any one of which is enough:
 *
 *   1. Title is exactly "Log In | Rock RMS" (Rock's stock login page).
 *   2. A form whose action carries a `returnurl=` parameter (Rock's
 *      universal post-login redirect convention).
 *   3. A classic Rock WebForms login control (btnLogin / tbUserName /
 *      tbPassword / rock-login) or a `<input type="password">` field.
 */
export function looksLikeLoginPage(html: string): boolean {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch?.[1]?.trim() ?? "";

  if (/^Log\s*In\s*\|\s*Rock\s*RMS$/i.test(title)) return true;

  const hasReturnUrl = /\breturnurl=/i.test(html);
  const hasPasswordInput = /<input[^>]+type\s*=\s*["']?password["']?/i.test(
    html,
  );
  const hasRockLoginControl =
    /id\s*=\s*["'][^"']*(?:btnLogin|tbUserName|tbPassword|rock-login)/i.test(
      html,
    );
  const hasLoginFormAction =
    /<form[^>]+action\s*=\s*["'][^"']*(?:\/Login|\/Auth)/i.test(html);

  // For non-stock titles still demand a login-ish title to avoid false
  // positives (e.g. a docs page that happens to embed a login widget in
  // the chrome).
  const titleLooksLikeLogin = /\blog ?in\b/i.test(title);
  if (!titleLooksLikeLogin) return false;

  return (
    hasReturnUrl ||
    hasPasswordInput ||
    hasRockLoginControl ||
    hasLoginFormAction
  );
}
