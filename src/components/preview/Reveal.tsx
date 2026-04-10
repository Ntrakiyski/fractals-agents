import { useEffect, useRef, useState } from 'react'

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal className={className} data-visible={String(isVisible)}>
      {children}
    </div>
  )
}
