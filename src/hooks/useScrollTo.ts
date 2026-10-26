import { useContext } from 'react'
import { ScrollContext } from '../providers/scroll-context'

const useScrollContext = () => {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error('Scroll hooks must be used within a SmoothScroll provider')
  }

  return context
}

export function useScrollTo() {
  return useScrollContext().scrollTo
}

export function useLenis() {
  return useScrollContext().lenisRef.current
}
