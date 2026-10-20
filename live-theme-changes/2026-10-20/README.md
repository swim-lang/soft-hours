# Live coming-soon theme change — October 20, 2026

Approved by Kira Knoop in chat. Pushed to **Coming Soon- Anchovies (`187724038517`)** with
`shopify theme push --theme 187724038517 --nodelete --allow-live --only layout/coming-soon.liquid --only templates/index.liquid`.
Nothing was published; no other file changed.

1. **Launch year → MMXXVII** (`templates/index.liquid`): hero corner "Launching MMXXVII" and footer "© Soft Hours — MMXXVII".
   The old Supabase content script (`assets/cms.js`, `site_content` table) still stores "MMXXVI" for
   `coming-soon.hero.corner_r_bot` and `coming-soon.footer.copyright` and overwrote the text after load, so the
   `data-cms` attribute was removed from those two spans. The other 35 CMS keys are unchanged.
2. **Favicon** (`layout/coming-soon.liquid`): the custom coming-soon layout never output `settings.favicon`
   (`Logo-Black.png`, 518×518). Added 32/96/192px icons and a 180px apple-touch-icon (Google needs a multiple of 48px).
   Google refreshes favicons on its own schedule (days to weeks); a recrawl request in Search Console speeds it up.

Verified on the public site: both years read MMXXVII after the CMS script runs, four icon tags present, 96px icon serves 200.
Exact changes: `coming-soon-theme.diff`.
