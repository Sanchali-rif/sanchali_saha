# PRD: Personal Portfolio Website

## 1. Summary
A minimal, editorial portfolio for Sanchali that helps her land a software / full-stack internship by showcasing her projects and acting as her personal site. Visual direction: dark by default, Manrope type, one Electric Lime (`#C8FF00`) accent, with a light theme toggle.

## 2. Goals
1. Get internship interviews: a recruiter understands who she is and sees her best work in under 30 seconds.
2. Showcase projects with live demos, GitHub links and clear problem/tech summaries.
3. Serve as a long-term personal website (easy to add projects and achievements).

## 3. Audience
- Primary: recruiters and engineering managers screening internship candidates.
- Secondary: hackathon judges, collaborators, GDG and campus community.

## 4. Success criteria
- Loads fast (Lighthouse performance 90+ on desktop and mobile).
- Fully usable on mobile.
- Contact (email, LinkedIn, GitHub) reachable within one click from any scroll position.
- Adding a new project takes one object in a data file.
- Both themes pass WCAG AA contrast for text.

## 5. Page structure
Hero → About → Skills → Projects → Experience → Achievements → Contact → Footer

## 6. Design direction (summary, full detail in `DESIGN.md`)
- Reference: https://villo.framer.website/ (structure and tone only).
- Typeface: Manrope only.
- Themes: dark default (`#111111` background, off-white text), light option (`#F5F1EA` background, near-black text). Choice is saved and applied before first paint.
- Accent: Electric Lime `#C8FF00` as a fill or highlight, always with near-black text on top. Lime is used as text only on dark.
- Motion: Lenis (scroll), GSAP (hero intro, parallax), Framer Motion (UI micro-interactions), PillNav (its own built-in motion).

## 7. Scope by phase
### Phase 1 (current): Nav, Hero, Footer
- **Nav:** React Bits `PillNav` (`indicator="pill"`, `stretch={0.25}`, lime highlight), centred. Logo bubble, six section links, folds into a menu button when links do not fit, theme toggle on the right, hides on scroll down and returns on scroll up, active-section highlight.
- **Hero:** eyebrow line, huge two-line name ("SANCHALI / SAHA") in the display colour, portrait capsule overlapping the two lines, short intro, primary CTA (View projects), secondary CTA (Contact), scroll cue, entrance animation, photo parallax.
- **Footer:** lime block with big contact headline, email link, GitHub, LinkedIn, back to top, copyright.
- Smooth scrolling (Lenis), design tokens, dark/light theme, placeholder sections so nav anchors work.

### Phase 2: About, Skills, Projects
- About: short bio, photo, key stats.
- Skills: grouped (Frontend, Backend, AI, Tools).
- Projects: featured list (see section 9), each with image or video, one-line problem, tech tags, live and GitHub links. Optional detail view.

### Phase 3: Experience, Achievements, Contact
- Experience: SlashByte, GDG on Campus, others (TODO details).
- Achievements: hackathons and awards (TODO list).
- Contact: email CTA and optional form (TODO: form vs `mailto:`).

### Phase 4: Polish
- SEO and Open Graph image, accessibility pass, performance pass, analytics (optional), deploy on Vercel with custom domain (optional).

## 8. Functional requirements (Phase 1)
- FR1: Nav links, logo, hero buttons and the scroll cue smooth-scroll to sections via Lenis.
- FR2: Nav highlights the current section and highlights none while the hero is in view.
- FR3: On narrow screens the nav folds into a menu button; Esc closes it and focus returns to the button.
- FR4: Nav hides when scrolling down past the hero and returns when scrolling up (stays visible while the menu is open).
- FR5: Theme toggle switches dark and light, persists the choice, and the saved theme is applied before first paint (no flash).
- FR6: Hero entrance animation plays once on load; GSAP animations and Lenis are skipped when `prefers-reduced-motion` is set.
- FR7: Footer GitHub and LinkedIn links open in a new tab with `rel="noopener noreferrer"`; email uses `mailto:`.
- FR8: Back-to-top scrolls smoothly to the hero.
- FR9: Skip-to-content link is available to keyboard users.

## 9. Content (to confirm)
- Name: Sanchali Saha
- Eyebrow and intro: drafted in `src/data/site.ts` (TODO: confirm wording)
- GitHub: https://github.com/Sanchali-rif
- LinkedIn: https://www.linkedin.com/in/sanchali-saha-6b4aa6328/
- Email: sanchalisaha05@gmail.com
- Portrait photo: TODO (portrait crop, about 800x1100, placeholder in use)
- Resume PDF: TODO
- Featured projects (pick 4-6 from a longer list): TODO

## 10. Non-functional requirements
- Stack: React, TypeScript, Vite, Tailwind CSS v4, GSAP (+ `@gsap/react`), Lenis, Framer Motion, `@fontsource-variable/manrope`, React Bits PillNav.
- Accessibility: WCAG AA contrast, visible focus states, semantic landmarks, reduced-motion support, skip link.
- Responsive: 360px to 1920px.
- SEO: title, meta description, Open Graph and Twitter tags, semantic headings.

## 11. Out of scope (for now)
- CMS or blog, authentication, backend, analytics dashboard, multi-language.

## 12. Decisions made
- Dark theme is the default, light is available through the toggle (lime text is unreadable on off-white, so the hero name turns near-black in light).
- Hero uses a portrait capsule instead of a typographic-only layout.
- Nav is PillNav with lime highlight (not the orange from the preset link).

## 13. Open questions
1. Final eyebrow and intro copy for the hero?
2. Which 4-6 projects are featured, and in what order?
3. Contact form (needs a service such as Formspree) or `mailto:` only?
4. Any extra nav, hero or footer ideas still to be added?
5. Hover style for PillNav: keep `fill` (default) or switch to `glide` (uses the `stretch` setting)?
