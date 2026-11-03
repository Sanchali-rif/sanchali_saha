import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { projects } from '../../data/projects'

export function ProjectsSection() {
  const project = projects.find((item) => item.featured)
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
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    const revealAll = () => {
      gsap.set([...headerItems, ...(metaRule ? [metaRule] : []), ...(frame ? [frame] : []), ...details], {
        clearProps: 'opacity,visibility,transform,clipPath',
      })
      if (statValue && project?.stat) statValue.textContent = project.stat.value
      if (parallaxImage) gsap.set(parallaxImage, { clearProps: 'transform' })
    }

    fallbackTimer = setTimeout(revealAll, 2000)

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
      if (fallbackTimer) clearTimeout(fallbackTimer)
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
          <div className="project-meta-row relative mb-6 flex items-center justify-between pb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            <span>Featured project</span>
            <span className="tabular-nums">01</span>
            <span className="project-meta-rule absolute inset-x-0 bottom-0 h-px origin-left bg-line" aria-hidden="true" />
          </div>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} live demo, opens in a new tab`}
            className="project-frame relative block overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <div className="project-browser-bar flex h-11 items-center justify-between border-b border-line px-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </div>
              <span className="project-browser-url rounded-full border border-line px-4 py-1 text-xs text-muted">
                agni-dristi-frontend.vercel.app
              </span>
              <span className="w-[42px]" aria-hidden="true" />
            </div>
              <div className="project-image-window relative aspect-[1456/696] overflow-hidden bg-surface">
              {!imageFailed ? (
                <div className="project-parallax-image absolute inset-x-0 top-[-6%] h-[112%] w-full">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="project-frame__image block h-full w-full max-w-none object-cover object-top"
                    onError={() => setImageFailed(true)}
                  />
                </div>
              ) : (
                <div className="project-image-fallback absolute inset-0 grid place-items-center bg-surface text-3xl font-light text-muted">
                  {project.title}
                </div>
              )}
              </div>
          </a>

          <div className="project-info-grid mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h3 className="project-detail-reveal font-light leading-[0.95] tracking-[-0.04em] text-fg" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
                {project.title}
              </h3>
              {project.badge && (
                <p className="project-detail-reveal mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.1em] text-fg">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                  {project.badge}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="project-detail-reveal text-lg leading-[1.6] text-fg/80">{project.description}</p>

              {project.stat && (
                <div
                  className="project-detail-reveal project-stat-reveal mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1"
                  role="group"
                  aria-label={`${project.stat.value.replace('%', '')} percent ${project.stat.label.toLowerCase()}`}
                >
                  <strong className="project-stat-value text-accent font-extrabold tracking-[-0.03em] [font-size:clamp(2.25rem,4vw,3.25rem)]" aria-hidden="true">
                    <span ref={statValueRef}>0.0%</span>
                  </strong>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted" aria-hidden="true">{project.stat.label}</span>
                </div>
              )}

              <ul className="project-detail-reveal mt-6 flex flex-wrap gap-2.5" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag} className="project-tag inline-flex items-center rounded-full border border-line px-4 py-2.5 text-sm text-fg">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="project-detail-reveal project-actions mt-8 flex flex-wrap gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-button inline-flex h-12 items-center justify-between gap-4 rounded-full bg-accent pl-6 pr-1.5 text-sm font-semibold text-accent-on"
                  >
                    View live demo
                    <span className="project-live-button__icon grid size-9 place-items-center rounded-full bg-accent-on text-accent" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-repo-button inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-sm font-semibold text-fg"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="size-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7 3.5h4.5L16 8v8.5H7v-13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M11 3.5V8h5M9 11h5M9 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Source code
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
