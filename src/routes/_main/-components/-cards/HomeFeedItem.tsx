import { memo } from 'react'

import { PostActions } from './PostActions'
import { PostHeader } from './PostHeader'
import { PostMediaGrid } from './PostMediaGrid'
import type { Post } from './post.types'

interface HomeFeedItemProps {
  post: Post
}

/**
 * Single feed card. Memoized so re-renders of the virtualized list (scroll,
 * pagination) don't re-render cards whose `post` reference is unchanged.
 */
export const HomeFeedItem = memo(function HomeFeedItem({
  post,
}: HomeFeedItemProps) {
  return (
    <article className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <PostHeader
        author={post.author}
        community={post.community}
        createdAt={post.createdAt}
      />

      {post.text && (
        <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
          {post.text}
        </p>
      )}

      <PostMediaGrid media={post.media} altPrefix={post.author.name} />

      <PostActions stats={post.stats} />
    </article>
  )
})
