import { createServerFn } from '@tanstack/react-start'

import { LOGGED_IN_USER } from '#/data/user-data'
import type { LoggedInUser } from '#/types/user.types'

/**
 * Mock logged-in user endpoint. Mirrors the contract the Go backend will expose
 * (resolving the viewer from the session) so the client query layer stays
 * unchanged when this is replaced with a real `fetch`.
 */
export const fetchLoggedInUser = createServerFn({ method: 'GET' }).handler(
  (): LoggedInUser => LOGGED_IN_USER,
)
