import { memo } from 'react'

import { HOME_FEED_PAGE_SIZE } from '#/routes/_main/-queries/home-feed.queries'
import type { Post } from '../../../../types/post.types'

/**
 * Server-rendered SEO surface, decoupled from the (client-only, virtualized)
 * visible feed. Emits a Schema.org `ItemList` of `SocialMediaPosting` nodes so
 * crawlers get each post as a discrete rich result — author, date, body,
 * images, engagement — without needing the DOM rows to exist in SSR markup.
 *
 * Bounded to the first page: the initial set is what matters for indexing and
 * keeps the payload small even as the user scrolls thousands of posts.
 */
function buildPostNode(post: Post): Record<string, unknown> {
  const headline =
    post.text && post.text.length > 110
      ? `${post.text.slice(0, 107)}…`
      : (post.text ?? `${post.author.name} shared a post`)

  const node: Record<string, unknown> = {
    '@type': 'SocialMediaPosting',
    headline,
    datePublished: post.createdAt,
    author: {
      '@type': post.author.role === 'platform' ? 'Organization' : 'Person',
      name: post.author.name,
    },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: post.stats.likes,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: post.stats.comments,
      },
    ],
  }

  if (post.text) node.articleBody = post.text
  if (post.media.length > 0) node.image = post.media.map((m) => m.url)
  if (post.community) {
    node.isPartOf = { '@type': 'CreativeWork', name: post.community.name }
  }

  return node
}

interface HomeFeedSeoProps {
  posts: Array<Post>
}

export const HomeFeedSeo = memo(function HomeFeedSeo({
  posts,
}: HomeFeedSeoProps) {
  if (posts.length === 0) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, HOME_FEED_PAGE_SIZE).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildPostNode(post),
    })),
  }

  // Escape `<` so post text can never break out of the script element.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
})
