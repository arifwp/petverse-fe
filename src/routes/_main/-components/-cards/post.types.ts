/**
 * Domain types for a home-feed post. These mirror the shape the Go backend
 * is expected to return so the frontend contract stays stable when the mock
 * server function is swapped for a real endpoint.
 */

export type PostAuthorRole =
  | 'member'
  | 'veterinarian'
  | 'verified_rescue'
  | 'platform'

export interface PostAuthor {
  id: string
  name: string
  avatarUrl: string
  petCount: number
  role: PostAuthorRole
  /** Admin / platform-management accounts and reviewed professionals. */
  isVerified: boolean
}

export interface PostCommunity {
  id: string
  name: string
}

export interface PostMedia {
  id: string
  url: string
  width: number
  height: number
}

export interface PostStats {
  likes: number
  comments: number
  bookmarks: number
}

export interface Post {
  id: string
  author: PostAuthor
  community: PostCommunity | null
  text: string | null
  /** 0–4 images. An empty array renders a text-only post. */
  media: Array<PostMedia>
  stats: PostStats
  /** ISO-8601 timestamp, formatted relatively on render. */
  createdAt: string
}

/**
 * Static seed shape. `createdAt` is derived from `minutesAgo` inside the
 * server function at request time so relative times stay fresh and identical
 * across SSR and client hydration (the client reads the serialized payload,
 * never recomputes the timestamp).
 */
export type PostSeed = Omit<Post, 'createdAt'> & { minutesAgo: number }
