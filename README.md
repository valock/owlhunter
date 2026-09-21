# Aldacir — Handyman & Owl Hunter

Landing page for **Aldacir**, a handyman ("marido de aluguel") based in **Boca
Raton, Florida**.

**Who he is:** Aldacir is a handyman who loves photographing owls. He handles
repairs, assembly, installations, property maintenance and small renovations
across Palm Beach and Broward counties. He also knows the U.S. national parks
well enough to be your guide through any of them — and he is **looking for
investors** to start working in **house flipping** in South Florida.

- **Phone / WhatsApp / iMessage:** +1 (561) 706-8468
- **Email:** Aldo100x@hotmail.com
- **Instagram:** [@owl.hunter.1](https://instagram.com/owl.hunter.1)
- **Live site:** https://owlhunter.netlify.app

## Design

"Everglades twilight" — a naturalist's field-notebook look built around the owl
that gives the brand its name. Deep wetland-teal ground, warm sand text, an amber
"owl-eye" accent and sawgrass green. Display type is Fraunces, body is Hanken
Grotesk, and labels use Space Mono. The hero is a live `<canvas>` dusk scene with
a perched owl whose eyes blink — the one piece of orchestrated motion.

The page leads with the handyman business (what pays the bills) and keeps the owl
photography as the personality and differentiator.

## Page structure

Hero → Services → Service area → About → Owl gallery → House-flip investors →
Contact.

Everything is bilingual **English / Português**: each string carries
`data-lang-en` and `data-lang-pt`, the toggle remembers the choice in
`localStorage` and respects the browser language on first visit.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page, with bilingual content and JSON-LD business data |
| `style.css` | Design system (palette, type scale, components) |
| `script.js` | Language toggle, nav, scroll reveals, canvas scene, Instagram embeds, form |
| `netlify.toml` | Netlify config: publish dir, headers, 404 handling |
| `404.html` | Branded "off the trail" not-found page |
| `favicon.svg`, `site.webmanifest` | Icons / PWA metadata |
| `robots.txt`, `sitemap.xml` | SEO basics |
| `social-card.png` | 1200×630 link-preview image |
| `assets/gallery/` | Photo options for the gallery (see its README) |

## Run locally

Static site, no build step:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Connected to Netlify via GitHub — **every merge into `main` publishes
automatically**. Publish directory `.`, no build command.

The contact form uses **Netlify Forms** (form name: `contact`). Submissions
appear under *Forms*; email alerts are configured at
**Project configuration → Notifications → Emails and webhooks → Form submission
notifications**.

## Local SEO / Google Business Profile

The page is built to back a Google Business Profile listing:

- Google Search Console verification meta tag is in `<head>`.
- `HomeAndConstructionBusiness` JSON-LD with phone, email, geo coordinates,
  service area (9 cities) and a service catalog.
- Consistent NAP (name, address, phone) between the site and the profile.
- `geo.*` meta tags, canonical URL, sitemap and Open Graph card.

Keep the business name, phone and service areas identical here and on the Google
profile — mismatches hurt local ranking.

## Customising

- **Gallery photos:** see `assets/gallery/README.md` (Instagram post embeds are
  configured in the `posts` array in `script.js`).
- **Contact details:** edit the `#contact` section and the JSON-LD block in
  `index.html`.
- **Business hours / price range:** intentionally left out of the JSON-LD rather
  than guessed — add them once they're confirmed.
