import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryKeys } from './queryKeys'
import { fetchLoggedInUser } from '#/servers/users'

export function loggedInUserQueryOptions() {
  return queryOptions({
    queryKey: [QueryKeys.user.loggedIn],
    queryFn: () => fetchLoggedInUser(),
    staleTime: 5 * 60_000,
  })
}

export const useLoggedInUserQuery = () => useQuery(loggedInUserQueryOptions())
