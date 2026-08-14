# Soft Hours Shopify theme build status

Last updated: August 14, 2026

## Local implementation

The approved **Soft Hours — Ecommerce V2** Paper direction has been translated into a separate Shopify Online Store 2.0 theme under `shopify-theme/`.

Implemented locally:

- Shared responsive header, mobile menu, search drawer, footer, newsletter, and accessibility skip link.
- Homepage hero, premise, Collection I preview, founder/editorial module, Journal preview, and newsletter.
- Three-column desktop and two-column mobile collection grid.
- Product gallery, separate option selectors, Size Guide link, editable metafield content, Add to Cart, sold-out state, and Notify me form.
- Ajax Cart drawer as the primary checkout route, with quantity, Edit, Remove, subtotal, standard Checkout, eligible Shopify accelerated checkout buttons, and full-Cart fallback.
- About template with the existing clock motif and reduced-motion behavior.
- Journal index and article templates.
- Search overlay, predictive search, full results, and no-results state.
- Native gift-card product template.
- Size Guide, FAQ, Contact, generic page, and Shopify policy-link support.
- Legacy customer-account entry, order history, order detail, and address templates. Shopify new customer accounts remain the preferred platform setting.
- Empty, unavailable, loading, validation, and recoverable-error treatments.

## Local verification

- Shopify Theme Check: 54 files inspected with no offenses.
- JavaScript syntax check: passed.
- JSON template, locale, settings, and section-schema parsing: passed.
- Prohibited-content scan: no Bag terminology, pouch, eyewear, outdated production claims, or premature shipping promises in the theme.
- Shopify package generation: passed.
- Local responsive browser fixture: passed at desktop and 390 × 844 mobile. Hero, three-plus-two collection, mobile two-column collection, navigation, About clock, footer, cart drawer, and express-checkout placement rendered without console errors or horizontal overflow.

Generated upload package:

- `shopify-theme/Soft Hours Ecommerce-0.1.0.zip`

The package is intentionally ignored by Git because it is a generated 6.2 MB artifact.

## Store setup required before review

1. Duplicate the published **Coming Soon—Anchovies** theme in Shopify and keep the duplicate unpublished.
2. Upload or push this local theme only to that unpublished duplicate.
3. Create or confirm these destinations and handles:
   - Collection I collection.
   - `/products/soft-hours-gift-card`.
   - `/pages/about` using `page.about`.
   - `/pages/size-guide` using `page.size-guide`.
   - `/pages/contact` using `page.contact`.
   - `/pages/faq` using `page.faq`.
   - `/pages/delivery-returns`.
   - `/blogs/journal`.
4. Assign the header, footer, homepage, collection, Journal, FAQ, contact, and Size Guide links in the theme editor.
5. Create the product metafields listed in `SHOPIFY_IMPLEMENTATION_HANDOFF.md` and populate only confirmed facts.
6. Configure Products, variants, Markets price lists, customer accounts, blog content, policies, support details, and payment methods.
7. Replace fallback editorial imagery with the approved web-export library.

## External verification still required

- Real product, color, and size variants.
- EUR, CHF, and GBP Markets behavior.
- Shopify-rendered Apple Pay, Shop Pay, or other eligible accelerated buttons.
- Checkout, tax, duties, shipping, dispatch, and customs behavior.
- Customer-account emails and order history.
- Journal, gift-card, newsletter, Contact, FAQ, and policy destinations.
- Protected preview QA on desktop and mobile.

The live holding page remains untouched. Do not publish the ecommerce theme until Marion approves the design and copy and all operational launch blockers are resolved.
