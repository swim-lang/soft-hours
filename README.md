# Soft Hours — About 2 (desktop)

A static, hand-coded port of the "Soft Hours — About 2" desktop page (1440px) designed in Paper.

## Structure

```
index.html        # page markup
styles.css        # all styling (CSS variables, layout, type)
assets/           # images + fonts
  fonts/          # PP Watch (display headlines)
```

## Type

- **Display headlines** — PP Watch Extralight (bundled in `assets/fonts/`, with Jost as a web fallback).
- **Labels & body** — Courier New.

## Preview locally

It's a fully static site — any static file server works. For example:

```bash
cd about2-site
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Notes

- The layout is a fixed 1440px-wide desktop reproduction.
- `assets/fonts/PPWatch-Extralight.otf` is a licensed font — keep this repository private and do not redistribute the font file.
