import type { ComponentType, CSSProperties, ReactNode } from 'react'

type PillNavItem = {
  label: string
  href?: string
  icon?: ReactNode
  ariaLabel?: string
}

type PillNavProps = {
  logo?: ReactNode
  logoAlt?: string
  logoHref?: string
  items?: PillNavItem[]
  activeHref?: string
  defaultActiveIndex?: number
  onItemClick?: (item: PillNavItem, index: number, event: React.MouseEvent) => void
  linkComponent?: ComponentType<Record<string, unknown>> | 'a'
  theme?: 'dark' | 'light'
  indicator?: 'dot' | 'pill'
  stretch?: number
  highlightColor?: string
  onMenuToggle?: (open: boolean) => void
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

declare const PillNav: (props: PillNavProps) => JSX.Element

export default PillNav
