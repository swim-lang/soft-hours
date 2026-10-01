# Soft Hours — Marion Iteration 3 status (October 1, 2026)

## Source

- Document: `SOFT HOURS WEBSITE ITERATION 3`, by Marion Voldan, created and modified October 1, 2026. It has 17 numbered comments and 7 screenshots.
- Saved unmodified at `client-feedback/2026-10-01-website-iteration-3/` (SHA-256 `22fa9bf5dd198e304f44d805f018bafe8da82d64f7a11b3cc3851122c486f24f`).
- Compared against unpublished theme `187861107061` and against `MARION_SEPTEMBER_20_DECISION_REGISTER.md` (round 2).
- Marion had changed three images in the theme editor since the last push: the homepage hero, the About "Time Well Kept" image, and the product-page closing editorial image. These were copied into Git before any push, and today's push sent only code files.

## Yellow-highlighted items (carried over from round 2)

Marion highlighted #1, #5, #6 and #7. Of those, only #1 is outstanding work. #5 and #6 were built on September 29, and #7 is a Shopify Admin setting. The answers for #5, #6 and #7 sit in our register but evidently never reached Marion. They need a reply, not more building.

## Status key

- **Done today**: changed and pushed to the review theme on October 1.
- **Already built**: exists in the review theme; Marion needs instructions or content.
- **Question**: Marion asked something that needs an answer (a recommended answer is given).
- **Decision**: a technical constraint or trade-off Sean needs to decide on.

## Point by point

| # | Area | Marion's comment | Status | What to tell Marion / what changed |
|---|---|---|---|---|
| 1 | Home | Cookie banner in brand colour, small bar, "Learn more" (Paynter). **Yellow:** asked in rounds 1, 2 and 3 | **Decision (overdue)** | Not done in any round. Shopify's own banner is one store-wide setting (Settings → Customer privacy → Cookie banner), so restyling it also changes the live coming-soon site. The August decision ruled out a custom theme banner. **Recommendation:** approve a theme-rendered, on-brand bar using Shopify's Customer Privacy API (cream bar, short line, Accept / Decline / Learn more → Privacy). It appears only in the ecommerce theme, so the coming-soon site is untouched until launch. About half a day including consent testing. Needs Sean's go-ahead because it reverses the August decision. |
| 2 | Home cards | Arrows in cream; barely visible | **Done today** | Arrows are cream with a soft dark shadow so they read on light and dark photos. |
| 3 | Home cards | "QUICK ADD" → "SELECT SIZE" | **Done today** | Label reads "Select size" on homepage, collection and related-product cards. |
| 4 | Home cards | Heart does nothing visible; explain the flow | **Question / Decision** | Today the heart only remembers the piece **in that visitor's browser**. It fills in, but there is no Favourites page, no count and no syncing across devices. That was the August decision for a five-piece launch. Options: (a) a small Favourites page plus a header heart with a count, still saved per browser (about half a day); (b) a wishlist app (e.g. Swym, Wishlist King) that saves to the customer's account across devices and can send back-in-stock or reminder emails, at a monthly fee; (c) remove the hearts. **Recommendation:** (a) for launch, with a small "Saved to Favourites" confirmation, then move to (b) if the range grows. |
| 5 | Home hero | Hero must accept video. **Yellow** | **Already built** (September 29) | Theme editor → Home → "Home hero" → **Hero video** → upload. Plays muted, looping and full-bleed. The hero image shows first, and is also what visitors with reduced motion see. Suggested file: MP4, landscape 16:9, 10–20 seconds, ideally under 20 MB. Keep the subject central because mobile crops the sides. Nothing has been uploaded yet, which is why Marion hasn't seen it. |
| 6 | Header | Shop needs a menu that can grow. **Yellow** | **Already built** (September 29) | Content → Menus → create a "Main menu": Shop, Journal, About. Drag items **under** Shop to nest them (e.g. Collection I, Tops, Bottoms; a third level is supported). Then Theme editor → Header → **Primary menu** → select it. Desktop shows a dropdown on hover or click; mobile shows an expandable Shop group. Until a menu is assigned, the header shows today's three fixed links. We can set up the starter menu for her on request. |
| 7 | Header | Selector only shows "United Kingdom — CHF". **Yellow** | **Question (Admin)** | The theme lists whatever Shopify Markets offers, and the store currently has one country (UK) priced in CHF. Marion controls this in **Settings → Markets**: which countries she sells to, grouped into markets (e.g. Switzerland CHF, EU EUR, UK GBP, US USD); each market's currency (local currencies need Shopify Payments); and the primary market (probably Switzerland if the business is Swiss-based). Every country she adds appears in the selector automatically. These settings are store-wide and also affect checkout, shipping zones and duties, so they belong with the shipping and duties decisions. |
| 8 | Card size bar | Try the cream a bit more transparent | **Done today** | Opacity reduced from 94% to 80%, with a light blur so the sizes stay readable. Easy to adjust after Marion has looked. |
| 9 | Product page | Use the card heart; where is the wishlist hosted? | **Done today** + Question | The product-page heart is now the same outline heart as the cards, with no circle. Hosting: see #4 (saved in the visitor's browser only). |
| 10 | Product page | Remove Fit & Measurement; Size Guide is enough | **Done today** | Accordion removed. The **Size Guide** link by the size buttons still opens the side panel. The panel still shows a *sample* chart marked "for layout review only" until Marion supplies measurements (#17). |
| 11 | Product page | "Complete the set" is bold | **Done today** | Now regular weight, matching the surrounding type. |
| 12 | Product page | Zoom like Jenni Kayne? | **Question → feasible** | Yes. Proposal: click or tap the main image to open a full-screen cream viewer of all the product's photos. On desktop, moving the mouse pans a 2× zoom; on mobile, pinch to zoom. It needs high-resolution uploads (at least 2000px on the long edge). About half a day. Recommend doing it together with #13 because both rebuild the gallery. |
| 13 | Product page | Colour click must switch to that colour's whole image set (Asceno). Marion will make **one card per colour** | **Decision** | **Why it jumps now:** Marion has uploaded 3–5 photos per product, but none is linked to a colour (0 of 12 variants have an image), so colours fall back to "photo 1, 2, 3…". The gallery also shows only the first 3 photos. **Recommended setup (matches Asceno and her one-card-per-colour plan):** make each colour its own product (e.g. "Long Pants — Pine Grove") containing only that colour's photos. On the product page, the colour swatches link to the sister products, connected by a "Colour group" field we add in Shopify. Clicking a colour opens that colour's page with its complete set, so the mapping can't drift. The theme work is about a day: swatch linking plus a gallery showing every photo. Marion's data work is splitting each product into four. **Alternative:** keep one product with four colour options and tag every photo with its colour; the theme then shows only the matching photos. Fewer products, but only one card per product. This reverses the August "keep colours as variants" decision, so Sean should confirm before Marion restructures products. |
| 14 | Product page | Allow campaign images (OvH grid screenshot, repeated from round 2) | **Already built** + Question | The screenshot shows a campaign image **inside the shop grid**. That exists: Theme editor → Collection → "Collection product grid" → **Add block → Campaign tile** (image or video, heading, link, position, 1 or 2 columns wide). On product pages there is already a **closing editorial image** (Marion set one this week). Question for Marion: does she also want campaign images **inside the product page** itself, e.g. between the gallery and "Complete the set"? If so, that's a small addition. |
| 15 | Collection | Clicking the filter arrow does nothing; dropdown in brand colour and style | **Done today** | The Sort control is now one button: clicking anywhere on it, arrow included, opens a cream dropdown in the site's type with the current option underlined (keyboard: arrow keys, Esc). This replaces the browser's own grey dropdown, which cannot be styled. Filter was already restyled as a button on September 29. |
| 16 | Checkout | Site headline font and square order-summary thumbnails? | **Decision / platform limit** | Checkout styling lives in Shopify Admin (Settings → Checkout → Customize), not the theme. Colours, logo and a body font from Shopify's font library are set already. **Uploading our own font (PP Watch)** and controlling **thumbnail shape** go through Shopify's Checkout Branding API, which as far as we know is limited to **Shopify Plus**. We need to check the store's plan before promising it. Not on Plus: choose the closest headline font from Shopify's library and set it to a lighter weight. The wallet buttons (Shop Pay, PayPal, Apple Pay, Google Pay) keep their own brand styling on every plan. |
| 17 | Other | What do you need for FAQ, Size Guide, etc.? | **Question** | Content list below. |

## #17: content needed from Marion

**Size Guide** (feeds the product-page panel and the Size Guide page)
1. Final size range: S/M/L or XS–XL.
2. Per-garment measurements for every size, in cm (and inches if wanted): bust/chest, waist, hip, length; trousers and shorts also need rise, inseam and leg opening.
3. Fit notes per piece: true to size, relaxed or fitted; advice if between sizes.
4. The model's height and the size she is wearing in the photos.
5. Optional: a measuring illustration or photo in the brand style (we currently use a generic line drawing).

**FAQ** (Marion confirms the facts, and we can draft the wording in Soft Hours' voice)
- Orders and payment: accepted payment methods, order confirmation, editing or cancelling an order.
- Shipping: countries shipped to, dispatch time, delivery times and costs per region, tracking, and who pays duties and taxes (particularly for EU and UK orders from Switzerland).
- Returns and exchanges: return window, condition, who pays return shipping, refund timing, exchanges, sale items.
- Product and care: fabric composition, washing and care, where and how it's made (only approved claims).
- Packaging and gifting: packaging, gift notes, gift cards.
- Contact: support email and expected response time.

**Also needed before launch**
- Delivery & Returns policy and Terms of Service (Settings → Policies). Privacy policy wording.
- Legal or company details for the footer or an imprint page, if required in Switzerland or the EU.
- Social links (Instagram, LinkedIn).
- A Journal article or two for launch.

## Changed today (review theme only)

| # | File | Change |
|---|---|---|
| 2, 8 | `assets/revisions-ii.css` | Cream card arrows with shadow; size bar at 80% opacity with blur |
| 3 | `snippets/product-card.liquid` | "Select size" label and accessible names |
| 9 | `sections/main-product.liquid`, `assets/revisions-ii.css` | Product-page heart uses the card's outline heart |
| 10 | `sections/main-product.liquid` | Fit & Measurements accordion removed (Size Guide panel kept) |
| 11 | `assets/revisions-ii.css` | "Complete the set" at regular weight |
| 15 | `sections/main-collection-product-grid.liquid`, `assets/theme.js`, `assets/revisions-ii.css` | Custom brand-styled Sort menu that opens from anywhere on the control, keyboard-accessible |
| — | `templates/index.json`, `templates/page.about-review.json`, `templates/product.json` | Marion's three editor image changes copied into Git (not pushed back, as they already match Shopify) |

## Verification — October 1

- `git diff --check` passes; Shopify Theme Check: 61 files, no offenses.
- Pushed with `--only` for the five code files, to theme `187861107061` only. The public site was rechecked after the push (see final report).
- Desktop 1440px: card legend "Select size, Pine Grove"; arrows `rgb(242,235,221)`; size bar `rgba(242,235,221,.8)`. Clicking the Sort chevron (the SVG itself) opens the menu; choosing "Price, low to high" loads `?sort_by=price-ascending`, the label updates, and prices come back in ascending order.
- Product page (`/products/long-pants`): the outline heart toggles `aria-pressed` and fills; accordions are now Details / Fabric & Care / Delivery & Returns; Size Guide button present; "Complete the set" at weight 400; no horizontal overflow.
- Mobile 375px: Filter and Sort stay on one row; the Sort menu stays on screen; the `+` opens the "Select size" bar; no horizontal overflow.

## Recommended next build, once Sean confirms

1. #1 on-brand cookie bar (Customer Privacy API), ecommerce theme only.
2. #13 colour-per-product structure plus a full gallery, combined with #12 zoom.
3. #4 Favourites page and header count (if option (a) is chosen).

## Follow-up — October 1 (later)

### #4 Favourites (approved by Kira)

Built and pushed to the review theme:
- **Header heart** with a count beside Cart, on desktop and mobile; "Favourites (n)" in the mobile menu. It reads well on the homepage hero photo.
- **Confirmation** after tapping any heart: "Saved to Favourites · View" (or "Removed from Favourites"). It shows just under the header so it is never hidden behind Shopify's preview bar.
- **Favourites page**, newest first, using the normal product cards, so Select size and Add to Cart work there. Removing a heart takes the card off the page; an empty state links back to the shop. Pieces that no longer exist in the store are forgotten automatically.
- Favourites are still saved **per device/browser**, with no account needed. The page says "kept on this device".
- Staging address: `/pages/contact-1?view=favourites`, the same pattern as the About review route. **Admin step before launch:** create a page titled "Favourites" with the handle `favourites` and template `page.favourites`. The header then links to it automatically, and the browser tab title reads "Favourites" instead of "Contact".
- Files: `sections/main-favourites.liquid`, `templates/page.favourites.json`, `templates/product.card.liquid` (card markup fetched per saved product), `sections/header.liquid`, `assets/theme.js`, `assets/revisions-ii.css`.
- Verified at 1440px and 375px: saving updates the count and aria label ("Favourites, 2 saved"); the page renders saved cards with filled hearts; quick add from the page opened the Cart drawer (test line removed afterwards); removing every heart shows the empty state and hides the count. Test favourites were cleared afterwards.

### #16 Checkout, now that the store is believed to be on Shopify Plus

If the plan is confirmed as Plus, the Checkout Branding API allows a **custom headline font** (PP Watch uploaded as a font file) and **square order-summary thumbnails** (corner radius set to none). That makes #16 feasible. It is configured with the Admin API (or an app such as a checkout branding editor), not through the theme. Next step: confirm Plus in Admin → Settings → Plan, then schedule the branding change.

### Express payments: checkout only (new task from Kira)

- Marion wants PayPal, Apple Pay and Google Pay **at checkout only**, not in the slide-out cart.
- **Done:** the wallet buttons are removed from the Cart drawer, along with the theme setting that controlled them and their styles. The theme renders wallets nowhere else: not on the full Cart page and not on product pages. The drawer now shows Subtotal, a black Checkout button and Continue Shopping only. Files: `snippets/cart-drawer.liquid`, `config/settings_schema.json`, `assets/revisions-ii.css`, `assets/base.css.liquid`.
- **Checkout display (checked in Chromium, desktop):** "Express checkout" appears at the top of checkout with **Shop Pay, PayPal and Google Pay**, then "OR" and the Contact form. Shopify controls the order and styling of these buttons.
- **Still to check on eligible devices:** Apple Pay appears only in Safari on an iPhone, iPad or Mac with a card in Apple Wallet, so it needs a manual check there. PayPal is showing even though Marion's verification is pending on her side; payouts and verification are hers to complete.
- **Question for Marion:** **Shop Pay** also appears. It wasn't on her list, but Shopify shows it automatically when Shop Pay is enabled. If she doesn't want it, she can turn it off in Settings → Payments → Shopify Payments → Shop Pay.

### #1 Cookie bar (approved by Kira, October 1)

Marion asked for this in all three rounds (brand colour, small bar, "Learn more", Paynter as reference).
- New section `sections/cookie-banner.liquid`, rendered from `layout/theme.liquid`. It is a slim cream bar at the bottom: one short line with a "Learn more" link (defaults to the Privacy policy), a quiet "Decline" and a black "Accept". All wording and the link are editable in the theme editor (Cookie bar).
- It uses Shopify's Customer Privacy API. `shouldShowBanner()` decides whether the visitor's region needs consent, following the store's Customer privacy settings, and `setTrackingConsent()` records Accept or Decline for analytics, marketing, preferences and sale of data.
- Shopify's own banner (`#shopify-pc__banner`) is hidden by CSS **in this theme only**. The store-wide banner setting is untouched, so the live coming-soon site keeps Shopify's banner. At launch, the team can switch the Admin setting to a custom banner.
- In the preview, the bar sits just above Shopify's preview bar so it isn't hidden while Marion reviews.
- Verified: this browser is detected as Colorado, USA (`USCO`), where no banner is required, so the bar correctly stays hidden. With the bar shown manually and the save call replaced by a stand-in, Accept sent all four consent categories as true and Decline sent them as false, and both closed the bar. Desktop and 375px mobile fit with no overflow. Real consent was never changed.
- Still to confirm in Admin: Settings → Customer privacy → regions where the banner is required (e.g. Switzerland, EU, UK). Then test from one of those regions.

### #13 Colours — decision: keep colours as options on one product (Kira, after checking with her boss)

The colours stay as options on one product, and the product page switches the photos when a colour is chosen.

**Built (review theme):**
- The product gallery now shows **every** photo (it showed only the first three before), with a thumbnail for each.
- **Colour photo sets:** a photo belongs to a colour when its alt text (Products → photo → "Add alt text") contains the colour name, e.g. "Pine Grove – front", or when it is linked to that colour's variant. Choosing a colour shows that colour's photos plus any untagged shared photos. If a colour has no tagged photos yet, all photos show, so nothing ever looks empty.
- The old positional fallback ("colour 2 → photo 2") is removed. That was the cause of the jumping Marion saw.
- Tested in a browser only, by tagging Shorts photos 1–2 as Pine Grove and 3–4 as Eggplant: Eggplant showed 3, 4 and the shared 5; Pine Grove showed 1, 2 and 5; an untagged colour showed all 5. **The real photos are not tagged yet**, so today every colour shows all photos until Marion adds the alt text.

**Suggested copy for Marion:**

> We'd recommend keeping each piece as a single product with the colours as options, rather than a separate product per colour. Customers find a piece once and then try it in every colour on the same page, without losing their size or scroll position. The collection stays calm (one card per piece instead of four near-identical ones), and the colour filter still lets people see everything available in, say, Eggplant. Behind the scenes it is also simpler for you: one product to update for price, description, size guide and stock, instead of four copies that can drift apart.
>
> To make the photos switch with the colour, give each photo a short description that includes its colour (for example "Pine Grove – front" or "Eggplant – detail"). Open the product in Shopify, click a photo, and use "Add alt text". When a customer chooses a colour, the page then shows that colour's full set of photos. Photos without a colour, such as a campaign image, appear with every colour. The descriptions also help visually impaired customers and search engines.

### #12 Zoom (approved)

**Built (review theme):** click or tap the main product photo to open a full-screen cream viewer of the current colour's photos. It shows "1 / 5", arrows (or ← →) and Close (or Esc). Clicking the photo zooms in about 2.4× around that point, and moving the mouse or a finger pans; clicking again zooms out. Verified on desktop and at 375px with no overflow. Photos look best uploaded at least 2000px on the long side; the viewer requests a 2800px version.

Files: `sections/main-product.liquid`, `assets/theme.js`, `assets/revisions-ii.css`.

### #16 Plan check — the store is on Shopify **Basic**, not Plus (checked in Admin, October 1)

- Admin → Settings → Plan shows **Basic, £25/month**.
- What that means for Marion's checkout request:
  - **Own headline font (PP Watch):** not possible. Uploading a custom font to checkout needs the Checkout Branding API, which is Plus-only.
  - **Square order-summary thumbnails:** not possible. The Basic checkout editor has no corner or image-shape setting; that is also Plus-only (Branding API).
  - **Possible on Basic:** a heading font and a body font from Shopify's library, colours, logo, background and accent. These are already set: cream and ink, logo, body Courier New. Headings are currently **Assistant**, the bold sans in Marion's screenshot, which is the main mismatch.
- **Recommendation:** change checkout headings from Assistant to **Michroma**. It's a light, wide geometric face and the closest library match to PP Watch. It was previewed in the checkout editor and **not saved**, because checkout settings are store-wide and live. Lexend Zetta was also previewed but renders too heavy. Applying it is one setting (Settings → Checkout → Edit → Typography → Headings) once Sean or Marion approves.
- Upgrading to Plus would unlock both requests, but the cost isn't justified for these alone.
