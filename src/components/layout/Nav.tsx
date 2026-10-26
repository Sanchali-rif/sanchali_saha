import { motion } from 'framer-motion'
import { useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useTheme } from '../../hooks/useTheme'
import { navItems } from '../../data/nav'
import { SmoothLink } from '../ui/SmoothLink'
import PillNav from '../ui/PillNav.jsx'
import { ThemeToggle } from '../ui/ThemeToggle'

const sectionIds = navItems.map((item) => item.href.slice(1))

export function Nav() {
  const { theme, toggle } = useTheme()
  const hidden = useScrollDirection()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-8"
      animate={{ y: hidden && !menuOpen ? -110 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <span className="hidden size-11 shrink-0 md:block" aria-hidden="true" />
        <PillNav
          logo={<span aria-hidden="true">S</span>}
          logoHref="#top"
          logoAlt="Sanchali Saha, back to top"
          items={navItems}
          activeHref={active ? `#${active}` : '#top'}
          linkComponent={SmoothLink}
          theme={theme}
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
          highlightColor="#C8FF00"
          onMenuToggle={setMenuOpen}
          ariaLabel="Primary"
          className="navbar-plain"
        />
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
    </motion.header>
  )
}
