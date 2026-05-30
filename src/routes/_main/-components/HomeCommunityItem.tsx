import { memo } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { m } from '#/paraglide/messages'
import type { Community } from '#/types/community.types'
import { Link } from '@tanstack/react-router'
import { initials } from '#/lib/string'
import { countFormatter } from '#/lib/number'

interface Props {
  community: Community
}

export const HomeCommunityItem = memo(function HomeCommunityItem({
  community,
}: Props) {
  return (
    <Link
      to={`/community/$communityId`}
      params={{ communityId: community.id }}
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
    >
      <Avatar size="lg">
        <AvatarImage src={community.iconUrl} alt={community.name} />
        <AvatarFallback>{initials(community.name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {community.name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {m.community_members({
            count: countFormatter.format(community.memberCount),
          })}
        </p>
      </div>
    </Link>
  )
})
