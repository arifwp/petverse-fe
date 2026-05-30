import { m } from '#/paraglide/messages'
import { HomeFeedSeo } from '#/routes/_main/-components/-cards/HomeFeedSeo'
import { homeFeedInfiniteQueryOptions } from '#/routes/_main/-queries/home-feed.queries'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { HomeFeedSkeleton } from './-skeletons/HomeFeedSkeleton'
import { HomeAddPost } from './HomeAddPost'
import { HomeFeedList } from './HomeFeedList'

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
    return <HomeFeedSkeleton />
  }

  if (status === 'error') {
    return (
      <div className="w-full max-w-xl py-10 text-center text-sm text-destructive">
        {m.feed_load_error()}
      </div>
    )
  }

  return (
    <div className="w-full gap-4 flex flex-col">
      <HomeFeedSeo posts={posts} />

      <HomeAddPost />

      <HomeFeedList
        posts={posts}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  )
}
