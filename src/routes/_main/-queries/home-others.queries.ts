import { QueryKeys } from '#/hooks/queries/queryKeys'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { fetchTrendingTopics } from '../-server/home-others'

export const trendingTopicQueryOptions = () => {
  return queryOptions({
    queryKey: [QueryKeys.topic.trending],
    queryFn: () => fetchTrendingTopics(),
  })
}

export const useTrendingTopicsQuery = () =>
  useQuery(trendingTopicQueryOptions())
