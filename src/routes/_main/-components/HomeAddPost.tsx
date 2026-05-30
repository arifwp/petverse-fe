import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Input } from '#/components/ui/input'
import { useLoggedInUserQuery } from '#/hooks/queries/user.queries'
import { initials } from '#/lib/string'
import { HomePostShareTo } from './HomePostShareTo'

export const HomeAddPost = () => {
  const { data: loogedInUser } = useLoggedInUserQuery()

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="w-full gap-4 flex items-start">
        <Avatar size="lg">
          <AvatarImage src={loogedInUser?.avatarUrl} alt={loogedInUser?.name} />
          <AvatarFallback>{initials(loogedInUser?.name)}</AvatarFallback>
        </Avatar>

        <div className="w-full gap-1 flex flex-col">
          <HomePostShareTo />

          <Input
            className="p-0 dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
    </div>
  )
}
