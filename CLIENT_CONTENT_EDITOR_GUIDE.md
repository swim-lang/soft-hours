# Soft Hours client content editor

## Decision

Use Shopify as the only client-facing backend.

Marion signs in to Shopify, opens **Online Store > Themes**, finds the unpublished **Soft Hours Ecommerce** theme, and selects **Customize**. The theme editor provides the WordPress-like workflow requested here: choose a page, open an organized section, replace copy or photography, preview the result, and select **Save**.

A separate CMS would duplicate logins, media, permissions, previews, and publishing state. Shopify already owns products and checkout, so keeping marketing content in the theme editor gives the client one authoritative backend.

## Current staging setup

- **Live and locked:** `Coming Soon- Anchovies` (theme `187724038517`). Do not customize, push to, or publish over this theme during ecommerce work.
- **Client-editable staging theme:** `Soft Hours Ecommerce - Client Editor` (theme `187861107061`).
- **Theme editor:** <https://vnj0st-mm.myshopify.com/admin/themes/187861107061/editor>
- **Storefront preview:** <https://vnj0st-mm.myshopify.com?preview_theme_id=187861107061>
- **Staging-only pages created:** About (`about` template) and Size Guide (`size-guide` template). They remain unpublished until launch review.
- Existing page handles used by the theme are Contact (`contact-1`), FAQ (`faqs`), and Delivery & Returns (`shipping-returns`).

## Client editing map

| Content | Where Marion edits it | What is editable |
| --- | --- | --- |
| Homepage hero | Theme editor > Home page > Home hero | Desktop and optional mobile image, accessible image description, heading, subheading, button label, button destination |
| Homepage premise | Theme editor > Home page > Home premise | Eyebrow, heading, formatted body copy |
| Homepage collection module | Theme editor > Home page > Featured collection | Heading, optional introduction, selected collection, number of products, link label |
| Founder/editorial module | Theme editor > Home page > Editorial story | Photograph, accessible description, image side, eyebrow, heading, formatted copy, link label and destination |
| Journal preview | Theme editor > Home page > Journal preview | Selected blog, eyebrow, heading, subheading, number of articles |
| Newsletter | Theme editor > Home page > Newsletter | Eyebrow, heading, body, field placeholder, button label, success message |
| About page | Theme editor > Pages > About | Clock headline; up to six reorderable story blocks with desktop/mobile photography, image descriptions, captions, layout, and formatted copy |
| Collection introduction | Products > Collections | Collection name, description, products, order, and collection image |
| Collection display | Theme editor > Collections | Eyebrow, products per page, empty-state message |
| Product facts and photography | Products | Product name, media gallery, description, variants, price, inventory, and product metafields |
| Related-product heading | Theme editor > Products > Product | Eyebrow and heading above hand-selected related products |
| Journal entries | Content > Blog posts | Article title, featured image, excerpt, body, author, publish date, and search metadata |
| Journal landing copy | Theme editor > Blogs > Journal | Eyebrow, heading, introduction, article count |
| Size Guide | Theme editor > Pages > Size Guide | Measurement illustration, headings, instructions, contact link, and reorderable size rows |
| FAQ | Theme editor > Pages > FAQ | Headings, support navigation, contact prompt, and reorderable question/answer blocks |
| Contact introduction | Theme editor > Pages > Contact | Eyebrows, heading, introductory copy; support email is in Theme settings |
| General support pages | Online Store > Pages | Page title and formatted page body |
| Privacy, terms, shipping, returns | Settings > Policies | Approved policy language |
| Header links | Content > Menus, then Theme editor > Header | Link names/order/destinations; Search and Account visibility; Cart visibility |
| Footer links | Content > Menus, then Theme editor > Footer | Three editable menu columns; Instagram, support email, brand name, and footer year are in Theme settings |

## Product metafield definitions

These definitions are installed in **Settings > Custom data > Products**. Use the fields on each product; do not recreate the definitions.

| Name | Namespace and key | Type | Storefront use |
| --- | --- | --- | --- |
| Short description | `custom.short_description` | Rich text | Concise emotional description beside the purchase controls |
| Details | `custom.details` | Rich text | Product construction and approved product facts |
| Fit notes | `custom.fit_notes` | Rich text | Fit guidance |
| Size guide | `custom.size_guide` | Rich text | Garment-specific measurements or size notes |
| Model information | `custom.model_information` | Rich text | Model height, measurements, and size worn |
| Fabric composition | `custom.fabric_composition` | Rich text | Approved composition only |
| Care instructions | `custom.care_instructions` | Rich text | Approved care only |
| Maker story | `custom.maker_story` | Rich text | Approved maker or production context |
| Dispatch estimate | `custom.dispatch_estimate` | Rich text | Approved dispatch or arrival information |
| Delivery and returns summary | `custom.delivery_returns_summary` | Rich text | Short approved summary near the purchase decision |
| Related products | `custom.related_products` | Product list | Hand-selected complementary products |

Leave unresolved fields blank. Blank fields do not render as confirmed customer-facing claims.

## Safe editing workflow

1. Always open **Customize** on the unpublished ecommerce theme, not the live coming-soon theme.
2. Use the page selector at the top of the editor to choose Home, About, a Collection, a Product, Journal, FAQ, Contact, or Size Guide.
3. Open the named section in the left sidebar.
4. Replace copy or choose an image from Shopify's media library.
5. Add an image description whenever photography changes.
6. Review desktop and mobile previews.
7. Select **Save**. Saving updates only that unpublished theme until the team intentionally publishes it.

## Editorial guardrails

- Brand and story sections can use Marion's expressive voice.
- Purchase controls remain conventional: Shop, Size, Size Guide, Add to Cart, Cart, Checkout, Delivery & Returns, Fabric & Care, and Notify me.
- Do not publish composition, care, maker, dispatch, shipping, tax, customs, or returns claims until they are operationally approved.
- Product photography belongs in Products. Homepage and About photography belongs in the Theme Editor.
- Crop a dedicated mobile image when the desktop composition does not read clearly at a narrow width.
- Do not edit theme code from Shopify's code editor. Content changes should be possible through the fields described above.

## Access

Marion needs a Shopify owner or staff account with permissions for Themes, Products, Content, Files, Navigation, and Policies. Developers can use a collaborator account with Manage themes permission or a Theme Access password. No second client login is required.
