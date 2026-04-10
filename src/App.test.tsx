import { act, render, screen, within } from '@testing-library/react'

import App from './App'

type ObserverEntry = {
  observer: MockIntersectionObserver
  elements: Set<Element>
}

const observerEntries: ObserverEntry[] = []

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback
  private elements = new Set<Element>()

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    observerEntries.push({ observer: this, elements: this.elements })
  }

  observe = (element: Element) => {
    this.elements.add(element)
  }

  unobserve = (element: Element) => {
    this.elements.delete(element)
  }

  disconnect = () => {
    this.elements.clear()
  }

  takeRecords = () => []

  trigger(target: Element, isIntersecting: boolean, intersectionRatio: number) {
    this.callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    )
  }
}

function triggerIntersection(
  target: Element,
  options: { isIntersecting?: boolean; intersectionRatio?: number } = {},
) {
  const { isIntersecting = true, intersectionRatio = 0.75 } = options

  observerEntries.forEach(({ observer, elements }) => {
    if (elements.has(target)) {
      observer.trigger(target, isIntersecting, intersectionRatio)
    }
  })
}

beforeEach(() => {
  observerEntries.length = 0
  localStorage.clear()
  document.documentElement.dataset.theme = 'dark'

  vi.stubGlobal(
    'IntersectionObserver',
    MockIntersectionObserver as unknown as typeof IntersectionObserver,
  )

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0)
    return 1
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('renders the preview shell with visible hero copy before observers reveal content', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', { level: 1, name: 'Automate everything.' }),
  ).toBeVisible()
  expect(
    screen.getByText('Stop being good at doing. Start being good at directing.'),
  ).toBeVisible()
  expect(
    screen.queryByText(
      /Fractals builds the systems your team actually needs/i,
    ),
  ).not.toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'One place to ask, assign, and schedule',
    }),
  ).toBeVisible()
})

it('loads a persisted light theme and flips the toggle label accordingly', () => {
  localStorage.setItem('fractals-preview-theme', 'light')

  render(<App />)

  expect(document.documentElement.dataset.theme).toBe('light')
  const toggle = screen.getByRole('button', { name: 'Switch to dark mode' })
  const iconCapsule = toggle.querySelector('.theme-toggle-icon')

  expect(toggle).toHaveAttribute('data-theme-icon', 'sun')
  expect(toggle.className).toContain('fixed')
  expect(toggle.className).toContain('bottom-5')
  expect(toggle.className).toContain('left-5')
  expect(iconCapsule?.className).not.toContain('border')
})

it('renders the top dock as a shrink-wrapped cluster instead of a full-width rail', () => {
  render(<App />)

  const dock = screen.getByTestId('preview-dock')

  expect(dock.className).toContain('w-fit')
  expect(dock.className).not.toContain('w-full')
})

it('uses question-word labels for the dock links', () => {
  render(<App />)

  const navigation = screen.getByRole('navigation')
  const brandLink = within(navigation).getByRole('link', { name: 'Fractals' })
  const labels = within(navigation)
    .getAllByRole('link')
    .slice(1)
    .map((link) => link.textContent)

  expect(brandLink).toHaveAttribute('href', '#hero')
  expect(labels).toEqual(['Why', 'What', 'How', 'What next'])
  expect(within(navigation).queryByRole('link', { name: 'Services' })).not.toBeInTheDocument()
  expect(within(navigation).queryByRole('link', { name: 'Who' })).not.toBeInTheDocument()
})

it('renders the brand as a lowercase fractals wordmark with a 3-square accent mark', () => {
  render(<App />)

  const mark = screen.getByTestId('brand-mark')
  const wordmark = screen.getByTestId('brand-wordmark')

  expect(wordmark).toHaveTextContent('fractals')
  expect(mark).toHaveAttribute('data-logo-shape', 'cluster')
  expect(mark.querySelectorAll('rect')).toHaveLength(3)
})

it('uses a tighter, wider layout for the positioning section', () => {
  render(<App />)

  const statementSection = document.getElementById('statement')
  const statementCard = statementSection?.querySelector('.paper-scene')
  const statementGrid = statementCard?.querySelector('.grid')
  const statementTitle = screen.getByText(
    'Fractals builds AI systems and teaches teams how to direct them.',
  )
  const statementBody = screen.getByText(
    /The point is not to drop in a tool and disappear/i,
  )
  const statementRail = statementBody.closest('div')

  expect(statementCard?.className).toContain('md:py-10')
  expect(statementGrid?.className).toContain('gap-8')
  expect(statementGrid?.className).toContain(
    'lg:grid-cols-[minmax(0,1.35fr)_minmax(24rem,28rem)]',
  )
  expect(statementTitle.className).toContain('max-w-[15ch]')
  expect(statementRail?.className).toContain('max-w-[28rem]')
})

it('updates the active dock link when a section becomes the strongest visible match', () => {
  render(<App />)

  const proofSection = document.getElementById('proof')
  expect(proofSection).not.toBeNull()

  act(() => {
    triggerIntersection(proofSection as HTMLElement, { intersectionRatio: 0.8 })
  })

  const navigation = screen.getByRole('navigation')
  const servicesLink = within(navigation).getByRole('link', { name: 'What' })

  expect(servicesLink).toHaveAttribute('aria-current', 'true')
  expect(servicesLink).toHaveAttribute('data-active', 'true')
})

it('switches the proof detail panel when scroll favors another service row', () => {
  render(<App />)

  const assistantRow = document.querySelector('[data-proof-card="assistant"]')
  const operatorRow = document.querySelector('[data-proof-card="operator"]')
  const builderRow = document.querySelector('[data-proof-card="builder"]')

  expect(assistantRow).not.toBeNull()
  expect(operatorRow).not.toBeNull()
  expect(builderRow).not.toBeNull()

  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    writable: true,
    value: 1000,
  })

  vi.spyOn(assistantRow as HTMLElement, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: -450,
    top: -450,
    bottom: -50,
    left: 0,
    right: 100,
    width: 100,
    height: 400,
    toJSON: () => ({}),
  } as DOMRect)

  vi.spyOn(operatorRow as HTMLElement, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 250,
    top: 250,
    bottom: 850,
    left: 0,
    right: 100,
    width: 100,
    height: 600,
    toJSON: () => ({}),
  } as DOMRect)

  vi.spyOn(builderRow as HTMLElement, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 1100,
    top: 1100,
    bottom: 1700,
    left: 0,
    right: 100,
    width: 100,
    height: 600,
    toJSON: () => ({}),
  } as DOMRect)

  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })

  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'A proactive digital teammate',
    }),
  ).toBeVisible()
})
