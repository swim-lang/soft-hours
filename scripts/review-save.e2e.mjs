import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const supabaseUrl = (process.env.SOFT_HOURS_REVIEW_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseAnonKey = process.env.SOFT_HOURS_REVIEW_SUPABASE_ANON_KEY || "";
const reviewBaseUrl = (process.env.REVIEW_BASE_URL || "").replace(/\/$/, "");

assert.ok(supabaseUrl, "SOFT_HOURS_REVIEW_SUPABASE_URL is required");
assert.ok(supabaseAnonKey, "SOFT_HOURS_REVIEW_SUPABASE_ANON_KEY is required");

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const serveFile = async (request, response) => {
  const url = new URL(request.url || "/", "http://127.0.0.1");
  const pathname = url.pathname === "/review" ? "/index.html" : url.pathname;
  const relativePath = normalize(pathname.replace(/^\/+/, "") || "index.html");

  if (relativePath.startsWith("..")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const filePath = join(process.cwd(), "public", relativePath);
    const body = await readFile(filePath);
    const headers = { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" };
    if (url.pathname === "/review") {
      headers["X-Robots-Tag"] = "noindex, nofollow, noarchive";
    }
    response.writeHead(200, headers);
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
};

let server;
let baseUrl = reviewBaseUrl;

if (!baseUrl) {
  server = createServer(serveFile);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
}

const uniqueComment = `Soft Hours e2e save ${new Date().toISOString()}`;
let browser;

const fetchRows = async () => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/soft_hours_review_comments?project=eq.soft-hours&comment=eq.${encodeURIComponent(uniqueComment)}&select=*`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

try {
  const reviewResponse = await fetch(`${baseUrl}/review`);
  assert.equal(reviewResponse.ok, true, "/review loads");
  assert.match(reviewResponse.headers.get("x-robots-tag") || "", /noindex/, "/review is noindexed");

  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${baseUrl}/review?review=comment`, { waitUntil: "networkidle" });
  await page.locator(".review-toolbar").waitFor();
  await page.locator('[data-review-id="home-intro"]').click({ position: { x: 40, y: 40 } });
  await page.locator("[data-review-draft]").fill(uniqueComment);
  await page.getByRole("button", { name: "Save to Supabase" }).click();
  await page.getByText("Comment saved to Supabase.").waitFor();
  await page.getByText(uniqueComment).waitFor();

  await page.reload({ waitUntil: "networkidle" });
  await page.locator(".review-toolbar").waitFor();
  await page.getByRole("button", { name: /Comments/ }).click();
  await page.getByText(uniqueComment).waitFor();

  const rows = await fetchRows();
  assert.equal(rows.length, 1, "saved review comment exists in Supabase");

  const patchResponse = await fetch(
    `${supabaseUrl}/rest/v1/soft_hours_review_comments?id=eq.${encodeURIComponent(rows[0].id)}&project=eq.soft-hours`,
    {
      method: "PATCH",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status: "resolved", resolved_at: new Date().toISOString() }),
    },
  );
  if (!patchResponse.ok) {
    throw new Error(await patchResponse.text());
  }
} finally {
  if (browser) {
    await browser.close();
  }
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
}
