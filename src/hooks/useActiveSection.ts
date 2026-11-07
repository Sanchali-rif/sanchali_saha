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

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.5
      const currentSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= activationLine && bounds.bottom > activationLine
      })

      // Keep the hero selected when the activation line falls in a gap near the
      // top of the page (for example, while returning from another section).
      setActiveSection(currentSection?.id ?? (window.scrollY <= 1 ? sections[0].id : null))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sectionKey])

  return activeSection
}
