import { createServerFn } from '@tanstack/react-start'

import { HOME_FEED_POSTS } from '#/data/home-feed-data'
import type { Post } from '#/routes/_main/-components/-cards/post.types'

export interface HomeFeedQuery {
  page: number
  pageSize: number
}

export interface HomeFeedPage {
  items: Array<Post>
  page: number
  pageSize: number
  total: number
  /** Next page number, or `null` when the last page has been reached. */
  nextPage: number | null
}

function toPost(seed: (typeof HOME_FEED_POSTS)[number], now: number): Post {
  const { minutesAgo, ...rest } = seed
  return {
    ...rest,
    createdAt: new Date(now - minutesAgo * 60_000).toISOString(),
  }
}

/**
 * Mock paginated feed endpoint. Mirrors the cursor-less page/pageSize contract
 * the Go backend will expose, so the client query layer stays unchanged when
 * this is replaced with a real `fetch`.
 */
export const fetchHomeFeed = createServerFn({ method: 'GET' })
  .inputValidator((input: HomeFeedQuery): HomeFeedQuery => {
    const page = Number.isFinite(input.page) ? Math.max(1, input.page) : 1
    const pageSize = Number.isFinite(input.pageSize)
      ? Math.min(50, Math.max(1, input.pageSize))
      : 15
    return { page, pageSize }
  })
  .handler(({ data }): HomeFeedPage => {
    const { page, pageSize } = data
    const now = Date.now()
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const items = HOME_FEED_POSTS.slice(start, end).map((seed) =>
      toPost(seed, now),
    )

    return {
      items,
      page,
      pageSize,
      total: HOME_FEED_POSTS.length,
      nextPage: end < HOME_FEED_POSTS.length ? page + 1 : null,
    }
  })
