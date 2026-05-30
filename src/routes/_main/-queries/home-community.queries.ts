import { queryOptions, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '#/hooks/queries/queryKeys'
import { fetchCommunities } from '../-server/home-community'

export function communitiesQueryOptions() {
  return queryOptions({
    queryKey: [QueryKeys.community.list, QueryKeys.list],
    queryFn: () => fetchCommunities(),
    staleTime: 5 * 60_000,
  })
}

export function communitiesLoggedInUserQueryOptions() {
  return queryOptions({
    queryKey: [
      QueryKeys.community.list,
      QueryKeys.user.loggedIn,
      QueryKeys.list,
    ],
    queryFn: () => fetchCommunities(),
  })
}

export const useCommunitiesQuery = () => useQuery(communitiesQueryOptions())
