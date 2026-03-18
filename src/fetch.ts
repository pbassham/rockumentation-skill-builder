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
