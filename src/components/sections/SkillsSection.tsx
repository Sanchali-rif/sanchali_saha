const skillGroups = [
  { title: 'Frontend', skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS'] },
  { title: 'Backend', skills: ['Node.js', 'Express', 'MongoDB'] },
  { title: 'Exploring', skills: ['Python', 'Machine Learning'] },
]

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-line px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted">What I work with</p>
            <h2 className="text-5xl font-extralight tracking-[-0.06em] sm:text-7xl">
              Skills<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">
            Tools and technologies I use to build, learn, and bring ideas to life.
          </p>
        </div>

        <div className="grid border-t border-line md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article key={group.title} className={`py-7 md:py-9 ${index > 0 ? 'border-t border-line md:border-l md:border-t-0 md:pl-8' : ''} ${index < skillGroups.length - 1 ? 'md:pr-8' : ''}`}>
              <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">{group.title}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
