import { site } from '../../data/site'

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
    </section>
  )
}
