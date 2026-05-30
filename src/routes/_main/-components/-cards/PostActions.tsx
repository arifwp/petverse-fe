import { memo } from 'react'
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { m } from '#/paraglide/messages'
import type { PostStats } from '../../../../types/post.types'

interface Props {
  stats: PostStats
}

/** Compact count formatting: 1234 → "1.2k". */
function formatCount(value: number): string {
  if (value < 1000) return String(value)
  const k = value / 1000
  return `${k % 1 === 0 ? k : k.toFixed(1)}k`
}

export const PostActions = memo(function PostActions({ stats }: Props) {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 px-2 hover:text-rose-500"
        aria-label={m.post_like()}
      >
        <Heart />
        <span className="tabular-nums">{formatCount(stats.likes)}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 px-2"
        aria-label={m.post_comment()}
      >
        <MessageCircle />
        <span className="tabular-nums">{formatCount(stats.comments)}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="px-2"
        aria-label={m.post_share()}
      >
        <Share />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="ml-auto gap-1.5 px-2 hover:text-primary"
        aria-label={m.post_bookmark()}
      >
        <Bookmark />
        <span className="tabular-nums">{formatCount(stats.bookmarks)}</span>
      </Button>
    </div>
  )
})
