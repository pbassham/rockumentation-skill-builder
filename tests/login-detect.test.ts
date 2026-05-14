import { test, expect, describe } from "bun:test";
import { looksLikeLoginPage } from "../src/fetch";

describe("looksLikeLoginPage", () => {
  test("detects a Rock login page (title + password input)", () => {
    const html = `
      <html>
        <head><title>Log In | Rock RMS</title></head>
        <body>
          <form action="/page/2" method="post">
            <input type="text" name="ctl00$main$tbUserName" />
            <input type="password" name="ctl00$main$tbPassword" />
            <button>Log In</button>
          </form>
        </body>
      </html>
    `;
    expect(looksLikeLoginPage(html)).toBe(true);
  });

  test("ignores a normal docs page that mentions login in copy", () => {
    const html = `
      <html>
        <head><title>Person Profile | Rockumentation</title></head>
        <body>
          <article>
            <h1>Person Profile</h1>
            <p>Users can log in to their profile to view giving history.</p>
          </article>
        </body>
      </html>
    `;
    expect(looksLikeLoginPage(html)).toBe(false);
  });

  test("ignores a docs page even if it has the word 'login' in the title", () => {
    const html = `
      <html>
        <head><title>Configuring Login Providers | Rockumentation</title></head>
        <body><article><h1>Configuring Login Providers</h1></article></body>
      </html>
    `;
    // No password input or login form action — shouldn't trigger.
    expect(looksLikeLoginPage(html)).toBe(false);
  });

  test("detects an Obsidian-rendered Rock login wall (no password input in raw HTML)", async () => {
    // Captured from https://rock.ccbcfamily.org/rockumentation/employee-resources
    // (private). The login form is mounted client-side via Obsidian/Vue, so
    // the raw HTML has NO `<input type="password">` — only the stock title
    // and a `returnurl=` form action.
    const html = await Bun.file(
      new URL("./fixtures/rock-login-obsidian.html", import.meta.url),
    ).text();
    expect(looksLikeLoginPage(html)).toBe(true);
  });
});
