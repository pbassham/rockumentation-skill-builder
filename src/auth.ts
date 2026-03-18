import { getBaseOrigin } from "./utils";

/**
 * Log in to a Rock RMS instance and return the auth cookie.
 * Uses the standard Rock REST API endpoint: POST /api/Auth/Login
 */
export async function rockLogin(
  siteUrl: string,
  username: string,
  password: string,
): Promise<string> {
  const origin = getBaseOrigin(siteUrl);
  const loginUrl = `${origin}/api/Auth/Login`;

  const response = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Username: username, Password: password }),
    redirect: "manual",
  });

  if (!response.ok && response.status !== 204) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid username or password");
    }
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }

  // Extract the .ASPXAUTH cookie from Set-Cookie headers
  const setCookie = response.headers.getSetCookie?.() ?? [];
  const authCookie = setCookie
    .map((c) => c.split(";")[0]!)
    .find((c) => c.startsWith(".ROCK="));

  if (!authCookie) {
    throw new Error(
      "Login succeeded but no auth cookie returned. The site may use a different auth method.",
    );
  }

  return authCookie;
}
