import { createFileRoute } from '@tanstack/react-router'
import { HomeFeed } from './-components/HomeFeed'
import { HomeCommunities } from './-components/HomeCommunities'
import { HomeOthers } from './-components/HomeOthers'
import { communitiesQueryOptions } from './-queries/home-community.queries'
import { homeFeedInfiniteQueryOptions } from './-queries/home-feed.queries'
import { loggedInUserQueryOptions } from '#/hooks/queries/user.queries'
import { trendingTopicQueryOptions } from './-queries/home-others.queries'

const SEO_TITLE = 'PetVerse — Pet Community Feed'
const SEO_DESCRIPTION =
  'Discover advice, rescues, and stories from the PetVerse community. Follow vets, rescues, and fellow pet owners across dog, cat, bird, aquarium, and reptile communities.'

export const Route = createFileRoute('/_main/')({
  component: App,
  // Prefetch (not ensure) so the queries warm the cache during SSR without a
  // failing fetch taking down the whole route — each section owns its own
  // loading/error state via its hook. See HomeFeed's skeleton/error branches.
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.prefetchInfiniteQuery(homeFeedInfiniteQueryOptions()),
      context.queryClient.prefetchQuery(communitiesQueryOptions()),
      context.queryClient.prefetchQuery(trendingTopicQueryOptions()),
      context.queryClient.prefetchQuery(loggedInUserQueryOptions()),
    ]),
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: 'description', content: SEO_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: SEO_TITLE },
      { property: 'og:description', content: SEO_DESCRIPTION },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SEO_TITLE },
      { name: 'twitter:description', content: SEO_DESCRIPTION },
    ],
  }),
})

function App() {
  return (
    <div className="w-full h-full p-4 gap-4 flex items-start">
      <div className="hidden md:flex flex-1">
        <HomeCommunities />
      </div>

      <div className="md:flex-3 flex flex-col items-center justify-center">
        <HomeFeed />
      </div>

      <div className="hidden md:flex flex-1">
        <HomeOthers />
      </div>
    </div>
  )
}
