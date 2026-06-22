# Aldacir — Nature Guide & Handyman

A bilingual (EN / PT) one-page landing site for Aldacir: private eco-tours,
birdwatching and wildlife photography across South Florida, plus handyman and
property care in Boca Raton.

**Design direction —** "Everglades twilight": a naturalist's field-notebook look
built around the signature owl (Instagram [@owl.hunter.1](https://instagram.com/owl.hunter.1)).
Deep wetland-teal ground, warm sand text, an amber "owl-eye" accent and sawgrass
green. Display type is Fraunces, body is Hanken Grotesk, and field labels use the
Space Mono utility face. The hero is a live `<canvas>` dusk scene with a perched
owl whose eyes blink — the one piece of orchestrated motion; everything else
stays quiet.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page, with bilingual content in `data-lang-*` attributes |
| `style.css` | Design system (palette, type scale, components) |
| `script.js` | Language toggle, nav, scroll reveals, the canvas scene, form |
| `netlify.toml` | Netlify config: publish dir, headers, 404 handling |
| `404.html` | Branded "off the trail" not-found page |
| `favicon.svg`, `site.webmanifest` | Icons / PWA metadata |
| `robots.txt`, `sitemap.xml` | SEO basics |
| `assets/gallery/` | Drop real photos here (see its README) |

## Run locally

It's a static site — no build step. Open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Netlify

1. Push this branch and connect the repo in Netlify (or drag-and-drop the folder).
2. Build command: *(none)* · Publish directory: `.`
3. The contact form uses **Netlify Forms** — it works automatically once
   deployed (form name: `contact`). Submissions appear under
   *Site → Forms*. Add a notification email there to be alerted of new leads.

## Customising

- **Language:** every visible string has `data-lang-en` / `data-lang-pt`. The
  toggle remembers the choice and respects the browser's language on first visit.
- **Photos:** see `assets/gallery/README.md`.
- **Contact details / social:** edit the `#contact` section and the JSON-LD
  block in `index.html`.
- **Social share image:** replace `social-card.png` (1200×630) for link previews.
