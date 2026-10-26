# Frontend Steps

Goal: **Nav, Hero, Footer** with tokens, dark/light theme, smooth scroll and animation foundations.
Assumes you already created a Vite + React + TypeScript project. Check items off as you go.

## Phase 0: Prepare the project
- [ ] Check Node is 20.19 or newer (`node -v`).
- [ ] Install dependencies:
  ```bash
  npm install gsap @gsap/react lenis framer-motion tailwindcss @tailwindcss/vite @fontsource-variable/manrope
  ```
- [ ] Add the Tailwind plugin in `vite.config.ts`:
  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  export default defineConfig({ plugins: [react(), tailwindcss()] });
  ```
- [ ] Delete Vite boilerplate: `src/App.css`, `src/assets/`, the default `src/index.css`, and the demo content in `App.tsx`.
- [ ] Create folders: `src/components/{layout,sections,ui}`, `src/providers`, `src/hooks`, `src/data`, `src/lib`, `src/styles`.
- [ ] Put `DESIGN.md` in the repo root and `prd.md`, `architecture.md`, `frontend-steps.md` in `docs/`.
- [ ] `git init`, push to GitHub, import the repo on Vercel (preset: Vite).

## Phase 1: Tokens and globals
- [x] Create `src/styles/tokens.css` (variables swap by `data-theme`, dark is default, then exposed to Tailwind):
  ```css
  :root, [data-theme="dark"] {
    --bg: #111111;  --surface: #1a1a1a;  --fg: #f5f1ea;  --muted: #9a978f;
    --line: #2b2b2b;  --display: #c8ff00;  --accent: #c8ff00;  --accent-on: #111111;
  }
  [data-theme="light"] {
    --bg: #f5f1ea;  --surface: #ece7dd;  --fg: #111111;  --muted: #6b6860;
    --line: #d9d3c7;  --display: #111111;  --accent: #c8ff00;  --accent-on: #111111;
  }
  @theme inline {
    --color-bg: var(--bg);  --color-surface: var(--surface);  --color-fg: var(--fg);
    --color-muted: var(--muted);  --color-line: var(--line);  --color-display: var(--display);
    --color-accent: var(--accent);  --color-accent-on: var(--accent-on);
    --font-sans: "Manrope Variable", system-ui, sans-serif;
    --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  }
  ```
- [x] Create `src/styles/index.css`: `@import "tailwindcss";` then `@import "./tokens.css";`, then set `body` background `var(--bg)`, colour `var(--fg)`, font `var(--font-sans)`.
- [x] Add base styles: selection in lime with `accent-on` text, `:focus-visible` outline in lime (use `accent-on` inside `footer`), and the Lenis helper classes (`html.lenis`, `.lenis.lenis-smooth`, `.lenis.lenis-stopped`).
- [x] In `main.tsx` import `@fontsource-variable/manrope` and `./styles/index.css`.
- [x] In `index.html`: set `<html data-theme="dark">`, update `<title>` and meta description, and add this inline script so the saved theme applies before paint:
  ```html
  <script>
    try { document.documentElement.dataset.theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
  </script>
  ```
- [x] Check utilities work: `bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-display`, `bg-accent`, `text-accent-on`.

## Phase 2: Data and hooks
- [x] `data/site.ts`: name, first, last, eyebrow, intro, email, github, linkedin, portrait path.
- [x] `data/nav.ts`: About, Skills, Projects, Experience, Achievements, Contact (`href: "#about"` and so on).
- [x] `lib/gsap.ts`: register `ScrollTrigger` and `useGSAP` once, re-export `gsap`.
- [x] `hooks/useTheme.ts`: reads `data-theme`, writes it and `localStorage` on change, returns `{ theme, toggle }`.
- [x] `hooks/useScrollDirection.ts`: returns `hidden` when scrolling down past about 160px.
- [x] `hooks/useActiveSection.ts`: `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"`, returns the active section id.

## Phase 3: Smooth scroll provider
- [x] `providers/SmoothScroll.tsx`: create Lenis once, drive it from the GSAP ticker, keep ScrollTrigger in sync, clean up on unmount, skip when reduced motion:
  ```tsx
  const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
  const update = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
  // cleanup: gsap.ticker.remove(update); lenis.destroy();
  ```
- [x] Expose the instance through context and a `useScrollTo()` hook (Lenis `scrollTo`, with a native fallback when Lenis is off).
- [x] `components/ui/SmoothLink.tsx`: an `<a>` that, for `#hash` hrefs, prevents default and calls `useScrollTo()`. It is reused by the nav, hero and scroll cue.
- [x] Wrap the app in `<SmoothScroll>` (in `App.tsx`).
- [x] Test: scrolling is smooth and there are no jumps on resize.

## Phase 4: Nav (React Bits PillNav)
- [ ] Copy the PillNav source and CSS from React Bits into `components/ui/PillNav.jsx` and `components/ui/PillNav.css`.
- [ ] Because the project is TypeScript, add `components/ui/PillNav.d.ts` that declares the props (all optional except what you pass) and `export default PillNav`.
- [ ] `components/ui/ThemeToggle.tsx`: round 44px button (sun/moon icon swap with Framer Motion), `aria-label` says which theme it switches to.
- [ ] `components/layout/Nav.tsx`: fixed header, PillNav centred in a flex container, theme toggle on the right, an invisible spacer on the left (desktop) so the pill stays centred.
- [ ] Wire the PillNav props:
  ```tsx
  <PillNav
    logo={<span>S</span>} logoHref="#top" logoAlt="Sanchali Saha, back to top"
    items={navItems}
    activeHref={active && active !== "top" ? `#${active}` : ""}  // "" keeps it controlled, nothing active on hero
    linkComponent={SmoothLink}
    theme={theme} indicator="pill" stretch={0.25} highlightColor="#C8FF00"
    onMenuToggle={setMenuOpen} ariaLabel="Primary"
  />
  ```
- [ ] Hide on scroll down, show on scroll up with Framer Motion (`animate={{ y: hidden && !menuOpen ? -110 : 0 }}`).
- [ ] Test the folded menu: narrow the window, open it, press Esc, click a link.
- [ ] Add your extra nav ideas here: ______

## Phase 5: Hero
- [ ] Section `id="top"`, `min-h-svh`, centred content.
- [ ] Structure: eyebrow, huge two-line name, portrait capsule, intro, two CTAs (View projects = lime fill, Contact = outline), scroll cue.
- [ ] Name: `clamp(3.25rem, 14.5vw, 13rem)`, weight 800, uppercase, line-height 0.86, tracking `-0.045em`, colour `text-display`. Put each letter in its own overflow-hidden span so it can rise into place.
- [ ] Portrait capsule: absolutely centred between the two lines, `aspect-[5/7]`, `rounded-full`, `overflow-hidden`, image taller than the capsule (about 130%) so it can move for parallax.
- [ ] GSAP intro inside `useGSAP` and `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`: eyebrow fades up, letters rise (stagger 0.04), capsule pops in, intro and buttons fade up.
- [ ] Parallax: move the image `yPercent` to about -15 with ScrollTrigger `scrub: true` over the hero.
- [ ] Replace the placeholder photo and edit the copy in `data/site.ts`.
- [ ] Add your extra hero ideas here: ______

## Phase 6: Footer
- [ ] Full-width lime block (`bg-accent text-accent-on`) in both themes.
- [ ] Big headline ("Let's build something together") plus the email as a large `mailto:` link with an arrow that nudges on hover.
- [ ] GitHub and LinkedIn links (new tab, `rel="noopener noreferrer"`) and an Email link.
- [ ] Back-to-top button using `useScrollTo(0)` with Framer Motion hover and tap.
- [ ] Copyright line with the year computed in code.
- [ ] Add your extra footer ideas here: ______

## Phase 7: Assemble and QA
- [ ] `App.tsx`: skip link, `<Nav>`, `<main id="main">` with `<Hero>` and one placeholder section per nav item (ids `about` to `contact`), then `<Footer>`.
- [ ] Check at 360, 768, 1280 and 1920px in both themes.
- [ ] Keyboard-only pass: tab order, visible focus (lime on dark, near-black on the lime footer), Esc closes the menu.
- [ ] Reduced-motion pass (turn the OS setting on): no hero animation, no Lenis.
- [ ] Contrast check: lime text only on dark, `accent-on` text on every lime fill.
- [ ] Lighthouse: performance, accessibility, SEO.
- [ ] `npm run build` and `npm run preview` with no errors.
- [ ] Push to GitHub and confirm the Vercel deploy.

## Next sessions
1. About + Skills
2. Projects (data file, cards, optional detail view)
3. Experience + Achievements
4. Contact section, SEO and Open Graph, final polish
