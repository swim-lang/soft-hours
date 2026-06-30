# Soft Hours Review System Design

## Goal

Prepare Soft Hours for Vercel preview/production hosting and add an open, unlisted client review flow where the client can either browse the site normally or leave section-level revision comments that persist to Supabase.

## Decisions

- The review entrypoint is public but unlisted at `/review`.
- Vercel sends `X-Robots-Tag: noindex, nofollow, noarchive` for `/review`.
- The normal site stays plain static HTML/CSS/JS.
- The review layer is adapted from the Arc88 implementation: `data-review-id` section targets, a floating toolbar, a comment popover, a comments panel, export, and resolve actions.
- Comments are not stored locally and are not marked saved unless Supabase accepts the write.

## Architecture

The site remains a static build. A small build script copies the hand-coded pages and assets into `public/`, then writes `public/review-config.js` from environment variables. Each HTML page loads `review-config.js` before `review.js`.

The review script activates only when `/review` is requested, when a URL includes `?review=...`, or when the visitor has already chosen a review mode in the session. It writes comments through Supabase REST using the anon key and a dedicated `soft_hours_review_comments` table.

## Data Model

The Supabase table stores:

- `id`
- `project`
- `page`
- `path`
- `review_id`
- `selector`
- `text_quote`
- `comment`
- `status`
- `viewport`
- `created_at`
- `resolved_at`

Row level security allows anonymous reads, inserts, and status updates only for `project = 'soft-hours'`.

## Testing

- Static test verifies every page loads review scripts in the right order and exposes meaningful `data-review-id` targets.
- Static test verifies the review script uses the Soft Hours project slug/table/config, rejects local-only saves, and escapes rendered comment text.
- Static test verifies the Supabase migration creates the expected table and RLS policies.
- Build test verifies `npm run build` emits `public/review-config.js`.
- Browser/Supabase save verification will run against the local built site with real Supabase env vars: submit a comment, reload, confirm it appears, and verify the REST row exists.
