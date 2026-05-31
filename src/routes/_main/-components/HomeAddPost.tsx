import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { useLoggedInUserQuery } from '#/hooks/queries/user.queries'
import { initials } from '#/lib/string'
import { Image } from 'lucide-react'
import { useRef } from 'react'
import { HomePostShareTo } from './HomePostShareTo'

export const HomeAddPost = () => {
  const { data: loogedInUser } = useLoggedInUserQuery()
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="w-full gap-4 flex items-start">
        <Avatar size="lg">
          <AvatarImage src={loogedInUser?.avatarUrl} alt={loogedInUser?.name} />
          <AvatarFallback>{initials(loogedInUser?.name)}</AvatarFallback>
        </Avatar>

        <div className="w-full gap-1 flex flex-col">
          <HomePostShareTo />

          {/* <Input
            className="p-0 dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 wrap-break-word"
            placeholder="What's on your mind?"
          /> */}

          <Textarea
            placeholder="What's on your mind?"
            className="p-0 border-none shadow-none resize-none dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-h-10"
          />

          <div className="w-full gap-2 flex items-center justify-between">
            <Button
              variant="ghost"
              className="w-fit text-secondary-foreground"
              size="xs"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="size-4" />
              Add Photo
            </Button>

            <Button type="submit" size="xs" className="px-4 py-3" disabled>
              Post
            </Button>
          </div>

          <input
            multiple
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  )
}
