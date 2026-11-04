import { useEffect, useRef, useState } from 'react'
import ActivityHeatmap, { type ActivityDay } from '../ui/activity-heatmap'
import { site } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'

type ContributionResponse = { contributions?: ActivityDay[] }

const githubUsername = site.github.split('/').filter(Boolean).pop() ?? 'Sanchali-rif'

export function ActivitySection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [days, setDays] = useState<ActivityDay[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [selected, setSelected] = useState<string | null>(null)

  useGSAP(() => {
    const heading = headingRef.current
    if (!heading) return

    const media = gsap.matchMedia()
    let fallback: ReturnType<typeof setTimeout> | undefined

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(heading, { opacity: 0, y: 24 })
      fallback = setTimeout(() => gsap.set(heading, { clearProps: 'all' }), 2000)

      gsap.fromTo(heading,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 65%', once: true },
          onComplete: () => clearTimeout(fallback),
        },
      )

      return () => {
        if (fallback) clearTimeout(fallback)
      }
    })

    return () => media.revert()
  }, { scope: headingRef })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('GitHub contributions request failed')
        const payload = (await response.json()) as ContributionResponse
        if (!payload.contributions?.length) throw new Error('No GitHub contributions returned')
        setDays(payload.contributions)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setStatus('error')
      })

    return () => controller.abort()
  }, [])

  return (
    <section id="experience" className="border-t border-line px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Build rhythm</p>
            <h2 ref={headingRef} className="text-[clamp(2.5rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.055em]">Small steps,<br /><span className="text-accent">real momentum.</span></h2>
          </div>
          <a href={site.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent">See the source on GitHub -&gt;</a>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-8 md:p-10">
          {status === 'loading' && <p className="text-sm text-muted" role="status">Loading GitHub activity...</p>}
          {status === 'error' && <p className="text-sm text-muted" role="status">GitHub activity is unavailable right now. View the live profile for the latest data.</p>}
          {status === 'ready' && <ActivityHeatmap days={days} label="Development activity over the last year" period="the last year" selectedDate={selected} onSelectDate={setSelected} />}
        </div>
      </div>
    </section>
  )
}
