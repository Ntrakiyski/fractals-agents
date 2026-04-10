import { cn } from '@/lib/utils'

const accentSquares = [
  { x: 0.8, y: 4.8, fill: 'var(--brand-mark-1)' },
  { x: 4.9, y: 0.8, fill: 'var(--brand-mark-2)' },
  { x: 9, y: 4.1, fill: 'var(--brand-mark-3)' },
] as const

export function FractalsLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="fractal-mark" aria-hidden="true">
        <svg
          data-testid="brand-mark"
          data-logo-shape="cluster"
          viewBox="0 0 14 10"
          className="h-[16px] w-[22px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {accentSquares.map((square) => (
            <rect
              key={`${square.x}-${square.y}`}
              x={square.x}
              y={square.y}
              width="4"
              height="4"
              rx="1"
              fill={square.fill}
            />
          ))}
        </svg>
      </span>
      <span className="fractal-wordmark" data-testid="brand-wordmark">
        fractals
      </span>
    </span>
  )
}
