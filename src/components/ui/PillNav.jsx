import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './PillNav.css'

const DEFAULT_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  logoHref = '#',
  items = DEFAULT_ITEMS,
  activeHref,
  onItemClick,
  linkComponent: LinkComponent = 'a',
  theme = 'dark',
  indicator = 'dot',
  stretch = 0.5,
  highlightColor,
  onMenuToggle,
  ariaLabel = 'Main',
  className = '',
}) => {
  const rootRef = useRef(null)
  const measureRef = useRef(null)
  const toggleRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)

  const activeIndex = activeHref === undefined
    ? selected
    : items.findIndex((item) => item.href === activeHref)

  useLayoutEffect(() => {
    const root = rootRef.current
    const measure = measureRef.current

    if (!root || !measure) return undefined

    const evaluate = () => {
      const parent = root.parentElement
      if (!parent) return

      const available = parent.clientWidth
      const required = measure.scrollWidth + 60
      const nextCollapsed = required > available

      setCollapsed(nextCollapsed)
      if (!nextCollapsed) setOpen(false)
    }

    evaluate()
    const observer = new ResizeObserver(evaluate)
    observer.observe(root.parentElement)
    observer.observe(measure)

    return () => observer.disconnect()
  }, [items.length])

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      onMenuToggle?.(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onMenuToggle, open])

  const toggle = () => {
    const nextOpen = !open
    setOpen(nextOpen)
    onMenuToggle?.(nextOpen)
  }

  const choose = (item, index, event) => {
    onItemClick?.(item, index, event)
    if (activeHref === undefined) setSelected(index)
    if (collapsed) {
      setOpen(false)
      onMenuToggle?.(false)
    }
  }

  const renderLink = (item, index, mobile = false) => (
    <LinkComponent
      href={item.href}
      className={mobile ? 'pill-nav__row' : 'pill-nav__item'}
      aria-current={index === activeIndex ? 'page' : undefined}
      aria-label={item.ariaLabel}
      onClick={(event) => choose(item, index, event)}
    >
      {item.icon}
      <span>{item.label}</span>
    </LinkComponent>
  )

  const style = {
    '--pill-highlight': highlightColor || 'var(--accent)',
    '--pill-stretch': `${Math.max(0, Math.min(1, stretch))}`,
  }

  return (
    <nav
      ref={rootRef}
      className={`pill-nav pill-nav--${theme} ${open ? 'pill-nav--open' : ''} ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      {logo && (
        <LinkComponent href={logoHref} className="pill-nav__logo" aria-label={logoAlt}>
          {logo}
        </LinkComponent>
      )}

      {!collapsed ? (
        <ul className={`pill-nav__list pill-nav__list--${indicator}`}>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="pill-nav__slot">
              {renderLink(item, index)}
            </li>
          ))}
        </ul>
      ) : (
        <button
          ref={toggleRef}
          type="button"
          className="pill-nav__toggle"
          aria-expanded={open}
          aria-controls="pill-nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={toggle}
        >
          <span aria-hidden="true" className="pill-nav__burger">
            <span />
            <span />
          </span>
        </button>
      )}

      {collapsed && open && (
        <div id="pill-nav-menu" className="pill-nav__panel">
          <ul className="pill-nav__menu">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`}>{renderLink(item, index, true)}</li>
            ))}
          </ul>
        </div>
      )}

      <span ref={measureRef} className="pill-nav__measure" aria-hidden="true">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`} className="pill-nav__measure-item">
            {item.label}
          </span>
        ))}
      </span>
    </nav>
  )
}

export default PillNav
