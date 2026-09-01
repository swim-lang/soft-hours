# Soft Hours — Marion August 27 Feedback Audit

Last reviewed: September 1, 2026

## Authoritative feedback source

- Missive conversation: `Soft Hours Website // Comments`
- Client message: Marion Voldan, August 27, 2026
- Attachment: `Notes Soft Hours Website.docx` — 15 pages with 27 embedded screenshots
- Additional image attachments: three exported screenshots plus the email-signature logo
- The document contains ordinary body text, not Word comments or tracked changes.

The older Supabase review database is not the source for this round. `soft_hours_review_comments` ends July 1, and `soft_hours_coming_soon_comments` ends July 21. No August feedback exists in those tables.

## Current direction

This remains a refinement of the approved Soft Hours ecommerce design. The August document does not support a new visual concept or a rebuild from scratch. It asks for clearer hierarchy, faster commerce interactions, more usable product imagery, and a few pieces of brand and operational content.

The public `Coming Soon- Anchovies` Shopify theme must remain unchanged. Implementation and review continue in unpublished theme `Soft Hours Ecommerce - Client Editor` (`187861107061`).

## Already addressed in the unpublished theme

| Client request | Current disposition |
|---|---|
| Sticky or returning navigation | Implemented. The header hides while scrolling down and returns while scrolling up; the homepage overlay becomes a readable cream header after scrolling. |
| Currency in navigation | Implemented on desktop and inside the mobile menu. Shopify Markets still needs correct country/currency configuration. |
| Hide `Made with Patience` and move shoppers to products sooner | Implemented. The homepage making-introduction block is disabled. |
| Remove `For the First Hour and the Last` homepage section | Implemented. The standalone homepage section is disabled. |
| Product-card wishlist | Implemented as a guest browser-saved state. |
| Product-card image arrows | Implemented. |
| Quick size choice and Add to Cart | Implemented with a forced size choice and an immediate cart drawer. |
| Cart drawer instead of an extra cart step | Implemented and verified. The selected colour and size are preserved. |
| Smaller, more refined collection filters | Implemented as a side drawer with compact Sort. |
| Abbreviated sizes | Implemented as S/M/L for current preview data. |
| Sold-out `Notify me` route | Implemented as a product-specific path rather than a disabled control. |
| PDP imagery on the left and purchase information on the right | Implemented with a 4:5 contained primary image and vertical desktop thumbnails. |
| Side-opening Size Guide | Implemented. |
| Remove colour-preview instructional copy | Implemented. |
| PDP wishlist | Implemented at the top-right of the purchase panel. |
| Bullet-ready Details and Fabric & Care | Supported through Shopify rich text/metafields. |
| Preserve the About clock | Implemented and verified. |
| Improve About hierarchy | Implemented without discarding the approved layout. |
| Journal `Hour` and independent archive sequence | Implemented through editable article metafields. Visible labels now use `Hour` and `№`. |
| Launch fallback taxonomy I, II, VI | Implemented as fallback only; real article metafields remain authoritative. |
| Remove footer EN/CHF text | Implemented. |
| Respect the Shopify footer menu | Implemented with safe nested-menu, flat-menu, and fallback behavior. |
| Footer social presentation | Implemented as optional text links only. Instagram and LinkedIn stay hidden until Marion supplies destinations; no social icons are used. |
| Clear route from `Hours Worth Dressing For` | Implemented with `Shop Collection I`, editable in the Shopify theme editor. |
| Privacy headings and table of contents | Implemented. Body readability is 15px/26px and verified in preview. |
| Newsletter and sitewide text hierarchy | Improved; long-form body text is readable and uppercase is limited to small metadata and controls. |

## Deliberately bounded remaining work

The remaining items are content, configuration, or launch inputs—not reasons to add more storefront features.

1. **Homepage brand introduction:** Marion should decide whether this is primarily a short copy statement, a photograph-led module, or both. Do not invent or restore a larger making manifesto while that direction is unresolved.
2. **Footer destinations:** Instagram and LinkedIn fields are ready as quiet text links. They remain hidden until Marion supplies confirmed URLs. Confirm the actual `Soft Hours Footer` menu resource in Shopify Admin as part of final content entry.
3. **Cookie consent:** Use Shopify's native Customer Privacy cookie banner and configure its copy, regions, and appearance in Shopify Admin. Do not create a decorative theme-only substitute. Because this is store-level configuration that may affect the public coming-soon storefront, defer the change until the launch configuration is approved.
4. **Client-supplied media and facts:** Product-colour media, editorial imagery, videos, product facts, delivery terms, and policies remain editable placeholders until Marion approves them.

No Favorites page, drawer, count, or navigation destination is planned for the five-product launch. The existing lightweight heart controls may remain as a subtle guest convenience, but they should not become a separate shopping journey.

The desktop PDP keeps its natural approved layout rather than forcing a sticky information column. The current gallery is controlled with thumbnails rather than a long vertical image stack, and the complete purchase panel is taller than the viewport. A sticky treatment would therefore add an internal scrollbar without reducing the path to Add to Cart.

## Design or asset decisions

These need a focused design/content decision rather than a blind code change.

1. **Homepage product browsing:** Marion asks for a horizontally gesturable carousel, image arrows, and hover quick-buy behavior. The current responsive grid is stable and clear. Decide whether the homepage should become a true carousel while the collection remains a grid.
2. **Product-card size interaction:** Marion suggests hover-only sizes. The current visible size choices are clearer and work on touch devices. A desktop hover enhancement is possible, but size selection should never become inaccessible on mobile.
3. **Colour presentation:** Keep colours as variants, not duplicate product cards. The exact gallery behavior depends on approved media for every colour.
4. **Journal imagery:** Marion does not want collection watercolours used as Journal thumbnails. Replace the current article imagery only when the editorial image direction is approved.
5. **Homepage art direction:** Marion wants the photography to move from overly sombre toward `femme fatale`, with architectural, painterly, through-the-window framing and limited visible face. This is a campaign/photo brief, not a theme rebuild.
6. **About video:** Fabric and founder videos require approved exports, poster frames, captions/transcripts, and mobile crops before implementation.
7. **Handmade-watercolour proof:** Decide where to explain that the collection watercolours are hand drawn by Anchovies. This should be concise brand proof, not a technical homepage manifesto.

## Client, content, and operations inputs still required

- Approved product media mapped to every product and colour variant. Current fallback imagery can still show the wrong garment or colour.
- Final XS–XL versus S/M/L launch sizing and customer-facing measurements.
- Final product names and the product-to-price mapping.
- Final fabric composition and care instructions.
- Approved maker names, roles, location claims, and any coordinates.
- Final shipping markets, PPWR/packaging obligations, fulfillment origin, duties/taxes treatment, dispatch estimates, and returns policy.
- Approved journal titles, excerpts, Hour categories, archive numbers, and non-watercolour imagery.
- Instagram, LinkedIn, and other confirmed social destinations.
- Fabric video and founder video assets if those modules remain desired.

## Stakeholder choices to keep explicit

- Do not build a full Favorites experience for the five-product launch. Keep the lightweight guest heart state only; revisit it if the catalogue becomes large enough for saved-product retrieval to be useful.
- Marion entered an all-caps hero subtitle, while Sean's later readability direction limits all-caps to small eyebrows and utility labels. The current theme uses sentence case; keep that unless the team deliberately restores the exception.
- Marion's August document specifies launch Hours I, II, and VI. Real article metafields should hold that taxonomy; position-based fallback is only staging behavior.
- Ratings should not be shown until genuine review data exists.
- Approximate maker coordinates should not be published until the maker and location claims are approved.

## Verification completed September 1

- Shopify Theme Check: 59 files, zero offenses.
- Theme JavaScript syntax and JSON templates pass validation.
- Add to Cart was tested with The Slip / Pine Grove / Small; the cart drawer received the exact variant, then the test item was removed to restore the original preview cart.
- Mobile at 390px: no horizontal overflow; desktop currency control is hidden; functional country/currency selector remains inside the mobile menu; collection remains two columns.
- Collection filter drawer, PDP Size Guide, About clock, Journal links, Privacy table of contents, guest wishlist state, footer, and cart drawer were checked in the unpublished Shopify preview.
- The homepage `Shop Collection I` CTA resolves to Collection I, has a working desktop hover state, remains visible at 390px, and introduces no horizontal overflow.
- Empty social fields produce no empty Follow column. Social destinations will render as text links only after URLs are supplied.
- Shopify's native privacy-banner script is present in the unpublished preview; store-level regions, copy, and appearance remain a launch configuration rather than theme code.
- Remote pull-back confirms theme assets and sections match the local checkout; Shopify's auto-generated JSON comments are the only serialization difference.
- Theme roles rechecked: `Coming Soon- Anchovies` is still live; `Soft Hours Ecommerce - Client Editor` is still unpublished.
