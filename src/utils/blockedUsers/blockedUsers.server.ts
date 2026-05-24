import type {
  BlockedUser,
  BlockedUsersQuery,
  BlockedUsersResponse,
} from '#/utils/blockedUsers/blockedUsers'

const FIRST_NAMES = [
  'Riley',
  'Jordan',
  'Sam',
  'Avery',
  'Casey',
  'Morgan',
  'Taylor',
  'Quinn',
  'Reese',
  'Skyler',
  'Hayden',
  'Parker',
  'Drew',
  'Emerson',
  'Finley',
  'Gray',
  'Harper',
  'Indigo',
  'Jess',
  'Kai',
  'Lane',
  'Micah',
  'Nico',
  'Owen',
  'Peyton',
  'Rowan',
  'Sage',
  'Tatum',
]
const LAST_NAMES = [
  'Chen',
  'Park',
  'Vega',
  'Lin',
  'Mendoza',
  'Tate',
  'Nguyen',
  'Patel',
  'Hughes',
  'Reyes',
  'Singh',
  'Diaz',
  'Walker',
  'Bennett',
  'Sullivan',
  'Watson',
  'Russell',
  'Foster',
  'Wood',
  'Hayes',
  'Hill',
  'Long',
  'Brooks',
  'Bell',
  'Coleman',
  'Powell',
  'Perry',
  'Murphy',
]

const MOCK_BLOCKED_USERS: ReadonlyArray<BlockedUser> = Array.from(
  { length: 28 },
  (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[i % LAST_NAMES.length]
    const blockedDate = new Date()
    blockedDate.setMonth(blockedDate.getMonth() - i)
    return {
      id: `usr_${i + 1}`,
      name: `${first} ${last}`,
      username: `${first.toLowerCase()}${i + 1}`,
      blockedAt: blockedDate.toISOString(),
    }
  },
)

export const queryBlockedUsers = async (
  filters: BlockedUsersQuery,
): Promise<BlockedUsersResponse> => {
  await new Promise((r) => setTimeout(r, 400))

  const query = filters.search.trim().toLowerCase()
  const filtered = query
    ? MOCK_BLOCKED_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query),
      )
    : MOCK_BLOCKED_USERS

  const start = (filters.page - 1) * filters.pageSize
  return {
    items: filtered.slice(start, start + filters.pageSize),
    total: filtered.length,
  }
}

export const removeBlockedUser = async (
  id: string,
): Promise<{ id: string }> => {
  await new Promise((r) => setTimeout(r, 250))
  return { id }
}
