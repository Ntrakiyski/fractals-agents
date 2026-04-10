import { render } from '@testing-library/react'
import { useRef } from 'react'

import { useLoopingIconAnimation } from './useLoopingIconAnimation'

type LoopHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type TestIconLoopProps = LoopHandle & {
  cycleMs?: number
  initialDelayMs?: number
  resetMs?: number
}

function TestIconLoop({
  cycleMs,
  startAnimation,
  stopAnimation,
  initialDelayMs = 0,
  resetMs = 550,
}: TestIconLoopProps) {
  const ref = useRef<LoopHandle | null>({
    startAnimation,
    stopAnimation,
  })

  useLoopingIconAnimation(ref, {
    cycleMs,
    initialDelayMs,
    resetMs,
  })

  return null
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  )
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

it('starts icon animation on mount and keeps looping it', () => {
  const startAnimation = vi.fn()
  const stopAnimation = vi.fn()

  render(
    <TestIconLoop
      cycleMs={1200}
      startAnimation={startAnimation}
      stopAnimation={stopAnimation}
    />,
  )

  expect(startAnimation).toHaveBeenCalledTimes(1)
  expect(stopAnimation).not.toHaveBeenCalled()

  vi.advanceTimersByTime(550)
  expect(stopAnimation).toHaveBeenCalledTimes(1)

  vi.advanceTimersByTime(650)
  expect(startAnimation).toHaveBeenCalledTimes(2)
})

it('does not loop icon animation when reduced motion is requested', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  )

  const startAnimation = vi.fn()
  const stopAnimation = vi.fn()

  render(
    <TestIconLoop
      cycleMs={1200}
      startAnimation={startAnimation}
      stopAnimation={stopAnimation}
    />,
  )

  vi.advanceTimersByTime(2000)

  expect(startAnimation).not.toHaveBeenCalled()
  expect(stopAnimation).not.toHaveBeenCalled()
})

it('waits for the initial delay before starting the animation loop', () => {
  const startAnimation = vi.fn()
  const stopAnimation = vi.fn()

  render(
    <TestIconLoop
      cycleMs={1200}
      startAnimation={startAnimation}
      stopAnimation={stopAnimation}
      initialDelayMs={1000}
    />,
  )

  expect(startAnimation).not.toHaveBeenCalled()

  vi.advanceTimersByTime(999)
  expect(startAnimation).not.toHaveBeenCalled()

  vi.advanceTimersByTime(1)
  expect(startAnimation).toHaveBeenCalledTimes(1)

  vi.advanceTimersByTime(550)
  expect(stopAnimation).toHaveBeenCalledTimes(1)
})

it('rests for three seconds after an animation finishes before starting again', () => {
  const startAnimation = vi.fn()
  const stopAnimation = vi.fn()

  render(
    <TestIconLoop
      startAnimation={startAnimation}
      stopAnimation={stopAnimation}
      resetMs={550}
    />,
  )

  expect(startAnimation).toHaveBeenCalledTimes(1)

  vi.advanceTimersByTime(550)
  expect(stopAnimation).toHaveBeenCalledTimes(1)

  vi.advanceTimersByTime(2999)
  expect(startAnimation).toHaveBeenCalledTimes(1)

  vi.advanceTimersByTime(1)
  expect(startAnimation).toHaveBeenCalledTimes(2)
})
