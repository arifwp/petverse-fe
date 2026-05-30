import { m } from '#/paraglide/messages'
import { Link } from '@tanstack/react-router'
import { useTrendingTopicsQuery } from '../-queries/home-others.queries'

export const HomeOthers = () => {
  const { data: trendingTopics } = useTrendingTopicsQuery()

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="flex flex-col">
        <h5 className="text-xs font-medium tracking-wider uppercase text-secondary-foreground">
          {m.trending_topics()}
        </h5>

        <div className="w-full flex flex-col">
          {trendingTopics?.map((topic) => (
            <Link
              to="/search"
              key={topic.id}
              className="text-sm p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <p className="font-medium">{topic.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
