import { memo } from 'react'
import moment from 'moment'

interface RelativeTimeProps {
  /** ISO-8601 timestamp. */
  value: string
  className?: string
}

/**
 * Renders a relative timestamp (e.g. "2 hours ago"). `suppressHydrationWarning`
 * guards against the sub-second drift between server render and client hydration.
 */
export const RelativeTime = memo(function RelativeTime({
  value,
  className,
}: RelativeTimeProps) {
  return (
    <time className={className} dateTime={value} suppressHydrationWarning>
      {moment(value).fromNow()}
    </time>
  )
})
