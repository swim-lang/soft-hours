# Soft Hours Review System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Vercel-ready static build and Supabase-backed review/comment flow for Soft Hours.

**Architecture:** Keep the current hand-coded static site. Add a small build script, Vercel config, review-target markers, a standalone review script/CSS layer, and a Supabase migration. Verify both static wiring and real comment persistence.

**Tech Stack:** Static HTML/CSS/JS, Node test scripts, Vercel CLI, Supabase CLI/REST.

---

### Task 1: Static Contract Tests

**Files:**
- Create: `package.json`
- Create: `scripts/review-system.test.mjs`

- [ ] Add `npm test` and `npm run test:review` commands.
- [ ] Write a Node test that checks HTML review targets, script order, review script constants, migration RLS, and no local-only save behavior.
- [ ] Run `npm test` and confirm it fails because review files and markers do not exist yet.

### Task 2: Review Layer Implementation

**Files:**
- Modify: `index.html`
- Modify: `shop.html`
- Modify: `product.html`
- Modify: `about.html`
- Modify: `styles.css`
- Create: `review.js`
- Create: `review-config.js`
- Create: `supabase/migrations/20260625_soft_hours_review_comments.sql`

- [ ] Add meaningful `data-review-id` values to each main page.
- [ ] Load `review-config.js` before `review.js` on each page.
- [ ] Add review toolbar, choice dialog, popover, panel, export, resolve, and save behavior adapted from Arc88.
- [ ] Add Soft Hours-specific review CSS.
- [ ] Add Supabase migration with RLS scoped to `soft-hours`.
- [ ] Run `npm test` and confirm the static contract passes.

### Task 3: Vercel Static Build

**Files:**
- Create: `scripts/build-static.mjs`
- Create: `vercel.json`
- Modify: `package.json`

- [ ] Add `npm run build`.
- [ ] Copy site files and assets into `public/`.
- [ ] Generate `public/review-config.js` from `SOFT_HOURS_REVIEW_SUPABASE_URL` and `SOFT_HOURS_REVIEW_SUPABASE_ANON_KEY`.
- [ ] Add `/review` rewrite and noindex headers in `vercel.json`.
- [ ] Run `npm run build`.

### Task 4: Provisioning And Persistence Verification

**Files:**
- Create or update: `.vercel/project.json` through Vercel CLI
- Create Supabase project/table through Supabase CLI/API

- [ ] Create or link a Vercel project for Soft Hours.
- [ ] Create a Supabase project named `Soft Hours Review`.
- [ ] Apply the migration.
- [ ] Add Vercel env vars for review Supabase URL and anon key.
- [ ] Deploy a Vercel preview.
- [ ] Run a browser save test against `/review?review=comment`: save comment, reload, confirm it remains visible, and confirm the REST row exists.
