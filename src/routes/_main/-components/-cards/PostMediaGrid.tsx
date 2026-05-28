import { memo } from 'react'

import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import type { PostMedia } from './post.types'

interface PostMediaGridProps {
  media: Array<PostMedia>
  /** Used to build descriptive image alt text for accessibility & image SEO. */
  altPrefix?: string
}

/** Per-image grid placement keyed by total image count. */
const ITEM_CLASS: Record<number, Array<string>> = {
  1: ['col-span-2 aspect-[4/3]'],
  2: ['aspect-square', 'aspect-square'],
  3: ['col-span-2 aspect-[2/1]', 'aspect-square', 'aspect-square'],
  4: ['aspect-square', 'aspect-square', 'aspect-square', 'aspect-square'],
}

export const PostMediaGrid = memo(function PostMediaGrid({
  media,
  altPrefix,
}: PostMediaGridProps) {
  if (media.length === 0) return null

  const count = Math.min(media.length, 4)
  const placement = ITEM_CLASS[count] ?? ITEM_CLASS[4]
  const isGallery = count > 1

  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-2 gap-0.5">
        {media.slice(0, count).map((item, index) => (
          <div
            key={item.id}
            className={cn('overflow-hidden bg-muted', placement[index])}
          >
            <img
              src={item.url}
              alt={
                altPrefix
                  ? m.post_media_alt({
                      index: String(index + 1),
                      count: String(count),
                      author: altPrefix,
                    })
                  : ''
              }
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {isGallery && (
        <>
          <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white tabular-nums">
            1 / {media.length}
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1">
            {media.slice(0, 4).map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  'size-1.5 rounded-full',
                  index === 0 ? 'bg-white' : 'bg-white/50',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
})
