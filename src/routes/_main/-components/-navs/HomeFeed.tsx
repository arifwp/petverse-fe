import { useCallback, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { m } from '#/paraglide/messages'
import { FeedStructuredData } from '#/routes/_main/-components/-cards/FeedStructuredData'
import { homeFeedInfiniteQueryOptions } from '#/routes/_main/-queries/home-feed.queries'
import { FeedList } from './FeedList'
import { FeedSkeleton } from './FeedSkeleton'

/** Re-exported so the static dummy dataset is reachable from the feed module. */
export { HOME_FEED_POSTS } from '#/data/home-feed-data'

export const HomeFeed = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(homeFeedInfiniteQueryOptions())

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  )

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (status === 'pending') {
    return <FeedSkeleton />
  }

  if (status === 'error') {
    return (
      <div className="w-full max-w-xl py-10 text-center text-sm text-destructive">
        {m.feed_load_error()}
      </div>
    )
  }

  return (
    <>
      <FeedStructuredData posts={posts} />

      <FeedList
        posts={posts}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </>
  )
}
