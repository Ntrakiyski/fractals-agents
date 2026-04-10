import { useEffect, useState } from 'react'

import type { PreviewSectionId } from '../content/previewContent'

export function useActiveSection(sectionIds: PreviewSectionId[]) {
  const [activeSection, setActiveSection] = useState<PreviewSectionId>('hero')

  useEffect(() => {
    if (!('IntersectionObserver' in window) || sectionIds.length === 0) {
      setActiveSection('hero')
      return
    }

    const visible = new Map<PreviewSectionId, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as PreviewSectionId

          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio)
          } else {
            visible.delete(id)
          }
        })

        if (visible.size === 0) return

        let bestId: PreviewSectionId = 'hero'
        let bestRatio = -1

        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        setActiveSection(bestId)
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-18% 0px -48% 0px',
      },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)

      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
