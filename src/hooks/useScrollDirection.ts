import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 160

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let previousScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > previousScrollY

      setHidden(scrollingDown && currentScrollY > SCROLL_THRESHOLD)
      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return hidden
}
