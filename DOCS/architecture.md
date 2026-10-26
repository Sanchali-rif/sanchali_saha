# Architecture

## 1. Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + TypeScript | Typed components, familiar |
| Build | Vite | Fast dev server, simple static output |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) with tokens in `@theme` | Design tokens become utility classes |
| Smooth scroll | Lenis | Smooth, lightweight, works with GSAP |
| Scroll / timeline animation | GSAP + ScrollTrigger | Hero intro, reveals, parallax |
| UI animation | Framer Motion | Hover, menu transitions, presence |
| Hosting | Vercel | Free, auto-deploy on push |

Single-page app, no backend. Content lives in typed data files.

## 2. Folder structure
```
portfolio/
├─ DESIGN.md
├─ docs/
│  ├─ prd.md
│  ├─ architecture.md
│  └─ frontend-steps.md
├─ public/
│  ├─ resume.pdf
│  ├─ og-image.png
│  └─ favicon.svg
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles/
   │  ├─ index.css          # imports tailwind, fonts, base styles
   │  └─ tokens.css         # @theme tokens from DESIGN.md
   ├─ components/
   │  ├─ layout/
   │  │  ├─ Nav.tsx
   │  │  ├─ MobileMenu.tsx
   │  │  └─ Footer.tsx
   │  ├─ sections/
   │  │  ├─ Hero.tsx
   │  │  ├─ About.tsx        # phase 2
   │  │  ├─ Skills.tsx       # phase 2
   │  │  ├─ Projects.tsx     # phase 2
   │  │  ├─ Experience.tsx   # phase 3
   │  │  ├─ Achievements.tsx # phase 3
   │  │  └─ Contact.tsx      # phase 3
   │  └─ ui/
   │     ├─ Button.tsx
   │     ├─ Eyebrow.tsx
   │     ├─ Reveal.tsx       # reusable scroll-reveal wrapper
   │     └─ Magnetic.tsx     # optional hover effect
   ├─ providers/
   │  └─ SmoothScroll.tsx    # Lenis + GSAP ticker sync
   ├─ hooks/
   │  ├─ useActiveSection.ts
   │  ├─ useScrollDirection.ts
   │  └─ useReducedMotion.ts
   ├─ data/
   │  ├─ site.ts             # name, role, links, email
   │  ├─ nav.ts              # nav items
   │  ├─ projects.ts         # phase 2
   │  └─ experience.ts       # phase 3
   └─ lib/
      └─ gsap.ts             # registers plugins once
```

## 3. Design tokens
`DESIGN.md` describes the system. `src/styles/tokens.css` is the code version. Tokens are plain CSS variables swapped by `data-theme` (dark is the default), then exposed to Tailwind v4 with `@theme inline`:

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
  --color-bg: var(--bg);  --color-fg: var(--fg);  --color-accent: var(--accent);  /* ...and the rest */
  --font-sans: "Manrope Variable", system-ui, sans-serif;
}
```
Components use utilities like `bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-display`, `bg-accent`, `text-accent-on`. No hardcoded hex values in components. The theme is set before first paint by a small inline script in `index.html` and toggled by `useTheme`.

## 4. Animation architecture
Rule: **one library per job** to avoid conflicts.
- **Lenis** owns scrolling. It is created once in `SmoothScroll` and driven by `gsap.ticker`, and `lenis.on("scroll", ScrollTrigger.update)` keeps ScrollTrigger in sync.
- **GSAP** owns timelines and scroll-linked effects (hero intro, parallax, pinned or scrubbed sections). Use `useGSAP` or `gsap.context()` with cleanup in `useEffect`.
- **Framer Motion** owns component-level UI (menu open/close with `AnimatePresence`, hover and tap, nav hide/show).
- Never animate the same property on the same element with two libraries.
- `useReducedMotion` gates all non-essential motion.

```
main.tsx
 └─ <SmoothScroll>            (Lenis + GSAP ticker)
     └─ <App>
         ├─ <Nav />           (Framer Motion, useScrollDirection, useActiveSection)
         ├─ <main>
         │   ├─ <Hero />      (GSAP intro timeline)
         │   └─ ...sections   (phase 2+)
         └─ <Footer />
```

## 5. Data flow
- Static content only. `data/*.ts` exports typed arrays and objects; components map over them.
- Example project type (phase 2):
```ts
export type Project = {
  slug: string;
  title: string;
  problem: string;
  tags: string[];
  live?: string;
  repo?: string;
  image: string;
  featured: boolean;
};
```
- Nav anchors are driven by `data/nav.ts`, which keeps Nav and sections in sync.

## 6. Navigation behavior
- `useActiveSection` uses `IntersectionObserver` on section ids to highlight the current link.
- Link click calls `lenis.scrollTo("#id", { offset: -navHeight })`.
- `useScrollDirection` hides the nav on scroll down and shows it on scroll up.

## 7. Accessibility
- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`.
- Skip-to-content link, visible focus rings, `aria-expanded` and `aria-controls` on the menu button.
- Lenis: allow native scroll inside the mobile menu via `data-lenis-prevent`.
- Reduced motion respected everywhere.

## 8. Performance
- Fonts: load Manrope with `display=swap`, preconnect, only the needed weights.
- Images: WebP/AVIF, explicit width and height, `loading="lazy"` below the fold.
- Code-split heavy sections later (e.g. any 3D) with `React.lazy`.
- Register only the GSAP plugins used.

## 9. Deployment
- GitHub repo → Vercel project (framework preset: Vite).
- Build: `npm run build`, output: `dist`.
- Add Open Graph image and meta tags in `index.html`.

## 10. Decisions log
| Decision | Choice | Revisit when |
|---|---|---|
| Router | None (single page with anchors) | Case-study pages are added (then React Router) |
| Contact | `mailto:` for now | Form service is chosen |
| Theme | Light only | Dark mode is requested |
