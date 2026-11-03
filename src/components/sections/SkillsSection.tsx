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
          <div className="max-w-sm text-sm leading-relaxed text-muted sm:text-base sm:text-right">
            <p>Tools and technologies I use to build, learn, and bring ideas to life.</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted sm:justify-end">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[var(--core-dot)]" />
              Core stack
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
          {skillGroups.map((group, index) => (
            <article key={group.number} className={`relative py-7 md:py-9 ${index % 2 === 1 ? 'md:pl-8' : ''} ${index % 2 === 0 ? 'md:pr-8' : ''} ${index % 3 !== 0 ? 'lg:pl-8' : 'lg:pl-0'} ${index % 3 === 2 ? 'lg:pr-0' : 'lg:pr-8'}`}>
              {index > 0 && <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-px bg-line ${index % 2 === 1 ? 'md:hidden' : ''} ${index < 3 ? 'lg:hidden' : 'lg:block'}`} />}
              {(index % 2 === 1 || index % 3 !== 0) && <span aria-hidden="true" className={`absolute inset-y-0 left-0 hidden w-px origin-top bg-line ${index % 2 === 1 ? 'md:block' : ''} ${index % 3 !== 0 ? 'lg:block' : 'lg:hidden'}`} />}
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{group.number}<span className="mr-2"> </span>{group.title}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li key={skill.name} className={`inline-flex items-center gap-2 rounded-full border border-line py-2.5 pr-4 text-sm text-fg transition-colors hover:border-accent hover:text-accent ${skill.core ? 'pl-[14px]' : 'pl-4'}`}>
                    {skill.core && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[var(--core-dot)]" />}
                    {skill.core && <span className="sr-only">Core stack: </span>}
                    {skill.name}
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
