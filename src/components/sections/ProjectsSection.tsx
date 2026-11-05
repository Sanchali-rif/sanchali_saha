import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { projects } from '../../data/projects'

export function ProjectsSection() {
  const project = projects.find((item) => item.featured)
  const secondProject = projects.find((item) => item.slug === 'neatnode')
  const thirdProject = projects.find((item) => item.slug === 'healthsync')
  const fourthProject = projects.find((item) => item.slug === 'civiclens')
  const [imageFailed, setImageFailed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const statValueRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const statValue = statValueRef.current
    if (!section) return

    const headerItems = gsap.utils.toArray<HTMLElement>('.project-header-reveal', section)
    const metaRule = section.querySelector<HTMLElement>('.project-meta-rule')
    const frame = section.querySelector<HTMLElement>('.project-frame')
    const details = gsap.utils.toArray<HTMLElement>('.project-detail-reveal', section)
    const parallaxImage = section.querySelector<HTMLElement>('.project-parallax-image')
    const media = gsap.matchMedia()

    const revealAll = () => {
      gsap.set([...headerItems, ...(metaRule ? [metaRule] : []), ...(frame ? [frame] : []), ...details], {
        clearProps: 'opacity,visibility,transform,clipPath',
      })
      if (statValue && project?.stat) statValue.textContent = project.stat.value
      if (parallaxImage) gsap.set(parallaxImage, { clearProps: 'transform' })
    }

    const fallbackTimer = setTimeout(revealAll, 2000)

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
        onComplete: () => {
          if (statValue && project?.stat) statValue.textContent = project.stat.value
        },
      })

      timeline.fromTo(headerItems, { y: 24, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
      })

      if (metaRule) {
        timeline.fromTo(metaRule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' })
      }

      if (frame) {
        timeline.fromTo(frame, { y: 48, autoAlpha: 0, clipPath: 'inset(8% round 24px)' }, {
          y: 0,
          autoAlpha: 1,
          clipPath: 'inset(0% round 24px)',
          duration: 1,
          ease: 'expo.out',
        })
      }

      const detailsStart = timeline.duration() + 0.3
      if (details.length) {
        timeline.fromTo(details, { y: 24, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
        }, detailsStart)
      }

      if (statValue && project?.stat) {
        const counter = { value: 0 }
        const statIndex = details.findIndex((element) => element.classList.contains('project-stat-reveal'))
        timeline.to(counter, {
          value: Number.parseFloat(project.stat.value),
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            statValue.textContent = `${counter.value.toFixed(1)}%`
          },
          onComplete: () => {
            statValue.textContent = project.stat?.value ?? ''
          },
        }, detailsStart + Math.max(0, statIndex) * 0.08)
      }

      if (parallaxImage) {
        gsap.fromTo(parallaxImage, { yPercent: -4 }, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: frame ?? section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })

    media.add('(prefers-reduced-motion: reduce)', () => {
      if (statValue && project?.stat) statValue.textContent = project.stat.value
    })

    return () => {
      clearTimeout(fallbackTimer)
      media.revert()
    }
  }, { scope: sectionRef })

  if (!project) return null

  return (
    <section ref={sectionRef} id="projects" className="border-t border-line px-6 py-24 sm:px-10 md:py-32 lg:px-12" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-5 border-b border-line pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="project-header-reveal mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Selected work</p>
            <h2 id="projects-heading" className="project-header-reveal text-5xl font-extralight tracking-[-0.06em] sm:text-7xl">
              Projects<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="project-header-reveal max-w-sm text-sm leading-relaxed text-muted sm:text-right sm:text-base">
            Things I&apos;ve built, from idea to deployment.
          </p>
        </header>

        <article>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.title} live demo, opens in a new tab`}
              className="project-frame block overflow-hidden rounded-3xl border border-line bg-surface lg:col-span-7"
            >
              {!imageFailed ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="project-frame__image block aspect-[1456/900] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="grid aspect-[1456/900] place-items-center bg-surface text-3xl font-light text-muted">
                  {project.title}
                </div>
              )}
            </a>
            <div className="lg:col-span-5">
              <h3 className="font-light leading-[0.95] tracking-[-0.04em] text-fg" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                {project.title}
              </h3>
              {project.badge && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.1em] text-fg">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                  {project.badge}
                </p>
              )}
              <p className="mt-5 text-base leading-[1.7] text-fg/80">{project.description}</p>
              {project.stat && (
                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1" role="group" aria-label={`${project.stat.value.replace('%', '')} percent ${project.stat.label.toLowerCase()}`}>
                  <strong className="text-accent font-extrabold tracking-[-0.03em] [font-size:clamp(2.25rem,4vw,3.25rem)]">
                    {project.stat.value}
                  </strong>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{project.stat.label}</span>
                </div>
              )}
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag} className="project-tag inline-flex items-center rounded-full border border-line px-4 py-2.5 text-sm text-fg">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-live-button inline-flex h-12 items-center justify-between gap-4 rounded-full bg-accent pl-6 pr-1.5 text-sm font-semibold text-accent-on">
                    View live demo
                    <span className="project-live-button__icon grid size-9 place-items-center rounded-full bg-accent-on text-accent" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-fg">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 size-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.34 3.33 1.76.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                    </svg>
                    Source code
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>

        {secondProject && (
          <article className="mt-24 border-t border-line pt-8 md:mt-32">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <a
                href={secondProject.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${secondProject.title} live demo, opens in a new tab`}
                className="project-frame block overflow-hidden rounded-3xl border border-line bg-surface lg:col-span-7"
              >
                <img
                  src={secondProject.image}
                  alt={secondProject.imageAlt}
                  className="project-frame__image block aspect-[1456/900] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </a>
              <div className="lg:col-span-5">
                <h3 className="font-light leading-[0.95] tracking-[-0.04em] text-fg" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  {secondProject.title}
                </h3>
                <p className="mt-5 text-base leading-[1.7] text-fg/80">{secondProject.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Technologies">
                  {secondProject.tags.map((tag) => (
                    <li key={tag} className="project-tag inline-flex items-center rounded-full border border-line px-4 py-2.5 text-sm text-fg">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={secondProject.live} target="_blank" rel="noopener noreferrer" className="project-live-button inline-flex h-12 items-center justify-between gap-4 rounded-full bg-accent pl-6 pr-1.5 text-sm font-semibold text-accent-on">
                    View live demo
                    <span className="project-live-button__icon grid size-9 place-items-center rounded-full bg-accent-on text-accent" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                  {secondProject.repo && (
                    <a href={secondProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-fg">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 size-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.34 3.33 1.76.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                      </svg>
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}

        {thirdProject && (
          <article className="mt-24 border-t border-line pt-8 md:mt-32">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <a
                href={thirdProject.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${thirdProject.title} live demo, opens in a new tab`}
                className="project-frame block aspect-[1456/900] overflow-hidden rounded-3xl border border-line bg-surface lg:col-span-7"
              >
                <img
                  src={thirdProject.image}
                  alt={thirdProject.imageAlt}
                  className="project-frame__image block h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </a>
              <div className="lg:col-span-5">
                <h3 className="font-light leading-[0.95] tracking-[-0.04em] text-fg" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  {thirdProject.title}
                </h3>
                <p className="mt-5 text-base leading-[1.7] text-fg/80">{thirdProject.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Technologies">
                  {thirdProject.tags.map((tag) => (
                    <li key={tag} className="project-tag inline-flex items-center rounded-full border border-line px-4 py-2.5 text-sm text-fg">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={thirdProject.live} target="_blank" rel="noopener noreferrer" className="project-live-button inline-flex h-12 items-center justify-between gap-4 rounded-full bg-accent pl-6 pr-1.5 text-sm font-semibold text-accent-on">
                    View live demo
                    <span className="project-live-button__icon grid size-9 place-items-center rounded-full bg-accent-on text-accent" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                  {thirdProject.repo && (
                    <a href={thirdProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-fg">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 size-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.34 3.33 1.76.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                      </svg>
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}

        {fourthProject && (
          <article className="mt-24 border-t border-line pt-8 md:mt-32">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <a
                href={fourthProject.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${fourthProject.title} live demo, opens in a new tab`}
                className="project-frame block aspect-[1456/900] overflow-hidden rounded-3xl border border-line bg-surface lg:col-span-7"
              >
                <img
                  src={fourthProject.image}
                  alt={fourthProject.imageAlt}
                  className="project-frame__image block h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </a>
              <div className="lg:col-span-5">
                <h3 className="font-light leading-[0.95] tracking-[-0.04em] text-fg" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  {fourthProject.title}
                </h3>
                <p className="mt-5 text-base leading-[1.7] text-fg/80">{fourthProject.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Technologies">
                  {fourthProject.tags.map((tag) => (
                    <li key={tag} className="project-tag inline-flex items-center rounded-full border border-line px-4 py-2.5 text-sm text-fg">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={fourthProject.live} target="_blank" rel="noopener noreferrer" className="project-live-button inline-flex h-12 items-center justify-between gap-4 rounded-full bg-accent pl-6 pr-1.5 text-sm font-semibold text-accent-on">
                    View live demo
                    <span className="project-live-button__icon grid size-9 place-items-center rounded-full bg-accent-on text-accent" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                  {fourthProject.repo && (
                    <a href={fourthProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-fg">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 size-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.34 3.33 1.76.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                      </svg>
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
