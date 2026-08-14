# Soft Hours Paper V2 port plan

Last updated: August 14, 2026

## Working rule

The active Paper page **Soft Hours — Ecommerce V2** is the approved visual source of truth. It consolidates the existing coded prototype, Marion's revisions, ecommerce research, and the agreed commerce decisions.

Implementation is a selective port, not a visual restart:

- Preserve existing code when its structure, styling, imagery, and responsive behavior already match Paper.
- Adjust existing code when the component is sound but its spacing, content, terminology, or responsive rules changed in Paper.
- Replace only unsupported or structurally incorrect commerce modules.
- Bind all product, market, customer, search, journal, cart, and policy behavior to Shopify-native data and endpoints.
- Do not publish or alter the live coming-soon theme during the port.

## Review sources

- Paper: https://app.paper.design/file/01KSQJRVQRH3PFPCCTXWKB2R1D/3-1
- Exact 25-artboard review viewer: https://soft-hours-ecommerce-review.vercel.app/
- Existing static baseline: repository root HTML, `styles.css`, and `nav.js`
- Shopify implementation branch: `codex/soft-hours-shopify`
- Shopify theme foundation: `shopify-theme/`

The Vercel viewer is a visual review artifact made from Paper's own exports. It is not the functional Shopify storefront preview.

## Screen-by-screen reuse map

| Paper screen | Existing code to retain | Required port work | Shopify binding |
| --- | --- | --- | --- |
| Homepage | Hero, typography, editorial pacing, photography, First Hour, Journal, newsletter, footer composition | Match Paper section order, exact spacing, current copy, five-product commerce treatment, and responsive behavior | Featured collection, article cards, newsletter form, theme-editor content |
| Collection I | Existing page shell, header, controls styling, image-card foundation | Replace outdated six-item/category layout with Paper's five-item 3+2 desktop and two-column mobile system; remove numbering, category tags, materials, dots, and `View piece` | Collection products, variants, prices, optional filters and sort |
| Product | Existing gallery/purchase split, thumbnail behavior, typography, related-products shell | Match Paper gallery scale and purchase hierarchy; remove unsupported claims and promotional attribute wall; add Paper mobile sequence and commerce states | Product media, variants, price, metafields, Add to Cart, Notify me, recommendations |
| About | Entire narrative structure, imagery, clock motif, responsive rhythm | Preserve the coded clock; align section spacing/copy to Paper; remove unverified maker/location claims until approved | Theme-editor page content and optional structured maker blocks |
| Header and mobile menu | Existing visual character and responsive menu behavior | Use Paper navigation inventory and conventional `Cart` terminology; connect all destinations | Shopify routes, predictive search trigger, account URL, cart count |
| Footer | Existing oversized wordmark treatment and visual composition | Match the single Paper footer inventory and remove unsupported/dead destinations | Menus, policy objects, newsletter, final social URL |
| Cart drawer | Current Shopify Ajax foundation | Restyle to Paper exactly; retain one-surface quantity/edit/remove/subtotal/express/checkout flow | Cart AJAX/section rendering and eligible accelerated checkout buttons |
| Full Cart | Current Shopify cart form foundation | Match Paper desktop/mobile fallback composition | Native cart form and checkout entry |
| Search | Current predictive-search foundation | Match Paper desktop/mobile overlay and results/no-results states | Predictive Search and full search results |
| Account | Current customer templates | Match Paper entry and mobile states; use Shopify's configured account model | Customer accounts and order history |
| Commerce states | Current empty/unavailable/validation logic | Port Paper visual treatment for empty Cart, Notify me, validation, loading, no results, and recoverable errors | Product availability, forms, cart responses, search responses |
| Journal and article | Current blog/article templates | Port Paper editorial layouts exactly on desktop/mobile | Shopify blog, articles, featured images, metadata |
| Gift card | Current native gift-card template | Port Paper product and issued-card presentation | Shopify gift-card product and issued gift card |
| Size guide | Current page template | Port Paper desktop/mobile table and explanatory copy; keep measurements editable | Page content or structured metaobjects/metafields |
| Support and policies | Current generic/contact/FAQ/policy foundations | Port the shared Paper template and responsive typography | Pages, contact form, FAQ blocks, native policy objects |

## Component disposition

### Keep

- PP Watch and Courier-led typography.
- Cream, near-black, and restrained neutral palette.
- Existing navigation character and oversized footer wordmark.
- Homepage hero and editorial pacing.
- About-page clock artwork and motion behavior.
- Existing approved photography and responsive image crops where they match Paper.
- Working Shopify forms, Liquid objects, and Ajax behavior already present in the theme foundation.

### Adjust

- Shared spacing, section heights, image ratios, and mobile breakpoints to exact Paper values.
- Homepage content order and commerce modules.
- Collection grid and card density.
- PDP image scale, title size, purchase-panel order, and accordions.
- Header/footer link inventory and wording.
- Cart drawer visuals while retaining its current functional architecture.

### Replace

- `Bag` terminology and dead placeholder links.
- Old six-product/category collection layout.
- Numbering, material lines, color dots, tags, and `View piece` on collection cards.
- Old USD prices and placeholder products.
- Pouch, eyewear, and unsupported production/fabric/shipping/return claims.
- Promotional PDP attribute wall.
- Any standalone preview fixture used as evidence of design fidelity.

### Shopify-bind

- Products, variants, availability, localized prices, product media, and metafields.
- Collection, filters, sorting, related products, and recommendations.
- Cart drawer, full cart, accelerated checkout eligibility, and checkout entry.
- Predictive Search, customer accounts, Journal, newsletter/contact forms, gift cards, and policies.
- Shopify Markets for EUR, CHF, and GBP after market configuration is confirmed.

## Port sequence

1. **Shared system fidelity**
   - Compare Paper header/footer/type/spacing against the existing static CSS and Shopify foundation.
   - Move matching existing code into Liquid with the smallest necessary changes.

2. **Core path**
   - Port Homepage, Collection I, Product, and Cart drawer in that order.
   - Review desktop and mobile against the exact Paper exports after each screen.

3. **Brand pages**
   - Port About with the existing clock intact.
   - Port Journal index/article and newsletter.

4. **Utility and support**
   - Port Search, Account, Gift Card, Size Guide, Contact, FAQ, support/policy, and system states.

5. **Shopify staging**
   - Authenticate Shopify CLI.
   - Push only to a new unpublished theme.
   - Populate test products and structured placeholder data.
   - Verify real variants, cart, search, accounts, Markets, policy links, and eligible accelerated payment buttons.

6. **Launch gate**
   - Keep `softhours.rest` on the current coming-soon theme until Marion approves design/copy and all product, imagery, logistics, policy, pricing, and checkout inputs are operationally confirmed.

## Fidelity acceptance test

- Every one of the 25 Paper artboards has a corresponding Shopify template, section, drawer, or state.
- Desktop and mobile are compared against Paper at the same viewport width.
- Differences are recorded as intentional Shopify constraints or corrected before approval.
- Existing approved design code is preserved where it matches; no broad restyling is introduced.
- No prohibited content or unsupported operational promise renders.
- The functional Shopify preview—not the static Vercel review viewer—is used for final interaction and checkout approval.
