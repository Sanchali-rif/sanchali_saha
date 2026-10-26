# Design System

Reference: https://villo.framer.website/ (structure and tone only, no copied assets or copy).
Source of truth for tokens in code: `src/styles/tokens.css`. Keep both in sync.

## Vibe
Minimal · Editorial · Modern. Big confident type, lots of whitespace, one sharp accent.

## Themes
Dark is the default (matches the hero reference). Light is available through the nav toggle and is saved in `localStorage`.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#111111` | `#F5F1EA` | Page background |
| `--surface` | `#1A1A1A` | `#ECE7DD` | Cards, toggle button |
| `--fg` | `#F5F1EA` | `#111111` | Primary text |
| `--muted` | `#9A978F` | `#6B6860` | Secondary text, eyebrow |
| `--line` | `#2B2B2B` | `#D9D3C7` | Hairline borders |
| `--display` | `#C8FF00` | `#111111` | Hero name (lime is unreadable as text on off-white) |
| `--accent` | `#C8FF00` | `#C8FF00` | Electric Lime: fills, highlights, footer |
| `--accent-on` | `#111111` | `#111111` | Text and icons placed on lime |

Tailwind utilities: `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-line`, `text-display`, `bg-accent`, `text-accent-on`.

Rules:
- Lime is a fill or highlight (buttons, nav highlight, footer block, hover states). Use it as text only on dark backgrounds.
- Always put `accent-on` (near-black) text on lime, never white.
- Footer is a full lime block in both themes.

## Typography
- Font: **Manrope** (variable, 200-800), bundled via `@fontsource-variable/manrope`. One family only.
- Hero name: `clamp(3.25rem, 14.5vw, 13rem)`, weight 800, uppercase, line-height 0.86, tracking `-0.045em`.
  (The reference uses a condensed face. Manrope is wider, so the size is tuned to fit "SANCHALI" on one line.)
- Eyebrow / labels: 11-12px, uppercase, tracking `0.14em` to `0.18em`, weight 600.
- Body: 16-18px, line-height 1.6.
- Section headings: `clamp(2rem, 6vw, 5rem)`, weight 600, tracking `-0.03em`.

## Layout
- Max content width 1280px; side padding 24px mobile, 48px desktop.
- Section vertical padding: 96px mobile, 160px desktop.
- Shapes: capsule (`rounded-full`) for buttons, nav and the portrait; square corners for editorial blocks.
- Borders: 1px `--line`. No heavy shadows, no gradients.

## Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (`expo.out` in GSAP).
- **GSAP:** hero intro timeline (letters rise, portrait pops, text fades up), portrait parallax on scroll.
- **Framer Motion:** nav hide/show on scroll, theme toggle icon swap, button hover and press.
- **Lenis:** smooth scroll, driven by the GSAP ticker.
- **PillNav:** its own spring-based indicator and intro (self-contained).
- `prefers-reduced-motion`: GSAP animations and Lenis are skipped, the nav falls back to instant states.

## Components in this phase
- **Nav:** React Bits `PillNav` (`indicator="pill"`, `stretch={0.25}`, highlight `#C8FF00`), centred. Logo bubble on the left of the bar, theme toggle on the right, folds into a menu button when the links do not fit. Hides on scroll down, returns on scroll up.
- **Hero:** eyebrow line, huge two-line name in `--display`, portrait capsule overlapping the lines, intro, two CTAs, scroll cue.
- **Footer:** lime block with big contact headline, email link, GitHub, LinkedIn, back to top, copyright.

## Do / Don't
- Do keep one idea per screen and let the type carry the page.
- Do use tokens only; no hardcoded hex values in components (the one exception is `highlightColor` passed to PillNav, which mirrors `--accent`).
- Don't add a second typeface.
- Don't use lime text on the light theme.
- Don't animate the same property with two libraries.
