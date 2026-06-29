import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const pages = [
  { file: "index.html", minTargets: 8 },
  { file: "shop.html", minTargets: 4 },
  { file: "product.html", minTargets: 6 },
  { file: "about.html", minTargets: 7 },
];

for (const { file, minTargets } of pages) {
  const html = readFileSync(file, "utf8");
  assert.match(
    html,
    /<script src="review-config\.js"><\/script>\s*<script src="review\.js(?:\?v=[^"]+)?" defer><\/script>/,
    `${file} loads review-config.js before deferred review.js`,
  );

  const reviewTargetCount = (html.match(/data-review-id=/g) || []).length;
  assert.ok(
    reviewTargetCount >= minTargets,
    `${file} has at least ${minTargets} meaningful review targets`,
  );
}

assert.ok(existsSync("review-config.js"), "local review-config.js exists");
assert.ok(existsSync("review.js"), "review.js exists");

const reviewScript = readFileSync("review.js", "utf8");
assert.match(reviewScript, /const REVIEW_PROJECT = "soft-hours"/, "review layer uses Soft Hours project slug");
assert.match(reviewScript, /const REVIEW_TABLE = "soft_hours_review_comments"/, "review layer uses a dedicated Soft Hours table");
assert.match(reviewScript, /window\.SOFT_HOURS_REVIEW_CONFIG/, "review layer reads Soft Hours Supabase config");
assert.match(reviewScript, /escapeHtml/, "review layer escapes comment text before rendering");
assert.match(reviewScript, /closest\("button\[data-review-mode\]"\)/, "review mode clicks are scoped to toolbar buttons");
assert.doesNotMatch(reviewScript, /saved locally|localStorage|REVIEW_COMMENTS_KEY/, "review layer does not pretend local-only comments are saved");

const css = readFileSync("styles.css", "utf8");
assert.match(css, /\.review-layer/, "review layer CSS exists");
assert.match(css, /html\[data-review-mode="comment"\] \[data-review-id\]/, "comment mode highlights review targets");
assert.match(css, /--review-font:\s*Helvetica,\s*Arial,\s*sans-serif/, "review layer defines a Helvetica font stack");
assert.match(css, /\.review-popover textarea[\s\S]*font:\s*15px\/22px var\(--review-font\)/, "review textarea uses the Helvetica review font");

const migrationPath = "supabase/migrations/20260625_soft_hours_review_comments.sql";
assert.ok(existsSync(migrationPath), "Supabase migration exists");
const migration = readFileSync(migrationPath, "utf8");
assert.match(migration, /create table if not exists soft_hours_review_comments/, "migration creates dedicated Soft Hours table");
assert.match(migration, /project = 'soft-hours'/, "migration policies are scoped to Soft Hours");
assert.match(migration, /enable row level security/i, "migration enables RLS");
assert.match(migration, /for insert\s+to anon/is, "migration allows anon inserts through RLS");
