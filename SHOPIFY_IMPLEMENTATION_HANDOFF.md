# Soft Hours Shopify implementation handoff

Status: approved Paper direction implemented as a local Shopify theme; authenticated unpublished-theme upload and store-data QA remain. Do not publish or replace the live coming-soon site.

## Source of truth

- Paper file: [Soft Hours Homepage — Ecommerce V2](https://app.paper.design/file/01KSQJRVQRH3PFPCCTXWKB2R1D/3-1)
- Paper page: `Soft Hours — Ecommerce V2`
- Code baseline: `origin/main` at `bac7959`
- Isolated implementation branch: `codex/soft-hours-shopify`
- Isolated worktree: `/Users/seanashlow/Documents/Codex/2026-08-14/soft-hours-shopify`
- Client working facts: `/Users/seanashlow/.codex/.chatgpt-projects/g-p-6a6b6c826db88191b7a186bc22103e0e/soft-hours-ecommerce-working-context.md`

The original Paper artboards and the live Shopify coming-soon theme remain untouched.

## Design boundary

This is a selective ecommerce revision of the existing Soft Hours website, not a new visual direction.

Preserve:

- PP Watch display typography and Courier-led functional typography.
- Warm cream, near-black, and restrained neutral palette.
- Existing photography and editorial image pacing.
- “Time Well Kept,” the emotional premise, founder narrative, and quiet brand tone.
- The established navigation character and oversized Soft Hours footer treatment.
- The coded About-page clock motif, including its reduced-motion behavior.
- The current responsive rhythm unless a commerce control requires a specific adjustment.

Change only where the current prototype is inaccurate, unsupported, nonfunctional, or missing a required commerce state.

## Current static-site audit

The repository is a static HTML/CSS prototype:

| Current file | Current purpose | Shopify destination |
| --- | --- | --- |
| `index.html` | Homepage | `templates/index.json` with reusable sections |
| `shop.html` | Collection I | `templates/collection.json` and collection product grid section |
| `product.html` | Product detail | `templates/product.json` and product information/gallery sections |
| `about.html` | About | `templates/page.about.json` with editorial sections |
| `styles.css` | Shared visual system | Theme CSS split only where maintainability requires it |
| `nav.js` | Mobile menu | Theme navigation script plus accessibility states |

The static prototype currently contains outdated labels, products, prices, unsupported claims, and dead links. Those values must not be copied into Shopify data.

## Paper screen inventory

Existing screens selectively revised in Paper:

- Homepage — desktop.
- Collection I — desktop and mobile.
- Product — desktop and mobile.
- About — desktop and mobile.

Functional screens added in the same system:

- Cart drawer.
- Full Cart page — desktop and mobile.
- Search — desktop and mobile.
- Account entry — desktop and mobile.
- Commerce states: empty Cart, Notify me, size validation, adding to Cart, no search results, and recoverable error.

## Shopify theme architecture

Use Shopify-native data and behavior wherever practical:

- Product variants for color and size.
- Shopify Markets for EUR, CHF, and GBP pricing.
- Predictive Search for the search overlay and results.
- Native customer accounts for passwordless account entry.
- Shopify blog and article templates for Journal.
- Native gift-card product.
- Ajax Cart drawer with full Cart fallback.
- The Cart drawer is the primary post-add and pre-checkout surface. Item edits, quantity, removal, subtotal, standard Checkout, and eligible accelerated checkout options remain available without a required visit to the full Cart page.
- Render cart-level accelerated options with Shopify's `additional_checkout_buttons` and `content_for_additional_checkout_buttons`; never hard-code branded Apple Pay, Shop Pay, Google Pay, or other wallet buttons.
- Shopify forms for newsletter and contact.
- Theme editor sections and blocks for homepage, About, and editorial modules.

Do not hard-code temporary product facts into Liquid templates.

## Product metafields

Create editable product metafields for:

- Short emotional description.
- Fit notes.
- Garment measurements and size-guide reference.
- Fabric composition.
- Care instructions.
- Maker or production story.
- Model information.
- Dispatch estimate.
- Delivery and returns summary.
- Related products.

All unresolved inputs must have an empty or clearly marked staging placeholder state. They must not render as confirmed customer-facing facts on production.

## Required terminology

Use conventional transactional labels:

- Collection I.
- Color or Colour, selected consistently for the launch market.
- Size.
- Size Guide.
- Add to Cart.
- Cart.
- Checkout.
- Fabric & Care.
- Delivery & Returns.
- Notify me.

Do not use `Bag`, `Add to Bag`, playful replacements for purchase controls, or urgency language.

## Content removals

Do not migrate the following static-prototype content:

- Travel Pouch or a custom packaging-pouch product.
- Eyewear.
- Placeholder products or USD prices.
- “Made in Italy,” “Designed in Paris,” hand-sewn, hand-finished, numbered edition, washed silk-crêpe, or similar unsupported claims.
- Complimentary shipping thresholds, worldwide-shipping promises, finalized returns promises, or dispatch claims.
- “In stock” language before inventory behavior is confirmed.
- Dead Search, Account, Journal, policy, or Cart links.
- Product-card numbering, material lines, color dots, category tags, or “View piece.”

## Implementation order

1. Recreate the shared header, mobile menu, footer, typography, colors, spacing, and buttons as theme components.
2. Build Homepage, three-column desktop Collection I, Product, primary Cart drawer, and full-Cart fallback from the approved Paper artboards.
3. Add Search, Account, and commerce-state behavior.
4. Add About, Journal, gift card, size guide, Contact, FAQ, and policy templates using the same components.
5. Connect product data, variants, Markets, accounts, search, blog, forms, and Cart behavior.
6. Test desktop and mobile together, then review an unpublished Shopify preview.

## Footer destination inventory

The shared footer keeps the established visual composition but exposes only real launch destinations:

- Collection I.
- Gift Card.
- Size Guide.
- About.
- Journal.
- Newsletter.
- Contact.
- FAQ.
- Delivery & Returns.
- Privacy.
- Terms.
- Instagram, once the final profile URL is confirmed.

No footer label may ship with a `#` URL or a missing template.

## Launch blockers

The design can use editable placeholders, but launch requires:

- Final five product names and price mapping.
- Final size range and garment-specific measurements.
- Final colors and color names.
- Approved fabric composition and care instructions.
- Approved maker and production-location claims.
- Fulfillment origin, dispatch timing, shipping, tax, duties, and customs behavior.
- Operationally approved returns and exchange policy.
- Inventory, preorder, sold-out, and Notify me behavior.
- Journal launch content.
- Legal and customer-support details.
- Web-ready image exports for desktop and mobile crops.

## Review gate

The local Liquid implementation is isolated under `shopify-theme/` and has passed Shopify Theme Check. See `SHOPIFY_THEME_BUILD_STATUS.md` for the exact implemented scope and remaining store setup.

Do not upload the theme anywhere except an unpublished Shopify duplicate. Do not publish the Shopify theme until all launch blockers are resolved and the current coming-soon site can be replaced safely.
