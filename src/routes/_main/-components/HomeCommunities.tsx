import { Button } from '#/components/ui/button'
import { m } from '#/paraglide/messages'
import { useCommunitiesQuery } from '#/routes/_main/-queries/home-community.queries'
import type { Community } from '#/types/community.types'
import { HomeCommunitySkeleton } from './-skeletons/HomeCommunitySkeleton'
import { HomeCommunityItem } from './HomeCommunityItem'

export const HomeCommunities = () => {
  const { data: communities, status } = useCommunitiesQuery()

  return (
    <div className="w-full gap-4 flex flex-col">
      <h5 className="text-xs font-medium tracking-wider uppercase text-secondary-foreground">
        {m.community()}
      </h5>

      <div className="w-full gap-1 flex flex-col">
        {status === 'pending' && <HomeCommunitySkeleton />}

        {status === 'error' && (
          <p className="px-2 py-1.5 text-sm text-destructive">
            {m.community_load_error()}
          </p>
        )}

        {status === 'success' &&
          (communities.length === 0 ? (
            <div className="w-full p-4 gap-4 text-sm text-muted-foreground rounded-md bg-emerald-100/80 dark:bg-emerald-950/80 flex flex-col text-start">
              <p className="text-sm text-secondary-foreground">
                {m.community_empty()}
              </p>

              <Button>{m.community_explore()}</Button>
            </div>
          ) : (
            communities.map((community: Community) => (
              <HomeCommunityItem key={community.id} community={community} />
            ))
          ))}
      </div>
    </div>
  )
}
