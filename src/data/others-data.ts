import type { Topic } from '#/types/topic.types'

const COMMUNITIES = [
  { id: 2, name: '#Dogs' },
  { id: 1, name: '#Cats' },
  { id: 3, name: '#Birds' },
  { id: 4, name: '#Aquariums' },
  { id: 5, name: '#Reptiles' },
  { id: 6, name: '#Rescue' },
] as const

export const TOPICS_LIST: Array<Topic> = COMMUNITIES.map((seed, index) => ({
  id: `community-${index}`,
  name: seed.name,
}))
