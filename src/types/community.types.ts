/**
 * Domain types for a community shown in the home nav menu. These mirror the
 * shape the Go backend is expected to return so the frontend contract stays
 * stable when the mock server function is swapped for a real endpoint.
 */

export interface Community {
  id: string
  name: string
  /** URL-safe identifier used for routing (e.g. `/c/dogs`). */
  slug: string
  iconUrl: string
  memberCount: number
  /** Whether the current viewer has joined / follows this community. */
  isJoined: boolean
}
