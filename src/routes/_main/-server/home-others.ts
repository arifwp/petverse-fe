import { createServerFn } from '@tanstack/react-start'

import { TOPICS_LIST } from '#/data/others-data'

/**
 * Mock communities endpoint for the home nav menu. Returns the viewer's
 * communities as a flat list, mirroring the contract the Go backend will
 * expose so the client query layer stays unchanged when this is replaced
 * with a real `fetch`.
 */
export const fetchTrendingTopics = createServerFn({ method: 'GET' }).handler(
  () => TOPICS_LIST,
)
