# Forward Edge · forwardedge.co

**v1 · Initial site build · May 2026**

Plain HTML, CSS, and a tiny JS file. No build step. No framework. Open `index.html` in any browser to view.

---

## Files

```
site/
├── index.html         ← Home
├── about.html         ← About the firm
├── advisory.html      ← Six advisory areas (deep)
├── how-we-work.html   ← Engagement model
├── insights.html      ← Memos index
├── contact.html       ← Start a Conversation form
├── styles.css         ← All styles (single source)
├── script.js          ← Nav, ticker, headline rotator
└── assets/            ← Logo PNGs
```

## Brand tokens

Live in `styles.css` at the top under `:root` — colors, fonts, radii, shadows. Edit there to propagate everywhere.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F4F1EB` | Primary body bg |
| `--color-stone` | `#E8E2D5` | Alt surface (rhythm break) |
| `--color-black` | `#000000` | Logo & display headlines |
| `--color-ink` | `#23282F` | Body text |
| `--color-graphite` | `#444B55` | Secondary body |
| `--color-smoke` | `#6F7682` | Meta / mono labels |
| `--color-edge` | `#D08856` | Accent — **≤ 1% coverage** |

Fonts: Instrument Serif (display), Geist (sans), JetBrains Mono (labels). Loaded from Google Fonts via the `<link>` in `<head>`.

## Animations / interactions

All driven by tiny JS in `script.js`:
- **Headline rotator** — `[data-rotator]` host element; first child shown by default, others rotate in every 2.6s
- **Hero ticker** — pure CSS marquee with `keyframes scroll`; pauses on hover
- **Edge pulse dot** — pure CSS, `keyframes pulseDot`
- **Hover lifts** — CSS transitions on `.serve-card`, `.memo-card`, `.adv-card`, `.team-card`

## Photography placeholders

The dark gradient blocks marked `PHOTO · …` are placeholders. CSS classes drive the tone:
- `.photo` — base (gradient)
- `.photo.atmospheric` — warm orange wash
- `.photo.architectural` — grid overlay, cooler
- `.photo.warm` — golden tone
- `.photo.cool` — slate-blue tone

Replace with real `<img>` tags inside `.photo` containers, e.g.:
```html
<div class="photo">
  <img src="assets/photos/atl-capitol.jpg" alt="" />
  <div class="caption">Caption goes here.</div>
</div>
```

The `::before`/`::after` pseudo-elements can be removed once a real image is in place.

## Logo

- `assets/fe-lockup-black.png` — default lockup on Stone/Paper
- `assets/fe-lockup-paper.png` — for use on Black surfaces (footer, manifestos)
- `assets/fe-mark-black.png` — monogram only (favicons, avatars)
- `assets/fe-mark-paper.png` — monogram on dark

**Ask the founders for a vector SVG before production.**

## Notes for the developer

- **CMS-ready hooks** — every memo card, advisory card, and team card is self-contained. Easy to bind to a CMS (Sanity, Contentful, MDX, etc.).
- **Form on contact page** — currently a stub that fakes success. Wire to email/CRM (HubSpot, Plausible Forms, native mail) at the `<form>` submit handler in `contact.html`.
- **Live chat** — placeholder card on contact page. Recommended: Intercom, Crisp, or Plain.
- **SEO** — every page has a `<title>` and `<meta name="description">`. Open Graph tags should be added per page.
- **Accessibility** — semantic landmarks (`<header>`, `<nav>`, `<section>`, `<footer>`), focus rings on form inputs, alt text on images, `aria-label` on icon buttons. Reduced-motion respected.

## What's missing (intentional)

- Real photography (currently editorial gradient placeholders with shoot briefs)
- CMS / database
- Form backend
- Analytics
- Cookie banner
- Live chat

---

## Companion brand documentation

Open these alongside development:

- **`ForwardEdge Website Brand.html`** — the full visual brand spec (tokens, type, components, page template, handoff connectors)
- **`ForwardEdge Imagery Gallery.html`** — kit of additional tile / motion patterns
- **`handoff/forwardedge-brand-brief-for-claude.md`** — Claude-optimized brand brief (drop into Claude Project)
- **`handoff/tokens.json`** — design tokens (Figma Tokens Studio / Style Dictionary)

— *Forward Edge Advisory · ATL · 33.7490°N · 84.3880°W*
