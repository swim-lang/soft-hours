# Soft Hours ecommerce teammate handoff

Last verified: September 28, 2026

## Start here

The current ecommerce source of truth is the `shopify-theme/` directory on the `codex/soft-hours-shopify` branch of `https://github.com/swim-lang/soft-hours.git`.

Do not begin in either Vercel project, the old Supabase review prototype, the root static HTML/CSS files, or either ChatGPT Sites project. Those are useful references only.

The public Shopify coming-soon site must stay live and untouched while ecommerce work continues in the unpublished client-review theme.

## Current verified state

| Item | Current value | Role |
| --- | --- | --- |
| Git repository | `https://github.com/swim-lang/soft-hours.git` | Canonical code repository |
| Active branch | `codex/soft-hours-shopify` | Current ecommerce implementation |
| Active code directory | `shopify-theme/` | Only directory to edit for current Shopify work |
| Verified handoff baseline | `f7a9764` | Product-media aspect-ratio fix; use the newer branch head if commits follow this handoff |
| Shopify store | `vnj0st-mm.myshopify.com` | Store receiving the unpublished theme |
| Live theme | `Coming Soon- Anchovies` — `187724038517` | Public holding site; do not edit, push to, or replace |
| Ecommerce review theme | `Soft Hours Ecommerce - Client Editor` — `187861107061` | Unpublished theme for current implementation and review |
| Public site | [softhours.rest](https://www.softhours.rest/) | Must continue showing the coming-soon site |
| Client preview | [Open unpublished Shopify preview](https://vnj0st-mm.myshopify.com/?preview_theme_id=187861107061) | Correct place to review current ecommerce behavior; Shopify may redirect to the primary domain while retaining the preview query |
| Theme editor | [Open Shopify theme editor](https://vnj0st-mm.myshopify.com/admin/themes/187861107061/editor) | Client/team content editing for the unpublished theme |

Checkout branding is partly Shopify-admin state rather than theme code. The current intended checkout palette is cream `#F2EBDD`, ink `#26241A`, and warm neutral `#E9E1D3`. Shopify/payment-provider controls may retain their own brand colors.

## Installation map

There are several real Soft Hours installations. Their roles are different.

| Surface | Location / identifier | What it is | Edit for current work? |
| --- | --- | --- | --- |
| Shopify ecommerce code | This repository, branch `codex/soft-hours-shopify`, directory `shopify-theme/` | The current functional store theme | **Yes** |
| Shopify client-review theme | Theme `187861107061` | Unpublished destination for approved code | **Yes, exact theme only** |
| Shopify coming-soon theme | Theme `187724038517` | Public holding page | **No** |
| Current Vercel review | [soft-hours-ecommerce-review.vercel.app](https://soft-hours-ecommerce-review.vercel.app/) / project `soft-hours-ecommerce-review` | Static Paper/design-review index | No; visual reference only |
| Old Vercel review | [soft-hours-eta.vercel.app](https://soft-hours-eta.vercel.app/) / project `soft-hours` | Historical coded review/comment prototype | No |
| Old review branch | `codex/soft-hours-review-system` | Historical Vercel/Supabase implementation | No; do not merge into current work |
| Supabase review project | `Soft Hours Review`, ref `msoqfpkcaszuciyllfdb` | Historical comments and editable prototype content | Read-only context unless a new task explicitly reactivates it |
| ChatGPT Sites design project | Project folder `soft-hours-ecommerce-design/` | Design/reference app | No |
| ChatGPT Sites research project | Project folder `soft-hours-commerce-research/` | Competitor research/report | No |
| Root static HTML/CSS in this repo | Root-level prototype files | Earlier visual source material | No |

The current Shopify theme contains no Supabase integration. Updating Supabase will not update the client’s current Shopify preview.

## Safe first-day setup

```bash
git clone https://github.com/swim-lang/soft-hours.git
cd soft-hours
git switch codex/soft-hours-shopify
git pull --ff-only origin codex/soft-hours-shopify
git status --short --branch
shopify theme list --store vnj0st-mm.myshopify.com
shopify theme check --path shopify-theme
```

Before changing anything, confirm all three of these:

1. Git reports branch `codex/soft-hours-shopify`.
2. The files being edited are under `shopify-theme/`.
3. Shopify lists theme `187861107061` as unpublished and `187724038517` as live.

Do not pull a Shopify theme over the local checkout as a first step. The Git branch is the code source of truth; Shopify also contains editor-managed content and settings that should be reviewed separately.

## New client-document intake

The next client revision document was described but was not attached to this handoff as of September 28, 2026. Do not infer its contents or start implementing presumed revisions.

When the document arrives:

1. Save the original document with its date and source clearly recorded. Do not overwrite it.
2. Read it alongside the current unpublished Shopify preview, not either Vercel site.
3. Create or update a decision register with one row per request:

| Field | What to capture |
| --- | --- |
| Client request | Faithful summary, retaining any important exact wording |
| Page / state | Homepage, collection, product, cart drawer, article, footer, mobile state, etc. |
| Change type | Copy, product data, image/asset, visual design, behavior, policy, or Shopify administration |
| Disposition | Straightforward, needs team judgment, needs client input, blocked by asset/data, or already complete |
| Existing implementation | Exact Liquid/CSS/JS file or Shopify-admin location |
| Conflict check | Whether it conflicts with an earlier approved decision or current operational fact |
| Verification | Desktop/mobile route and expected result |

4. Separate code changes from content/product-data changes and Shopify-admin configuration.
5. Implement the straightforward, non-conflicting items first. Escalate design changes, unsupported promises, and ambiguous product facts before coding them.
6. Keep temporary facts visibly editable. Do not hard-code unresolved policy or product claims into templates.

Useful existing context:

- `MARION_SEPTEMBER_20_DECISION_REGISTER.md` — decision register for Marion's September 20 “Website Take II” document (original saved in `client-feedback/2026-09-20-website-comments-ii/`).
- `MARION_AUGUST_27_FEEDBACK_AUDIT.md` — latest consolidated client-feedback audit currently in the repository.
- `CLIENT_CONTENT_EDITOR_GUIDE.md` — concise client-facing guide to editing the unpublished theme.
- `SHOPIFY_IMPLEMENTATION_HANDOFF.md` — deeper architecture and historical implementation notes.
- `PAPER_V2_PORT_PLAN.md` — historical design-port mapping.
- `/Users/seanashlow/.codex/.chatgpt-projects/g-p-6a6b6c826db88191b7a186bc22103e0e/soft-hours-ecommerce-working-context.md` — tentative product and operational inputs.
- `/Users/seanashlow/.codex/.chatgpt-projects/g-p-6a6b6c826db88191b7a186bc22103e0e/output/pdf/soft-hours-ecommerce-research.pdf` — competitor research used as decision support, not a replacement for Soft Hours’ voice.

## What is currently implemented

- Responsive homepage, Shop/collection, product pages, About, Journal index and article, search results, gift card, Size Guide, Contact, FAQ, generic pages, and 404.
- Header navigation centered on `Shop`, `Journal`, and `About`, with currency and Cart utilities.
- Text-based footer navigation and optional text social links.
- Three-column collection presentation on desktop and two-column presentation on mobile for the small launch collection.
- Product cards with primary/hover imagery.
- Product gallery with consistent 2:3 product-media framing, color and size selection, Size Guide modal, expandable product information, and related products.
- Cart drawer as the primary post-add route, including quantity, remove, subtotal, checkout, and full-cart fallback.
- Shopify-rendered accelerated checkout when the store/payment setup makes it eligible; wallet logos are not hard-coded.
- About-page clock treatment and reduced-motion behavior.
- Shopify editor-driven sections, menus, product data, blog content, policies, and footer content.

## Current product and content boundaries

Treat these as tentative or unresolved until the client’s new document or direct approval changes them:

- Five product families: Top/Camisole, Shorts, Shirt/Button Down, Trousers/Long Pants, and Slip Dress/Sleep Dress.
- XS–XL versus simplified S/M/L sizing.
- Garment measurements and fit guidance.
- Final color names and product/color imagery.
- Final fabric composition and care directions.
- Maker and production-location claims.
- Dispatch, fulfillment origin, shipping, duties, taxes, customs, returns, and exchanges.
- Journal launch content, support information, and social URLs.

Known exclusions remain: no eyewear, no Travel Pouch/custom packaging-pouch product, no unsupported production claims, no unapproved shipping promises, and no stale placeholder USD pricing.

## What still needs client or operational input

- Final product names and product-to-price mapping.
- Final size range, customer-facing size guide, and garment-specific measurements.
- Approved product images for every required product/color state, plus editorial imagery and video.
- Approved fabric, care, maker, and production facts.
- Inventory/preorder/Notify me behavior.
- Fulfillment origin, dispatch timing, shipping zones/rates, duties, taxes, customs, and returns/exchange policy.
- Journal articles, legal/support details, and final social URLs.
- Shopify Customer Privacy/cookie configuration and any market-specific consent requirements.

## Working and deployment rules

- Make focused changes in `shopify-theme/`; preserve unrelated edits.
- Keep client facts in Shopify product data, metafields, menus, pages, policies, and theme settings where practical.
- Keep expressive brand copy separate from conventional commerce controls.
- Check desktop and mobile together.
- Use `Cart`, `Add to Cart`, `Checkout`, `Size Guide`, `Delivery & Returns`, and similarly standard labels.
- Never use `shopify theme push --live` or publish a theme from the CLI.
- Never push to theme `187724038517`.
- Never deploy current ecommerce work to either Vercel project.
- Never treat Supabase comments/content as current without comparing dates and the new client document.
- Never merge `codex/soft-hours-review-system` into the active branch.
- Do not assume checkout appearance is fully represented in Git; verify relevant Shopify-admin settings.

After a reviewed code change, target only the unpublished theme:

```bash
shopify theme list --store vnj0st-mm.myshopify.com
shopify theme check --path shopify-theme
shopify theme push \
  --store vnj0st-mm.myshopify.com \
  --theme 187861107061 \
  --path shopify-theme
```

Then open the unpublished preview and verify the changed routes. Re-run `shopify theme list` afterward if there is any uncertainty about the target. Publishing remains a separate, approval-gated action.

## Minimum QA before handing work back

- `git diff --check` passes.
- `shopify theme check --path shopify-theme` passes or every warning is understood.
- Public [softhours.rest](https://www.softhours.rest/) still shows the coming-soon experience.
- The unpublished preview loads the correct logo, typefaces, navigation, and footer.
- Homepage, collection, product, About, Journal/article, cart drawer, and relevant support routes work on desktop and mobile.
- Product images retain a consistent 2:3 frame without unintended crop/shift between selections.
- Color and size selections persist into Cart.
- Add to Cart opens the drawer; quantity, remove, checkout, and full-cart fallback work.
- Size Guide stays in the purchase flow rather than navigating away.
- Currency/market UI remains readable on light and photographic backgrounds.
- No dead navigation/footer links, stale placeholders, pouch, eyewear, unsupported claims, or premature policy promises appear.
- No console errors, horizontal overflow, broken images, or inaccessible keyboard traps are introduced.
- Git commit is pushed to `origin/codex/soft-hours-shopify` and the final status is clean/synced.

## Ready-to-paste prompt for the teammate’s agent

> Work on the Soft Hours ecommerce site using `/Users/seanashlow/Documents/Codex/2026-08-14/soft-hours-shopify` or a fresh clone of `https://github.com/swim-lang/soft-hours.git`. Read `SOFT_HOURS_TEAMMATE_HANDOFF.md` completely before acting. Confirm branch `codex/soft-hours-shopify`, and edit only the active Shopify implementation under `shopify-theme/`. The live theme `Coming Soon- Anchovies` (`187724038517`) must remain untouched. The only permitted review deployment target is the unpublished theme `Soft Hours Ecommerce - Client Editor` (`187861107061`) on `vnj0st-mm.myshopify.com`; never publish or use `--live`. Treat both Vercel sites, the old Supabase review system, Paper/static exports, root prototype files, and ChatGPT Sites projects as reference only. First ingest the newly supplied client revision document into a decision register, compare it with the current unpublished Shopify preview and existing audit, separate straightforward changes from decisions/blocked inputs, then propose or implement only the authorized items. Verify desktop/mobile behavior, run theme checks, confirm the public coming-soon site is unchanged, and report exact files, theme target, tests, and remaining client inputs.
