import { m } from '#/paraglide/messages'
import { createFileRoute } from '@tanstack/react-router'
import { HomeNavMenu } from './-components/-navs/HomeNavMenu'
import { HomeFeed } from './-components/-navs/HomeFeed'
import { HomeNews } from './-components/-navs/HomeNews'

export const Route = createFileRoute('/_main/')({ component: App })

function App() {
  return (
    <div className="w-full h-full py-4 px-4 lg:px-0 flex items-start">
      <div className="flex-1">
        <HomeNavMenu />
      </div>

      <div className="flex-1">
        <HomeFeed />
      </div>

      <div className="flex-1">
        <HomeNews />
      </div>
    </div>
  )
}
