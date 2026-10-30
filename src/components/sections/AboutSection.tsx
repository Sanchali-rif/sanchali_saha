import { site } from '../../data/site'

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="about-card__icon" aria-hidden="true">
      {children}
    </span>
  )
}

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.2v4.3c2.7 2 7.3 2 10 0v-4.3M21 10v5" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
    </svg>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="border-t border-line px-6 py-24 sm:px-10 md:min-h-[70vh] md:py-32 lg:px-12">
      <div className="mx-auto grid min-h-[28rem] max-w-7xl gap-12 md:min-h-[38rem] md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-10 lg:gap-16">
        <div>
          <h2 className="text-[clamp(4.5rem,15vw,13rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.075em]" aria-label="About me">
            <span className="block">About</span>
            <span className="block text-accent">Me</span>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
            From concept to execution—one build at a time.
          </p>
        </div>

        <div className="flex max-w-xl flex-col gap-8 border-l border-line pl-6 md:mt-4 md:pl-10">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted">
            Web Developer <span className="mx-2 text-line">|</span> {site.location}
          </p>
          <p className="max-w-lg text-lg leading-relaxed text-fg md:text-xl">
            Focused on building modern web applications with the <span className="text-accent">MERN stack</span>, with a growing curiosity for bringing intelligence into products using <span className="text-accent">Python and Machine Learning</span>.
          </p>
          <ul className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
            <li className="flex gap-3">
              <span className="shrink-0 text-accent" aria-hidden="true">-&gt;</span>
              <span><strong className="font-semibold text-fg">Stack:</strong> React • Node.js • Express • MongoDB</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent" aria-hidden="true">-&gt;</span>
              <span><strong className="font-semibold text-fg">Current Focus:</strong> Deepening AI/ML fundamentals &amp; practical implementations</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent" aria-hidden="true">-&gt;</span>
              <span><strong className="font-semibold text-fg">Execution:</strong> Rapid prototyping through hackathons and independent builds</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent" aria-hidden="true">-&gt;</span>
              <span><strong className="font-semibold text-fg">Status:</strong> Open to remote internships, engineering opportunities, and freelance collaborations.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="about-cards mx-auto max-w-7xl" aria-label="Quick information">
        <article className="about-card about-card--education">
          <div className="about-card__topline">
            <span className="about-card__label">Education</span>
            <CardIcon><GraduationCapIcon /></CardIcon>
          </div>
          <div className="about-card__content">
            <h3>B.Tech in IT</h3>
            <p>RCCIT, Kolkata</p>
            <span className="about-card__meta">2024 — 2028</span>
          </div>
        </article>

        <article className="about-card about-card--location">
          <div className="about-card__topline">
            <span className="about-card__label">Location</span>
            <CardIcon><LocationIcon /></CardIcon>
          </div>
          <div className="about-card__content">
            <h3>Kolkata</h3>
            <p>West Bengal, India</p>
          </div>
          <span className="about-card__coordinates">22.5726° N &nbsp;|&nbsp; 88.3639° E</span>
        </article>

        <article className="about-card about-card--focus">
          <div className="about-card__topline">
            <span className="about-card__label">Current Focus</span>
            <CardIcon><StackIcon /></CardIcon>
          </div>
          <div className="about-card__content">
            <h3>Web Development</h3>
            <div className="about-card__tags" aria-label="Technology stack">
              {['React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'Python'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="about-card about-card--availability">
          <div className="about-card__topline">
            <span className="about-card__label">Availability</span>
            <span className="about-card__status" aria-label="Currently available" />
          </div>
          <div className="about-card__content">
            <h3>Open to Internships.</h3>
            <p>Remote · Freelance Opportunities</p>
          </div>
        </article>
      </div>
    </section>
  )
}
