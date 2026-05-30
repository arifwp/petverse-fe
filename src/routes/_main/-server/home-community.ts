import { createServerFn } from '@tanstack/react-start'

import { COMMUNITIES_LIST } from '#/data/communities-data'
import type { Community } from '#/types/community.types'

/**
 * Mock communities endpoint for the home nav menu. Returns the viewer's
 * communities as a flat list, mirroring the contract the Go backend will
 * expose so the client query layer stays unchanged when this is replaced
 * with a real `fetch`.
 */
export const fetchCommunities = createServerFn({ method: 'GET' }).handler(
  (): Array<Community> => COMMUNITIES_LIST,
)
