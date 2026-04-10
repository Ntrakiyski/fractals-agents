import { useEffect, useRef } from 'react'

import { MoonIcon } from '../ui/moon'
import { SunIcon } from '../ui/sun'

type ThemeToggleIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type ThemeToggleIconProps = {
  theme: 'dark' | 'light'
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function ThemeToggleIcon({ theme }: ThemeToggleIconProps) {
  const iconRef = useRef<ThemeToggleIconHandle | null>(null)
  const Icon = theme === 'dark' ? MoonIcon : SunIcon
  const iconName = theme === 'dark' ? 'moon' : 'sun'

  useEffect(() => {
    if (prefersReducedMotion()) return

    iconRef.current?.startAnimation()

    const stopTimer = window.setTimeout(() => {
      iconRef.current?.stopAnimation()
    }, 900)

    return () => {
      window.clearTimeout(stopTimer)
      iconRef.current?.stopAnimation()
    }
  }, [theme])

  return (
    <span
      className="theme-toggle-icon inline-flex size-9 items-center justify-center rounded-full bg-wash text-fg"
      data-theme-icon={iconName}
      aria-hidden="true"
    >
      <Icon ref={iconRef} className="text-current" size={18} />
    </span>
  )
}
