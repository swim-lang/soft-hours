# Soft Hours — Marion September 20 Decision Register

Last updated: September 29, 2026

## Source

- Document: `Soft Hours Website Comments II` ("WEBSITE TAKE II")
- Author: Marion Voldan. Created September 19, 2026; last modified September 20, 2026 (file name `20092026_…`).
- Received from Kira Knoop on September 29, 2026 and saved unmodified at `client-feedback/2026-09-20-website-comments-ii/` with its 13 embedded screenshots (`image1.png` … `image13.png`).
- SHA-256: `373f9d65f4487caa7029e9390f399a5a6b2ecb45b936385c193ec956c5789881`
- Compared against unpublished theme `187861107061` at `382cdeb`, and against `MARION_AUGUST_27_FEEDBACK_AUDIT.md`.

Before this round, the Shopify copy of `templates/index.json` held editor changes that were not in Git: a hero image (`Kelly_Extract.jpg`), the story link label, and a proof image description. These were adopted into Git so the push does not overwrite them.

## Disposition key

- **Done** — implemented in `shopify-theme/` and pushed only to `187861107061`.
- **Team** — needs a team design/brand decision before code changes.
- **Client** — needs Marion's input.
- **Admin** — Shopify Admin configuration, not theme code.
- **Blocked** — waiting on assets or data.

## Register

| # | Page / state | Client request (summary) | Type | Disposition | Implementation | Conflict check |
|---|---|---|---|---|---|---|
| G1 | Sitewide | Cream tone makes imagery hard to work with; add a third, whiter tone | Visual design | **Done as an option / Team** | New Brand settings `Paper` colour (default `#FBF8F2`) and `Use paper tone on shop surfaces`. When enabled, it applies to the collection, product page, and Cart drawer. Off by default so the approved cream stays until Marion compares both in the editor. `config/settings_schema.json`, `layout/theme.liquid`, `assets/revisions-ii.css` | Does not replace the approved cream palette. Checkout palette (Admin) is unchanged. |
| G2 | Sitewide | More refinement; check functionality and accessibility | QA | **Done (this round)** | Keyboard reachability, focus, labels, and 44px targets checked on new controls | — |
| H1 | Homepage, cookie banner | Make the banner much more subtle: brand colour, small bar, minimal copy, "Learn more" (Paynter reference) | Shopify administration | **Admin / Team** | Shopify's native Customer Privacy banner is store-level (Settings → Customer privacy → Cookie banner). Changing its position, colour, or copy also changes the live coming-soon storefront. | Aug 27 decision: use the native banner, no theme-only substitute, and defer store-level changes until launch configuration is approved. Needs a team call: accept the live-site change, or approve a theme-rendered banner that uses the Customer Privacy API. |
| H2 | Homepage hero | Hero must accommodate video | Behaviour | **Done** | `sections/home-hero.liquid`: new `Hero video` (Shopify-hosted) setting. The image stays as poster/fallback. Video is muted, loops, plays inline, and does not autoplay under reduced motion. | — |
| H3 | Homepage, Collection I | The "Collection I" heading should link to the shop | Behaviour | **Done** | `sections/featured-collection.liquid`: heading links to the selected collection | — |
| H4 | Homepage product cards | Add favourite, quick add, and image swiping with arrows | Behaviour | **Done** | Homepage now renders the shared `snippets/product-card.liquid` | Aug 27 homepage carousel question stays open. Marion asked for image arrows, not a product carousel. |
| H5 | Homepage product cards | Price below the title, not to the right | Visual design | **Done** | Shared card: title row (title + heart), price on the line below | — |
| N1 | Header, Shop | Shop needs to support a future menu Marion can build out | Behaviour + Admin | **Done (code) / Admin** | `sections/header.liquid`: nested links in the assigned primary menu render as a Shop dropdown on desktop (hover, focus, click, Escape) and an expandable group in the mobile menu. Marion builds it in Content → Menus and selects it under Header → Primary menu. | The fallback (no menu assigned) stays Shop / Journal / About |
| N2 | Header, currency | Selector only shows "United Kingdom — CHF" | Shopify administration | **Admin / Client** | The storefront currently exposes one country. Countries and currencies come from Settings → Markets. The CHF-for-UK pairing suggests the market's currency or country list needs review. The theme lists whatever Markets makes available. | — |
| C1 | Cart drawer | Overall clunky: too big, no clear hierarchy | Visual design | **Done** | `snippets/cart-drawer.liquid`, `assets/revisions-ii.css`: smaller label-scale header, single-line title, price under title, compact option line, lighter quantity control | — |
| C2 | Add to Cart | Drawer should slide in when adding (currently it appears instantly) | Behaviour bug | **Done** | `assets/theme.js`: the drawer was replaced and opened in the same frame, which skipped the transition. It now opens after a reflow, and an already-open drawer stays open while quantities change. | — |
| C3 | Cart drawer header | "Cart (1)" is too big | Visual design | **Done** | Header is now a 13px uppercase label: `Cart (1)` | — |
| C4 | Cart drawer, express checkout | PayPal too prominent; also need Apple Pay — is it automatic? | Visual design + Admin | **Done (placement) / Admin** | Black Checkout comes first; Shopify's express buttons move below it at 40px under a small "or pay with" label. Wallets are still rendered by Shopify, not hard-coded. Apple Pay appears automatically only when Shopify Payments has Apple Pay enabled (Settings → Payments) and the shopper is on a supported Apple device or browser. | Keeps the rule not to hard-code wallet buttons |
| C5 | Cart drawer, sizes | Use "S" etc. throughout | Copy/data | **Done (display) / Admin (recommended)** | New `snippets/size-label.liquid` abbreviates sizes on cards, Cart drawer, Cart page, and product page. Recommended cleanup: rename the variant values to S/M/L in Products so checkout and emails match too. | — |
| C6 | Cart drawer, Checkout | Checkout button in black | Visual design | **Done** | `prototype-button--dark` | — |
| C7 | Cart drawer, line title | Title too big; should not force a line break | Visual design | **Done** | 15px label type on one line with ellipsis | — |
| C8 | Cart drawer, line price | Move price under the title to leave white space top right | Visual design | **Done** | Price under title; colour and size on one quiet line (`Oat Milk · S`) | — |
| C9 | Header / Cart | Opinion on writing "Cart" vs an icon | Team decision | **Done as an option / Team** | New setting Header → `Cart display`: Text (current) or Icon. The icon shows a count and keeps an accessible label ("Cart, 1 item"). **Recommendation:** the icon, for the reasons Marion gives (familiar, calmer, better on photography), with the text label kept for screen readers. Default left on Text pending sign-off. | — |
| P1 | Collection / product cards | Too much info; sizes and quick add only on hover (Odd Muse / Olivia von Halle) | Behaviour + visual | **Done** | Card shows image, title, heart, and price. On hover or keyboard focus, a size bar appears over the bottom of the image; choosing a size adds it to Cart and slides in the drawer. On touch screens, a small `+` on the image opens the same bar, so sizes stay reachable without hover. Colour selector and colour line removed from cards. | Aug 27 note said sizes must stay accessible on mobile. Kept via the touch `+` and keyboard focus. |
| P2 | Collection grid | Images too big; minimum 4 per row | Visual design | **Done** | 4 columns at ≥1100px, 3 at 761–1099px, 2 on mobile | Replaces the earlier 3-column launch presentation, as Marion's newer direction supersedes it |
| P3 | Product cards | Heart where the price was, no circle | Visual design | **Done** | Heart sits right of the title, borderless | — |
| P4 | Product cards, sold out | Clicking an unavailable size opens a "Notify me when available" popup (Odd Muse flow) | Behaviour + Admin | **Done (UI) / Admin** | Sold-out sizes stay selectable and open a Notify me dialog (`snippets/notify-dialog.liquid`). It posts a Shopify customer tagged `notify-me`, the product handle, and the variant. **Admin/ops:** Shopify does not email these customers automatically. A back-in-stock app or a manual process is needed before launch. | Same capture mechanism already approved on the product page |
| P5 | Collection grid | Allow campaign images inside the product grid | Behaviour | **Done** | `main-collection-product-grid.liquid`: new `Campaign tile` block (image or video, heading, link label, link, position after product N, 1 or 2 columns wide), added in the theme editor | — |
| P6 | Product cards, arrows | Minimal arrows at vertical centre, no background (Bottega Veneta) | Visual design | **Done** | Thin chevrons at left/right centre; appear on hover or focus, always visible on touch. They now cycle through every product image (up to 6), not just two. | — |
| P7 | Collection filter | Multi-select, no dropdowns, visible options (size buttons or tick boxes), show result count | Behaviour | **Done** | Filter drawer: Size as multi-select buttons, Colour as tick boxes with per-option counts, active-filter chips, Clear all, and `Show results (N)`. Colours are now built from product data instead of a hard-coded list. | — |
| P8 | Collection sort | Much more subtle, no big box; remove the date options | Visual design | **Done** | Plain text `Sort: Featured ⌄`, no border; date sorts removed | — |
| P9 | Product cards | "The colour I will do per product, so no need to have the colour selector" | Product data | **Client** | Selector removed from cards. It is unclear whether Marion means (a) each colour becomes its own product/card, or (b) she will choose which colour each card represents. The Aug 27 decision was to keep colours as variants. Cards currently quick-add the product's default colour. **Needs confirmation.** | Possible conflict with Aug 27 decision "Keep colours as variants, not duplicate product cards" |
| F1 | Footer / Size Guide | Is a separate Size Guide page needed, or only the product-page flow? | Team/Client | **Client** | **Recommendation:** keep the product-page drawer as the main route, and keep the page as an unlinked customer-service URL (useful for emails and Contact replies). The footer link can be removed in Content → Menus → Soft Hours Footer. No code change. | — |
| F2 | Footer bottom bar | Are "Time well kept" and "Privacy" needed? Otherwise remove | Visual design | **Done** | Bottom bar is now just `© Soft Hours · MMXXVI`. Privacy remains in the Help column (it was duplicated). | — |
| F3 | Size Guide, Contact | Some type is tiny and barely readable; set a clearer hierarchy | Visual design | **Done** | Support pages: 12px eyebrows, 15/24 body, 13px labels, headings reduced from 132px to 64px maximum; Contact inputs use body type | — |
| A1 | About, Founder Note | Text formatting is odd | Visual design | **Done** | Removed `pre-wrap`, added paragraph spacing, a comfortable measure, and a separated signature | — |
| A2 | About, Founder image | More white space and more intentional placement; allow video | Visual design + behaviour | **Done** | Image column narrowed, inset from the page edge with a 4:5 frame, aligned to the text. New `Founder video` setting (image becomes the poster). | — |

## Still needed from Marion or Shopify Admin

1. **Cookie banner (H1):** decide whether to style the native banner store-wide now (this affects the live coming-soon site) or approve a theme-rendered banner for the ecommerce theme only.
2. **Markets (N2):** confirm launch countries and currencies in Settings → Markets.
3. **Apple Pay (C4):** enable it in Settings → Payments → Shopify Payments → Wallets, if Shopify Payments is the processor.
4. **Colour-per-product meaning (P9).**
5. **Back-in-stock notifications (P4):** choose an app or a manual process.
6. **Menus (N1, F1):** build the Shop submenu in Content → Menus and assign it in Header, then decide on the footer Size Guide link.
7. **Paper tone (G1) and cart icon (C9):** compare in the theme editor and confirm.
8. **Media:** products currently have no uploaded images, so cards use theme fallback photography. Hero and founder videos need Shopify-hosted uploads.

## Verification — September 29, 2026

- `git diff --check` passes. Shopify Theme Check: 61 files, no offenses.
- Pushed with `shopify theme push --theme 187861107061 --nodelete` only. `theme list` afterwards: `Coming Soon- Anchovies` (`187724038517`) is live, and `Soft Hours Ecommerce - Client Editor` (`187861107061`) is unpublished. A cookie-less request to softhours.rest still returns the coming-soon theme.
- Desktop 1440px:
  - Homepage cards show title + heart, with the price below.
  - The Collection I heading links to `/collections/collection-i`.
  - Hover reveals Quick add sizes. Clicking M added The Slip / Pine Grove / M, and the drawer slid in (`transitionrun` observed on open, none on quantity change while open).
  - Collection is 4 columns. Sort has no date options.
  - Filter: size M plus Oat Milk showed chips, per-option counts, `Filter (2)`, and `Show results (5)`.
  - Notify me dialog opens with product/variant tags. It was tested by marking one size sold out in the browser only; no live variant is sold out.
  - Founder note has no `pre-wrap`, and its media column is 484px wide.
  - Size Guide and Contact: smallest text is 12px.
  - Footer bar reads `© Soft Hours · MMXXVI`.
  - PDP: size buttons show S/M/L. The selected label reads `L`. Oat Milk / L carried into Cart. Size Guide opens in place.
- Mobile 375px: 2 columns, no horizontal overflow. The `+` toggle opens quick add and focuses the first size. Quick add opened the full-width drawer, and titles do not wrap.
- Wallet buttons: PayPal renders at 40px below Checkout on page load. Shopify's Section Rendering API returns the wallet area empty after AJAX cart updates, so the `or pay with` label hides until the next page load. Moving hydrated buttons duplicated them, so that approach was reverted.
- Console: the only failed requests are Shopify's `sf_private_access_tokens` (401) and one platform 404; no theme errors.
- The test cart was emptied afterwards (`/cart/clear.js`, this browser session only).
- Not exercised: a real sold-out variant, nested menu rendering (no nested primary menu is assigned yet), the cart icon option, the paper tone, and hero/founder/campaign video uploads. These depend on editor or admin content, and each has a safe default.
- September 29 follow-up (Kira): the collection `Filter` control read as plain text. It is now an outlined button with a filter icon (ink fill on hover, only on devices that support hover). Sort stays on the same row on mobile. Drawer triggers now reset `aria-expanded` when a drawer closes. Verified at 1440px and 375px.
- September 29 follow-up (Kira): the footer wordmark was near-white (`#FFF9EB`, plus a `brightness(1.05)` filter). It now uses brand cream `#F2EBDD`, matching the footer links, and the filter is removed. The SVG is referenced with a version query, because Shopify's CDN kept serving the unversioned file. Verified in the preview.
