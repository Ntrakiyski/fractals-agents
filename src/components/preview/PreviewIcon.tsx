import { useRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'

import { BookTextIcon } from '../ui/book-text'
import { CalendarCheckIcon } from '../ui/calendar-check'
import { ChartLineIcon } from '../ui/chart-line'
import { GraduationCapIcon } from '../ui/graduation-cap'
import { LaptopMinimalCheckIcon } from '../ui/laptop-minimal-check'
import { MessageCircleIcon } from '../ui/message-circle'
import { MessageSquareIcon } from '../ui/message-square'
import { RefreshCWIcon } from '../ui/refresh-cw'
import { WaypointsIcon } from '../ui/waypoints'

import type { PreviewAspectIcon } from '../../content/previewContent'
import { useLoopingIconAnimation } from '../../hooks/useLoopingIconAnimation'

type LoopingIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type AnimatedIconComponent = ForwardRefExoticComponent<
  {
    className?: string
    size?: number
  } & RefAttributes<LoopingIconHandle>
>

const iconMap = {
  'book-text': BookTextIcon,
  'message-square': MessageSquareIcon,
  'calendar-check': CalendarCheckIcon,
  'laptop-minimal-check': LaptopMinimalCheckIcon,
  'message-circle': MessageCircleIcon,
  waypoints: WaypointsIcon,
  'chart-line': ChartLineIcon,
  'refresh-cw': RefreshCWIcon,
  'graduation-cap': GraduationCapIcon,
} satisfies Record<PreviewAspectIcon, AnimatedIconComponent>

export function PreviewIcon({
  name,
  initialDelayMs = 0,
}: {
  name: PreviewAspectIcon
  initialDelayMs?: number
}) {
  const Icon = iconMap[name]
  const iconRef = useRef<LoopingIconHandle | null>(null)

  useLoopingIconAnimation(iconRef, { initialDelayMs })

  return (
    <span className={`preview-icon preview-icon--${name}`} aria-hidden="true">
      <Icon ref={iconRef} className="text-current" size={20} />
    </span>
  )
}
