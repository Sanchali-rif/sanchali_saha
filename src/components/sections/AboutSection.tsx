import { useRef } from 'react'
import { FaArrowRight, FaDownload, FaGraduationCap, FaLayerGroup, FaLocationDot } from 'react-icons/fa6'
import { site } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { SmoothLink } from '../ui/SmoothLink'

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="about-card__icon" aria-hidden="true">
      {children}
    </span>
  )
}

function LocationVisual() {
  const dots = Array.from({ length: 77 }, (_, index) => {
    const column = index % 11
    const row = Math.floor(index / 11)

    return <circle key={index} cx={8 + column * 14} cy={7 + row * 14} r="2" />
  })

  return (
    <div className="about-card__map" aria-hidden="true">
      <svg viewBox="0 0 156 91" preserveAspectRatio="xMidYMid meet">
        {dots}
      </svg>
    </div>
  )
}

function EducationProgress() {
  return (
    <div className="about-card__progress" aria-label={`Year ${site.educationYear} of 4`}>
      <div className="about-card__progress-bar" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => {
          const isComplete = index < site.educationYear - 1
          const isCurrent = index === site.educationYear - 1

          return (
            <span key={index} className={isComplete ? 'is-complete' : isCurrent ? 'is-current' : ''}>
              {isCurrent && <span />}
            </span>
          )
        })}
      </div>
      <span>Year {site.educationYear} of 4</span>
    </div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const entranceRefs = useRef<HTMLElement[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const headingLineRefs = useRef<HTMLSpanElement[]>([])

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      const entranceElements = entranceRefs.current
      const headingLines = headingLineRefs.current
      const setFinalValues = () => {
        numberRefs.current.forEach((element, index) => {
          if (element) element.textContent = String(index === 0 ? site.stats.projects : site.stats.hackathons).padStart(2, '0')
        })
      }

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(headingLines, { yPercent: 110 }, {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        })

        gsap.fromTo(entranceElements, { y: 24, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        })

        const counters = [site.stats.projects, site.stats.hackathons]
        const values = counters.map(() => ({ value: 0 }))
        gsap.to(values, {
          value: (index: number) => counters[index],
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.08,
          snap: { value: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
          onUpdate: () => {
            numberRefs.current.forEach((element, index) => {
              if (element) element.textContent = String(Math.round(values[index].value)).padStart(2, '0')
            })
          },
        })
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(headingLines, { yPercent: 0 })
        gsap.set(entranceElements, { y: 0, autoAlpha: 1 })
        setFinalValues()
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  const registerEntrance = (element: HTMLElement | null) => {
    if (element && !entranceRefs.current.includes(element)) entranceRefs.current.push(element)
  }

  const registerHeadingLine = (element: HTMLSpanElement | null) => {
    if (element && !headingLineRefs.current.includes(element)) headingLineRefs.current.push(element)
  }

  return (
    <section ref={sectionRef} id="about" className="border-t border-line px-6 py-24 sm:px-10 md:min-h-[70vh] md:pt-24 md:pb-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-10 lg:gap-16">
        <div className="about-intro md:self-stretch">
          <h2 className="about-heading" aria-label={`${site.aboutHeading.first} ${site.aboutHeading.second}`}>
            <span className="about-heading__clip">
              <span ref={registerHeadingLine} className="about-heading__line">{site.aboutHeading.first}</span>
            </span>
            <span className="about-heading__clip">
              <span ref={registerHeadingLine} className="about-heading__line about-heading__line--accent">{site.aboutHeading.second}</span>
            </span>
          </h2>
          <p className="about-intro__tagline max-w-sm text-sm leading-relaxed text-muted sm:text-base">
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
        <article ref={registerEntrance} className="about-card about-card--education">
          <div className="about-card__topline">
            <span className="about-card__label">Education</span>
            <CardIcon><FaGraduationCap /></CardIcon>
          </div>
          <EducationProgress />
          <div className="about-card__content">
            <h3>B.Tech in IT</h3>
            <p>RCCIT, Kolkata</p>
            <span className="about-card__meta">2024 — 2028</span>
          </div>
        </article>

        <article ref={registerEntrance} className="about-card about-card--location">
          <div className="about-card__topline">
            <span className="about-card__label">Location</span>
            <CardIcon><FaLocationDot /></CardIcon>
          </div>
          <LocationVisual />
          <div className="about-card__content">
            <h3>Kolkata</h3>
            <p>West Bengal, India</p>
          </div>
          <span className="about-card__coordinates">22.5726° N &nbsp;|&nbsp; 88.3639° E</span>
        </article>

        <article ref={registerEntrance} className="about-card about-card--focus">
          <div className="about-card__topline">
            <span className="about-card__label">Current Focus</span>
            <CardIcon><FaLayerGroup /></CardIcon>
          </div>
          <div className="about-card__content">
            <h3>Web Development</h3>
            <div className="about-card__tags" aria-label="Technology stack">
              {['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Python'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>

        <article ref={registerEntrance} className="about-card about-card--availability">
          <div className="about-card__topline">
            <span className="about-card__label">Availability</span>
            <span className="about-card__status" aria-label="Currently available" />
          </div>
          <div className="about-card__content">
            <h3>Open to Internships.</h3>
            <p>Remote · Freelance Opportunities</p>
          </div>
          <a
            href={site.resume}
            download="Sanchali-Saha-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta--primary"
          >
            <span className="cta__label">Download CV</span>
            <span className="cta__icon bg-accent-on text-accent"><FaDownload aria-hidden="true" /></span>
          </a>
        </article>
      </div>

      <div ref={registerEntrance} className="about-stats mx-auto max-w-7xl" aria-label="Portfolio statistics">
        <div className="about-stats__item">
          <span ref={(element) => { numberRefs.current[0] = element }} className="about-stats__number" aria-label={`${site.stats.projects} projects built`}>0</span>
          <span className="about-stats__label">Projects built</span>
        </div>
        <div className="about-stats__item">
          <span ref={(element) => { numberRefs.current[1] = element }} className="about-stats__number" aria-label={`${site.stats.hackathons} hackathons participated`}>0</span>
          <span className="about-stats__label">Hackathons participated</span>
        </div>
        <SmoothLink href="#projects" className="about-stats__link">
          <span>See all projects</span>
          <FaArrowRight aria-hidden="true" />
        </SmoothLink>
      </div>
    </section>
  )
}
