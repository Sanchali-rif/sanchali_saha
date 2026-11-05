import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { navItems } from '../../data/nav'
import { SmoothLink } from '../ui/SmoothLink'
import PillNav from '../ui/PillNav.jsx'
import MetallicPaint from '../ui/MetallicPaint'

const sectionIds = ['top', ...navItems.map((item) => item.href.slice(1)), 'github']

export function Nav() {
  useTheme()
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 32)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <motion.header
      className={`navbar-header fixed inset-x-0 top-0 z-50 isolate px-4 py-4 md:px-8 ${scrolled ? 'navbar-header--scrolled' : ''}`}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="metallic-logo navbar-logo" aria-label="Sanchali Saha, back to top">
        <MetallicPaint
          imageSrc="/Elegant White SS Calligraphic Monogram.png"
          color="#c8ff00"
          density={2}
          softness={0.1}
          dispersion={0.3}
          distortion={0.07}
          edgeBend={0.01}
          angle={67}
          scale={1.05}
          speed={0.85}
          rotation={0}
          mouseTilt={0.85}
          intro
        />
      </a>
      <div className="navbar-header__inner mx-auto flex max-w-7xl items-center justify-between gap-3">
        <span className="hidden size-11 shrink-0 md:block" aria-hidden="true" />
        <PillNav
          logo={<span aria-hidden="true">S</span>}
          logoHref="#top"
          logoAlt="Sanchali Saha, back to top"
          items={navItems}
          activeHref={active ? `#${active}` : '#top'}
          linkComponent={SmoothLink}
          itemStyle="plain"
          hoverEffect="fill"
          indicator="pill"
          layout="split"
          surface="none"
          size="md"
          bounce={0.3}
          stretch={0.32}
          collapse="auto"
          intro
          highlightColor="var(--accent)"
          ariaLabel="Primary"
          className="navbar-plain nav-glass"
        />
        <span className="hidden size-11 shrink-0 md:block" aria-hidden="true" />
      </div>
    </motion.header>
  )
}
