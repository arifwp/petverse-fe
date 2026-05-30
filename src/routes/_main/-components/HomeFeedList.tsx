import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

import { HomeFeedItem } from '#/routes/_main/-components/-cards/HomeFeedItem'
import type { Post } from '#/types/post.types'

interface FeedListProps {
  posts: Array<Post>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

/**
 * Server-rendered feed list. Every loaded post is real DOM (great for SEO and
 * guaranteed visible), and an IntersectionObserver sentinel near the bottom
 * drives infinite scroll. Pagination keeps the DOM bounded in normal use.
 */
export function HomeFeedList({
  posts,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: FeedListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore()
      },
      { rootMargin: '800px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onLoadMore])

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((post) => (
        <HomeFeedItem key={post.id} post={post} />
      ))}

      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="flex justify-center py-6 text-muted-foreground"
        >
          {isFetchingNextPage && <Loader2 className="size-5 animate-spin" />}
        </div>
      )}
    </div>
  )
}
