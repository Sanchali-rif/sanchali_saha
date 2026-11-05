import { type ReactElement, useRef } from 'react'
import { FaRegEnvelope, FaSquareGithub, FaLinkedin } from 'react-icons/fa6'
import { site } from '../../data/site'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { SmoothLink } from '../ui/SmoothLink'

const nameLines = [site.first.toUpperCase(), site.last.toUpperCase()]

function ActionLabel({ children }: { children: string }) {
  return <span className="cta__label">{children}</span>
}

function DownArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v11M4.5 9.5 9 14l4.5-4.5" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2.5v9m0 0 3.25-3.25M9 11.5 5.75 8.25M3 13.5v2h12v-2" />
    </svg>
  )
}

function IconStack({ icon, className }: { icon: () => ReactElement; className: string }) {
  return <span className={`cta__icon ${className}`}>{icon()}</span>
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundWordParallaxRef = useRef<HTMLDivElement>(null)
  const backgroundWordRef = useRef<HTMLDivElement>(null)
  const sparkleRef = useRef<SVGSVGElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      let active = true
      const refreshScrollTriggers = () => {
        if (active) ScrollTrigger.refresh()
      }
      const letters = letterRefs.current.filter(
        (letter): letter is HTMLSpanElement => letter !== null,
      )

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'expo.out', overwrite: 'auto' } })
        const layers = layersRef.current ? [layersRef.current] : []

        intro
          .from(eyebrowRef.current, { autoAlpha: 0, y: 24, duration: 0.7 })
          .from(letters, { yPercent: 110, duration: 1.1, stagger: 0.04 }, '-=0.35')
          .from(layers, { autoAlpha: 0, duration: 1 }, '-=0.45')
          .from(contentRef.current, { autoAlpha: 0, y: 28, duration: 0.8 }, '-=0.45')

        media.add('(min-width: 768px)', () => {
          gsap.fromTo(backgroundWordRef.current, { x: -15 }, {
            x: 15,
            duration: 6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            overwrite: 'auto',
          })
          gsap.fromTo(backgroundWordParallaxRef.current, { y: -20 }, {
            y: 20,
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
        media.add('(max-width: 767px)', () => {
          gsap.fromTo(backgroundWordRef.current, { x: -15 }, {
            x: 15,
            duration: 6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            overwrite: 'auto',
          })
          gsap.fromTo(backgroundWordParallaxRef.current, { y: -20 }, {
            y: 20,
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
        gsap.to(sparkleRef.current, {
          scale: 1.16,
          autoAlpha: 0.55,
          transformOrigin: 'center',
          duration: 2.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          overwrite: 'auto',
        })
        const availabilityDot = heroRef.current?.querySelector('.hero-availability-dot')
        if (availabilityDot) {
          gsap.to(availabilityDot, {
            scale: 1.35,
            autoAlpha: 0.8,
            transformOrigin: 'center',
            duration: 1.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            overwrite: 'auto',
          })
        }

      })

      if (document.readyState === 'complete') {
        refreshScrollTriggers()
      } else {
        window.addEventListener('load', refreshScrollTriggers, { once: true })
      }
      document.fonts.ready.then(refreshScrollTriggers)

      return () => {
        active = false
        window.removeEventListener('load', refreshScrollTriggers)
        media.revert()
      }
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative box-border flex min-h-svh items-center justify-center overflow-x-clip overflow-y-hidden px-4 pb-[10vh] pt-[14vh] md:px-12"
      aria-labelledby="hero-title"
    >
      <div ref={layersRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          ref={backgroundWordParallaxRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <div
            ref={backgroundWordRef}
            className="hero-outline-word whitespace-nowrap font-extrabold uppercase will-change-transform"
          >
            Builder
          </div>
        </div>

        <svg ref={sparkleRef} viewBox="0 0 32 32" className="absolute right-5 top-[12vh] size-5 text-fg opacity-35 will-change-transform md:right-[8vw] md:top-[18vh] md:size-9">
          <path fill="currentColor" d="M16 0c1.2 9.5 2.5 14.8 16 16-13.5 1.2-14.8 6.5-16 16-1.2-9.5-2.5-14.8-16-16C13.5 14.8 14.8 9.5 16 0Z" />
        </svg>

        <div className="hero-orbit absolute bottom-[24%] left-[5%] hidden h-[11vw] w-[22vw] -rotate-[30deg] text-fg/40 md:block">
          <svg viewBox="0 0 320 160" className="h-full w-full">
            <path d="M-14 10h8" stroke="var(--accent)" strokeWidth="1" opacity=".8" />
          </svg>
        </div>

        <div className="hero-crosshair hero-crosshair-left absolute left-[25vw] top-[70%] hidden lg:block" />
        <div className="hero-crosshair hero-crosshair-right absolute bottom-[140px] right-[80px] hidden lg:block" />

        <div className="absolute bottom-[10vh] left-1/2 flex -translate-x-1/2 translate-y-4 flex-col items-center gap-2 text-center md:bottom-[7vh] md:left-6 md:translate-x-0 md:translate-y-0 md:flex-row md:items-center md:gap-4 md:text-left lg:left-10">
          <span className="hidden h-[calc(8rem+30px)] w-px -translate-y-[15px] bg-line md:block" />
          <div className="text-xs uppercase tracking-[0.18em] text-muted">
            <p>{site.location}</p>
            <p className="mt-3 flex items-center gap-2">
              <span className="hero-availability-dot size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] will-change-transform" />
              {site.status}
            </p>
          </div>
        </div>

        <div className="absolute z-10 right-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 text-xs font-medium tracking-[0.14em] lg:flex lg:right-16">
          <div className="flex flex-col gap-5 text-muted/45">
            <span className="hero-index-active text-fg">01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </div>
          <span className="hero-index-line h-px w-8 bg-fg" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <div className="hero-copy">
          <p
            ref={eyebrowRef}
            className="mb-[4vh] text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted"
          >
            {site.eyebrow}
            <span aria-hidden="true" className="ml-3 hidden w-8 align-middle text-muted sm:inline-block">
              <span className="block h-px bg-muted/60" />
            </span>
          </p>

          <h1
            id="hero-title"
            className="hero-title relative top-6 z-0 flex w-full max-w-full flex-col items-center font-extrabold uppercase tracking-[-0.045em] text-display md:top-0"
          >
            {nameLines.map((line) => (
              <span key={line} className="flex whitespace-nowrap">
                {[...line].map((letter, index) => {
                  const letterIndex = nameLines
                    .slice(0, nameLines.indexOf(line))
                    .reduce((total, currentLine) => total + currentLine.length, 0) + index

                  return (
                    <span key={`${line}-${index}`} className="inline-block overflow-hidden">
                      <span
                        ref={(element) => { letterRefs.current[letterIndex] = element }}
                        className="inline-block"
                      >
                        {letter}
                      </span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>
        </div>

        <div ref={contentRef} className="mt-[clamp(4rem,9vw,5.5rem)] flex max-w-xl translate-y-4 flex-col items-center gap-6 md:mt-[clamp(3rem,6vw,5rem)] md:translate-y-0">
          <div className="flex w-full translate-y-[0.9rem] flex-col items-center justify-center gap-3 md:flex-row md:translate-y-0">
            <SmoothLink
              href="#projects"
              aria-label="View projects"
              className="cta cta--primary"
            >
              <ActionLabel>View projects</ActionLabel>
              <IconStack icon={DownArrowIcon} className="bg-accent-on text-accent" />
            </SmoothLink>
            <a
              href={site.resume}
              download="SanchaliSaha_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta cta--secondary"
            >
              <ActionLabel>Download CV</ActionLabel>
              <IconStack icon={DownloadIcon} className="border border-fg/60 text-fg" />
            </a>
          </div>
          <div className="flex translate-y-4 items-center justify-center gap-3 md:translate-y-0">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid size-11 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent md:size-12"
            >
              <FaSquareGithub aria-hidden="true" size={32} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-11 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent md:size-12"
            >
              <FaLinkedin aria-hidden="true" size={32} />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Sanchali Saha"
              className="grid size-11 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent md:size-12"
            >
              <FaRegEnvelope aria-hidden="true" size={32} />
            </a>
          </div>
        </div>
      </div>

      <SmoothLink
        href="#about"
        className="hero-scroll-cue absolute bottom-[calc(2vh-0.2rem)] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg md:bottom-[2vh]"
        aria-label="Scroll to About"
      >
        <span>Scroll to explore</span>
        <span aria-hidden="true" className="text-lg leading-none">&#8595;</span>
      </SmoothLink>
    </section>
  )
}
