import { z } from 'zod'

export const blockedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  blockedAt: z.string(),
})

export const blockedUsersResponseSchema = z.object({
  items: z.array(blockedUserSchema).readonly(),
  total: z.number().int().nonnegative(),
})

export const blockedUsersQuerySchema = z.object({
  search: z.string().default(''),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
})

export const blockedUserIdSchema = z.string().min(1)

export type BlockedUser = z.infer<typeof blockedUserSchema>
export type BlockedUsersResponse = z.infer<typeof blockedUsersResponseSchema>
export type BlockedUsersQuery = z.infer<typeof blockedUsersQuerySchema>
export type BlockedUsersQueryInput = z.input<typeof blockedUsersQuerySchema>
