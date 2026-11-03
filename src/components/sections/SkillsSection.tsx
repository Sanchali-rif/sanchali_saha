import { skillGroups } from '../../data/skills'

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

        <div className="grid grid-cols-1 border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article key={group.number} className={`py-7 md:py-9 ${index > 0 ? 'border-t border-line' : ''} ${index % 2 === 1 ? 'md:border-l md:pl-8' : ''} ${index % 2 === 0 ? 'md:pr-8' : ''} ${index % 3 !== 0 ? 'lg:border-l lg:pl-8' : 'lg:border-l-0 lg:pl-0'} ${index % 3 === 2 ? 'lg:pr-0' : 'lg:pr-8'}`}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{group.number}<span className="mr-2"> </span>{group.title}</h3>
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
