import type { BlockedUsersQuery } from '#/utils/blockedUsers/blockedUsers'

export const blockedUsersKeys = {
  all: ['blocked-users'] as const,
  lists: () => [...blockedUsersKeys.all, 'list'] as const,
  list: (filters: BlockedUsersQuery) =>
    [...blockedUsersKeys.lists(), filters] as const,
  details: () => [...blockedUsersKeys.all, 'detail'] as const,
  detail: (id: string) => [...blockedUsersKeys.details(), id] as const,
} as const
