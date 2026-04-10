import { useEffect, useState, type RefObject } from 'react'

import type { PreviewServiceKey } from '../content/previewContent'

export function useProofSectionState(
  assistantRef: RefObject<HTMLElement | null>,
  operatorRef: RefObject<HTMLElement | null>,
  builderRef: RefObject<HTMLElement | null>,
) {
  const [activeKey, setActiveKey] = useState<PreviewServiceKey>('assistant')

  useEffect(() => {
    let ticking = false

    const getRows = (): Array<[PreviewServiceKey, HTMLElement | null]> => [
      ['assistant', assistantRef.current],
      ['operator', operatorRef.current],
      ['builder', builderRef.current],
    ]

    const syncToScroll = () => {
      const readingLine = window.innerHeight * 0.42
      let bestKey: PreviewServiceKey | null = null
      let bestDistance = Number.POSITIVE_INFINITY

      getRows().forEach(([key, row]) => {
        if (!row) return

        const rect = row.getBoundingClientRect()

        if (rect.bottom < 0 || rect.top > window.innerHeight) return

        const midpoint = rect.top + rect.height / 2
        const distance = Math.abs(midpoint - readingLine)

        if (distance < bestDistance) {
          bestDistance = distance
          bestKey = key
        }
      })

      if (bestKey) {
        setActiveKey(bestKey)
      }
    }

    const requestSync = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        syncToScroll()
        ticking = false
      })
    }

    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync)
    requestSync()

    return () => {
      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)
    }
  }, [assistantRef, operatorRef, builderRef])

  return activeKey
}
