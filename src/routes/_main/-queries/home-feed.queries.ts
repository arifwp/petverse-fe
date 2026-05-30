import { infiniteQueryOptions } from '@tanstack/react-query'

import { QueryKeys } from '#/hooks/queries/queryKeys'
import type { HomeFeedPage } from '#/routes/_main/-server/home-feed'
import { fetchHomeFeed } from '#/routes/_main/-server/home-feed'

/** Default page size; the backend may override this per request later. */
export const HOME_FEED_PAGE_SIZE = 15

export interface HomeFeedListParams {
  pageSize: number
}

export function homeFeedInfiniteQueryOptions(
  params: HomeFeedListParams = { pageSize: HOME_FEED_PAGE_SIZE },
) {
  return infiniteQueryOptions({
    queryKey: [...QueryKeys.home.feed, QueryKeys.list, params],
    queryFn: ({ pageParam }) =>
      fetchHomeFeed({ data: { page: pageParam, pageSize: params.pageSize } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: HomeFeedPage) => lastPage.nextPage,
    staleTime: 60_000,
  })
}
