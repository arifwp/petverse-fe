import { createFileRoute } from '@tanstack/react-router'
import { HomeFeed } from './-components/-navs/HomeFeed'
import { HomeNavMenu } from './-components/-navs/HomeNavMenu'
import { HomeOthers } from './-components/-navs/HomeOthers'
import { homeFeedInfiniteQueryOptions } from './-queries/home-feed.queries'

const SEO_TITLE = 'PetVerse — Pet Community Feed'
const SEO_DESCRIPTION =
  'Discover advice, rescues, and stories from the PetVerse community. Follow vets, rescues, and fellow pet owners across dog, cat, bird, aquarium, and reptile communities.'

export const Route = createFileRoute('/_main/')({
  component: App,
  loader: ({ context }) =>
    context.queryClient.ensureInfiniteQueryData(homeFeedInfiniteQueryOptions()),
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
    <div className="w-full h-full py-4 px-4 lg:px-0 flex items-start">
      <div className="hidden md:flex flex-1">
        <HomeNavMenu />
      </div>

      <div className="md:flex-2 flex flex-col items-center justify-center">
        <HomeFeed />
      </div>

      <div className="hidden md:flex flex-1">
        <HomeOthers />
      </div>
    </div>
  )
}
