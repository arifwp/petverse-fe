/**
 * Domain types for the authenticated viewer. These mirror the shape the Go
 * backend is expected to return so the frontend contract stays stable when the
 * mock server function is swapped for a real endpoint.
 */

export interface LoggedInUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
}
