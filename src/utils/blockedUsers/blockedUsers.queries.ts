import { QueryKeys } from '#/hooks/queries/queryKeys'
import type { BlockedUsersQuery } from '#/utils/blockedUsers/blockedUsers'
import {
  getBlockedUsers,
  unblockUser,
} from '#/utils/blockedUsers/blockedUsers.functions'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export const blockedUsersListOptions = (
  filters: BlockedUsersQuery,
  options?: { enabled?: boolean },
) =>
  queryOptions({
    queryKey: [QueryKeys.user.blocked, QueryKeys.list, filters],
    queryFn: () => getBlockedUsers({ data: filters }),
    enabled: options?.enabled,
    placeholderData: (prev) => prev,
  })

export const useBlockedUsersQuery = (
  filters: BlockedUsersQuery,
  options?: { enabled?: boolean },
) => useQuery(blockedUsersListOptions(filters, options))

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => unblockUser({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.user.blocked] })
    },
  })
}
