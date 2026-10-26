import { createContext, type RefObject } from 'react'
import type Lenis from 'lenis'

export type ScrollTarget = number | string | HTMLElement

export type ScrollContextValue = {
  lenisRef: RefObject<Lenis | null>
  scrollTo: (target: ScrollTarget) => void
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)
