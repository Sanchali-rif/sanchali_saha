import { useRef } from 'react'
import { FaRegEnvelope, FaSquareGithub, FaLinkedin } from 'react-icons/fa6'
import { site } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { SmoothLink } from '../ui/SmoothLink'

const nameLines = [site.first.toUpperCase(), site.last.toUpperCase()]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      const letters = letterRefs.current.filter(
        (letter): letter is HTMLSpanElement => letter !== null,
      )

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })

        intro
          .from(eyebrowRef.current, { autoAlpha: 0, y: 24, duration: 0.7 })
          .from(letters, { yPercent: 110, duration: 1.1, stagger: 0.04 }, '-=0.35')
          .from(contentRef.current, { autoAlpha: 0, y: 28, duration: 0.8 }, '-=0.45')
      })

      return () => media.revert()
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative box-border flex h-svh min-h-0 items-center justify-center overflow-hidden px-6 pb-[10vh] pt-[12vh] md:px-12"
      aria-labelledby="hero-title"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <p
          ref={eyebrowRef}
          className="mb-[4vh] text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted"
        >
          {site.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="hero-title relative z-0 flex max-w-full flex-col items-center font-extrabold uppercase tracking-[-0.045em] text-display"
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

        <div ref={contentRef} className="mt-[6vh] flex max-w-xl flex-col items-center gap-[4vh]">
          <div className="flex flex-wrap justify-center gap-3">
            <SmoothLink
              href="#projects"
              className="rounded-full bg-accent px-5.5 py-3 text-sm font-medium tracking-[0.04em] text-accent-on transition-transform hover:-translate-y-1"
            >
              View projects <span aria-hidden="true">-&gt;</span>
            </SmoothLink>
            <SmoothLink
              href="#contact"
              className="rounded-full border border-line px-5.5 py-3 text-sm font-medium tracking-[0.04em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Contact me
            </SmoothLink>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid size-12 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent"
            >
              <FaSquareGithub aria-hidden="true" size={32} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-12 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent"
            >
              <FaLinkedin aria-hidden="true" size={32} />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Sanchali Saha"
              className="grid size-12 place-items-center rounded-full border border-fg/20 text-fg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:text-accent"
            >
              <FaRegEnvelope aria-hidden="true" size={32} />
            </a>
          </div>
        </div>
      </div>

      <SmoothLink
        href="#about"
        className="absolute bottom-[2vh] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        aria-label="Scroll to About"
      >
        <span>Scroll to explore</span>
        <span aria-hidden="true" className="text-lg leading-none">&#8595;</span>
      </SmoothLink>
    </section>
  )
}
