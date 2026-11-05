import Lenis from 'lenis'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { ScrollContext, type ScrollTarget } from './scroll-context'

export function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      return
    }

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 })
    const update = (time: number) => lenis.raf(time * 1000)

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (target: ScrollTarget) => {
    const lenis = lenisRef.current
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

    if (target === '#projects') {
      const section = document.querySelector<HTMLElement>(target)
      const header = document.querySelector<HTMLElement>('.navbar-header')
      const top = section
        ? Math.max(0, section.getBoundingClientRect().top + window.scrollY - (header?.getBoundingClientRect().height ?? 0) - 16)
        : 0

      if (lenis) {
        lenis.scrollTo(top)
        return
      }

      window.scrollTo({ top, behavior })
      return
    }

    if (lenis) {
      lenis.scrollTo(target)
      return
    }

    const top =
      typeof target === 'number'
        ? target
        : typeof target === 'string'
          ? document.querySelector<HTMLElement>(target)?.offsetTop ?? 0
          : target.offsetTop

    window.scrollTo({ top, behavior })
  }

  return (
    <ScrollContext.Provider value={{ lenisRef, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  )
}
