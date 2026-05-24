import {
  blockedUserIdSchema,
  blockedUsersQuerySchema,
} from '#/utils/blockedUsers/blockedUsers'
import {
  queryBlockedUsers,
  removeBlockedUser,
} from '#/utils/blockedUsers/blockedUsers.server'
import { createServerFn } from '@tanstack/react-start'

export const getBlockedUsers = createServerFn({ method: 'GET' })
  .inputValidator(blockedUsersQuerySchema)
  .handler(({ data }) => queryBlockedUsers(data))

export const unblockUser = createServerFn({ method: 'POST' })
  .inputValidator(blockedUserIdSchema)
  .handler(({ data }) => removeBlockedUser(data))
