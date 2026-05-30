import type { LoggedInUser } from '#/types/user.types'

/** Mock viewer returned by the logged-in user endpoint until the BE is ready. */
export const LOGGED_IN_USER: LoggedInUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  avatarUrl: 'https://picsum.photos/200/300',
}
