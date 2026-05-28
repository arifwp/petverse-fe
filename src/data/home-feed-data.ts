import type {
  PostAuthorRole,
  PostMedia,
  PostSeed,
} from '#/routes/_main/-components/-cards/post.types'

/**
 * Deterministic dummy home-feed dataset (30 posts). Values are derived from
 * the index with a stable hash — no `Math.random` / `Date.now` at module load —
 * so SSR output and client hydration always match.
 *
 * Variants are cycled so every required shape is represented:
 *  0. four images, no text
 *  1. four images + text, verified author
 *  2. text only, no image
 *  3. one image + text
 *  4. one image only
 */

const NAMES = [
  'Dr. Lena Park',
  'Maya Chen',
  'Sam Wilson',
  'Jordan Rivera',
  'Riley Chen',
  'Aiko Tanaka',
  'Noah Bennett',
  'Priya Nair',
  'Diego Santos',
  'Hana Kim',
] as const

const COMMUNITIES = [
  'Birds Community',
  'Aquariums Community',
  'Rescue Community',
  'Dogs Community',
  'Cats Community',
  'Reptiles Community',
] as const

const TEXTS = [
  'Quick PSA — if your dog is panting heavily after walks this week, check the pavement temperature first. Surface heat above 49°C / 120°F can burn paw pads within 60 seconds. AMA in comments.',
  'Mango figured out the food drawer this morning. We are no longer safe in this apartment.',
  'Three months into my first planted tank. The shrimp seem happy and the moss is finally taking hold.',
  "Update on Pepper — she's out of the shelter and curled up on the couch like she always lived here. Thanks to everyone who shared the listing.",
  'Reminder that annual dental checks catch the problems you cannot see. Tartar under the gumline is the silent one.',
  'First flight in the new aviary. Took him about ten minutes to trust the perch, then he refused to come down.',
  'Adoption day went better than expected. Two siblings, one carrier, zero regrets.',
  'Switched to a slow feeder bowl and meal times went from 30 seconds to a respectable five minutes.',
] as const

// Verified roles paired with their badge variant (cycled for variant 1 posts).
const VERIFIED_ROLES: Array<PostAuthorRole> = [
  'platform',
  'veterinarian',
  'verified_rescue',
]

/** Tiny stable hash so generated numbers vary but stay deterministic. */
function hash(seed: number, salt: number): number {
  const x = Math.sin(seed * 99.7 + salt * 12.3) * 10000
  return x - Math.floor(x)
}

function buildMedia(postId: string, count: number): Array<PostMedia> {
  return Array.from({ length: count }, (_, k) => ({
    id: `${postId}-m${k}`,
    url: `https://picsum.photos/seed/${postId}-${k}/800/600`,
    width: 800,
    height: 600,
  }))
}

function buildPost(index: number): PostSeed {
  const variant = index % 5
  const id = `post-${index + 1}`
  const name = NAMES[index % NAMES.length]
  const authorId = `author-${index % NAMES.length}`

  const isVerified = variant === 1
  const role: PostAuthorRole = isVerified
    ? VERIFIED_ROLES[index % VERIFIED_ROLES.length]
    : 'member'

  const mediaCount = variant === 0 || variant === 1 ? 4 : variant >= 3 ? 1 : 0
  const hasText = variant !== 0 && variant !== 4
  const hasCommunity = index % 3 !== 0

  return {
    id,
    author: {
      id: authorId,
      name,
      avatarUrl: `https://picsum.photos/seed/${authorId}/96/96`,
      petCount: 1 + Math.floor(hash(index, 1) * 18),
      role,
      isVerified,
    },
    community: hasCommunity
      ? {
          id: `community-${index % COMMUNITIES.length}`,
          name: COMMUNITIES[index % COMMUNITIES.length],
        }
      : null,
    text: hasText ? TEXTS[index % TEXTS.length] : null,
    media: buildMedia(id, mediaCount),
    stats: {
      likes: 12 + Math.floor(hash(index, 2) * 1400),
      comments: 3 + Math.floor(hash(index, 3) * 240),
      bookmarks: 5 + Math.floor(hash(index, 4) * 600),
    },
    minutesAgo: 8 + Math.floor(hash(index, 5) * 4320),
  }
}

export const HOME_FEED_POSTS: Array<PostSeed> = Array.from(
  { length: 30 },
  (_, index) => buildPost(index),
)
