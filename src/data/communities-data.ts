import type { Community } from '#/types/community.types'

/**
 * Deterministic dummy community dataset for the home nav menu. Member counts
 * are derived from the index with a stable hash — no `Math.random` / `Date.now`
 * at module load — so SSR output and client hydration always match.
 */

const COMMUNITIES = [
  { name: 'Dogs Community', slug: 'dogs' },
  { name: 'Cats Community', slug: 'cats' },
  { name: 'Birds Community', slug: 'birds' },
  { name: 'Aquariums Community', slug: 'aquariums' },
  { name: 'Reptiles Community', slug: 'reptiles' },
  { name: 'Rescue Community', slug: 'rescue' },
] as const

/** Tiny stable hash so generated numbers vary but stay deterministic. */
function hash(seed: number, salt: number): number {
  const x = Math.sin(seed * 99.7 + salt * 12.3) * 10000
  return x - Math.floor(x)
}

export const COMMUNITIES_LIST: Array<Community> = COMMUNITIES.map(
  (seed, index) => ({
    id: `community-${index}`,
    name: seed.name,
    slug: seed.slug,
    iconUrl: `https://picsum.photos/seed/community-${seed.slug}/96/96`,
    memberCount: 1200 + Math.floor(hash(index, 1) * 48_000),
    isJoined: index % 2 === 0,
  }),
)
