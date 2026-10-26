import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
  if (typeof document === 'undefined') {
    return 'dark'
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Theme still applies when storage is unavailable.
    }
  }, [theme])

  const toggle = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggle }
}
