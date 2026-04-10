import { useEffect } from 'react'

type LoopingIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type UseLoopingIconAnimationOptions = {
  cycleMs?: number
  initialDelayMs?: number
  resetMs?: number
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useLoopingIconAnimation(
  ref: React.RefObject<LoopingIconHandle | null>,
  options: UseLoopingIconAnimationOptions = {},
) {
  const { cycleMs, initialDelayMs = 0, resetMs = 650 } = options
  const effectiveCycleMs = cycleMs ?? resetMs + 3000

  useEffect(() => {
    if (prefersReducedMotion()) return

    let cycleTimer: number | undefined
    let startTimer: number | undefined
    let stopTimer: number | undefined

    const runCycle = () => {
      ref.current?.startAnimation()

      window.clearTimeout(stopTimer)
      stopTimer = window.setTimeout(() => {
        ref.current?.stopAnimation()
      }, resetMs)
    }

    const startLoop = () => {
      runCycle()
      cycleTimer = window.setInterval(runCycle, effectiveCycleMs)
    }

    if (initialDelayMs > 0) {
      startTimer = window.setTimeout(startLoop, initialDelayMs)
    } else {
      startLoop()
    }

    return () => {
      window.clearInterval(cycleTimer)
      window.clearTimeout(startTimer)
      window.clearTimeout(stopTimer)
      ref.current?.stopAnimation()
    }
  }, [effectiveCycleMs, initialDelayMs, ref, resetMs])
}
