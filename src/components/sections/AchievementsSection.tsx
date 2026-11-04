const achievements = [
  {
    role: 'Winner',
    title: 'ShowcaseX — Best Use of Gemini',
    organization: 'RCCIIT, Beleghata',
    description: 'Built a civic issue reporting web app that helps citizens report potholes, garbage, broken streetlights, and other local problems, visualizing them on a city map for easier tracking and resolution.',
  },
  {
    role: 'Graphics Associate',
    title: 'GDG on Campus RCCIIT',
    organization: 'Community · 2025–26',
    description: 'Designed graphics and visual content for events, social media campaigns, and community engagement initiatives.',
  },
  {
    role: 'Social Media Manager',
    title: 'SlashByte',
    organization: 'Remote',
    description: 'Managed the company’s LinkedIn presence by creating and publishing content to enhance brand visibility and community engagement.',
  },
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="border-t border-line px-6 py-24 sm:px-10 md:py-32 lg:px-12" aria-labelledby="achievements-heading">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-5 border-b border-line pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Recognition &amp; leadership</p>
            <h2 id="achievements-heading" className="text-5xl font-extralight tracking-[-0.06em] sm:text-7xl">
              Achievements<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right sm:text-base">
            A few milestones and communities that have shaped my work.
          </p>
        </header>

        <ol className="divide-y divide-line border-y border-line">
          {achievements.map((item, index) => (
            <li key={item.title} className="grid gap-5 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 md:py-10">
              <span className="text-xs font-medium tabular-nums tracking-[0.14em] text-muted">0{index + 1}</span>
              <article className="grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.role}</p>
                  <h3 className="text-2xl font-light tracking-[-0.04em] sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.organization}</p>
                </div>
                <p className="max-w-2xl text-base leading-[1.7] text-fg/75">{item.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
