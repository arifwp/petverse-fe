import { infiniteQueryOptions } from '@tanstack/react-query'

import { fetchHomeFeed } from '#/routes/_main/-server/home-feed'
import type { HomeFeedPage } from '#/routes/_main/-server/home-feed'

/** Default page size; the backend may override this per request later. */
export const HOME_FEED_PAGE_SIZE = 15

export interface HomeFeedListParams {
  pageSize: number
}

/**
 * Hierarchical query-key factory. Keys narrow from broad → specific so a single
 * call can invalidate the right scope:
 *   homeFeedKeys.all      → everything feed-related
 *   homeFeedKeys.lists()  → every paginated list
 *   homeFeedKeys.list(p)  → one list with specific params
 */
export const homeFeedKeys = {
  all: ['home-feed'] as const,
  lists: () => [...homeFeedKeys.all, 'list'] as const,
  list: (params: HomeFeedListParams) =>
    [...homeFeedKeys.lists(), params] as const,
}

export function homeFeedInfiniteQueryOptions(
  params: HomeFeedListParams = { pageSize: HOME_FEED_PAGE_SIZE },
) {
  return infiniteQueryOptions({
    queryKey: homeFeedKeys.list(params),
    queryFn: ({ pageParam }) =>
      fetchHomeFeed({ data: { page: pageParam, pageSize: params.pageSize } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: HomeFeedPage) => lastPage.nextPage,
    staleTime: 60_000,
  })
}
