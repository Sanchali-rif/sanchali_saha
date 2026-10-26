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
        const visibleSection = entries.find((entry) => entry.isIntersecting)

        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionKey])

  return activeSection
}
