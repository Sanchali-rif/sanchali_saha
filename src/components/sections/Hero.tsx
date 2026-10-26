import { useRef } from 'react'
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
      className="relative flex min-h-svh items-center justify-center overflow-hidden p-6 md:p-12"
      aria-labelledby="hero-title"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <p
          ref={eyebrowRef}
          className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted md:mb-8"
        >
          {site.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="relative z-0 flex flex-col items-center text-[clamp(3.25rem,14.5vw,13rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-display"
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

        <div ref={contentRef} className="mt-10 flex max-w-xl flex-col items-center gap-7 md:mt-12">
          <p className="text-base leading-relaxed text-muted md:text-lg">{site.intro}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SmoothLink
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-on transition-transform hover:-translate-y-1"
            >
              View projects <span aria-hidden="true">-&gt;</span>
            </SmoothLink>
            <SmoothLink
              href="#contact"
              className="rounded-full border border-line px-6 py-3 text-sm font-bold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Contact me
            </SmoothLink>
          </div>
        </div>
      </div>

      <SmoothLink
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        aria-label="Scroll to About"
      >
        <span>Scroll to explore</span>
        <span aria-hidden="true" className="text-lg leading-none">&#8595;</span>
      </SmoothLink>
    </section>
  )
}
