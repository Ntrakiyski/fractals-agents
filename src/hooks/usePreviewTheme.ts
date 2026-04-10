import { useEffect, useMemo, useState } from 'react'

type PreviewTheme = 'dark' | 'light'

const STORAGE_KEY = 'fractals-preview-theme'

function readTheme(): PreviewTheme {
  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)
    return savedTheme === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function usePreviewTheme() {
  const [theme, setTheme] = useState<PreviewTheme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return readTheme()
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    const themeMeta = document.querySelector('meta[name="theme-color"]')
    themeMeta?.setAttribute('content', theme === 'dark' ? '#0d0d0c' : '#f7f0e5')

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore storage failures for direct-open or restricted contexts.
    }
  }, [theme])

  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'),
    [theme],
  )

  return {
    theme,
    toggleLabel,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }
}
