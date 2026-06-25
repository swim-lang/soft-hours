import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = "public";
const files = [
  "index.html",
  "shop.html",
  "product.html",
  "about.html",
  "styles.css",
  "review.js",
];
const directories = ["assets"];

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of files) {
  if (existsSync(file)) {
    cpSync(file, join(outputDirectory, file));
  }
}

for (const directory of directories) {
  if (existsSync(directory)) {
    cpSync(directory, join(outputDirectory, directory), { recursive: true });
  }
}

const reviewConfig = {
  supabaseUrl: process.env.SOFT_HOURS_REVIEW_SUPABASE_URL || "",
  supabaseAnonKey: process.env.SOFT_HOURS_REVIEW_SUPABASE_ANON_KEY || "",
};

writeFileSync(
  join(outputDirectory, "review-config.js"),
  `window.SOFT_HOURS_REVIEW_CONFIG = ${JSON.stringify(reviewConfig, null, 2)};\n`,
);
