import { memo } from 'react'
import { BadgeCheck, MoreHorizontal } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import { RelativeTime } from './RelativeTime'
import type { PostAuthor, PostAuthorRole, PostCommunity } from './post.types'

interface PostHeaderProps {
  author: PostAuthor
  community: PostCommunity | null
  createdAt: string
}

const ROLE_LABEL: Record<Exclude<PostAuthorRole, 'member'>, () => string> = {
  veterinarian: m.role_veterinarian,
  verified_rescue: m.role_verified_rescue,
  platform: m.role_official,
}

function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').split(' ')
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase()
}

export const PostHeader = memo(function PostHeader({
  author,
  community,
  createdAt,
}: PostHeaderProps) {
  const roleLabel =
    author.role !== 'member' ? ROLE_LABEL[author.role]() : null

  return (
    <header className="flex items-start gap-3">
      <Avatar size="lg">
        <AvatarImage src={author.avatarUrl} alt={author.name} />
        <AvatarFallback>{initials(author.name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-semibold text-foreground">
            {author.name}
          </span>
          {author.isVerified && (
            <BadgeCheck
              className={cn(
                'size-4 shrink-0',
                author.role === 'platform'
                  ? 'text-primary'
                  : 'text-emerald-500',
              )}
              aria-label={m.post_verified_account()}
            />
          )}
          {roleLabel && (
            <Badge variant="secondary" className="ml-0.5">
              {roleLabel}
            </Badge>
          )}
        </div>

        <p className="truncate text-xs text-muted-foreground">
          {m.post_pet_count({ count: String(author.petCount) })}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {community ? (
            <>
              {m.post_posted_in()}{' '}
              <span className="text-foreground/80">{community.name}</span>
              {' · '}
            </>
          ) : null}
          <RelativeTime value={createdAt} />
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        className="-mr-1 text-muted-foreground"
        aria-label={m.post_more_options()}
      >
        <MoreHorizontal />
      </Button>
    </header>
  )
})
