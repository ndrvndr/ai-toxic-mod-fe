import { useQuery } from "@tanstack/react-query"

import {
  sessionAnalyticsQueryOptions,
  sessionMessagesQueryOptions,
} from "../queries/history.query"

export function useSessionDetail(sessionId: string) {
  const analyticsQuery = useQuery(sessionAnalyticsQueryOptions(sessionId))
  const messagesQuery = useQuery(sessionMessagesQueryOptions(sessionId))

  return {
    analytics: analyticsQuery.data,
    messages: messagesQuery.data ?? [],
    isLoading: analyticsQuery.isLoading || messagesQuery.isLoading,
  }
}
