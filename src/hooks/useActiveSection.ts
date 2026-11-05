import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: readonly string[] = []) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const sections = sectionKey
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return

        const activationLine = window.innerHeight * 0.5
        const currentSection = sections.find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= activationLine && bounds.bottom > activationLine
        })

        setActiveSection(currentSection?.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionKey])

  return activeSection
}
