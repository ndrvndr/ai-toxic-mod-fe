import { queryOptions } from "@tanstack/react-query"

import { HistoryServices } from "../services/history.service"

export const historyKeys = {
  all: ["history"] as const,
  list: () => [...historyKeys.all, "list"] as const,
  analytics: (sessionId: string) =>
    [...historyKeys.all, sessionId, "analytics"] as const,
  messages: (sessionId: string) =>
    [...historyKeys.all, sessionId, "messages"] as const,
}

export const sessionsListQueryOptions = queryOptions({
  queryKey: historyKeys.list(),
  queryFn: HistoryServices.listSessions,
})

export const sessionAnalyticsQueryOptions = (sessionId: string) =>
  queryOptions({
    queryKey: historyKeys.analytics(sessionId),
    queryFn: () => HistoryServices.getAnalytics(sessionId),
  })

export const sessionMessagesQueryOptions = (sessionId: string) =>
  queryOptions({
    queryKey: historyKeys.messages(sessionId),
    queryFn: () => HistoryServices.getMessages(sessionId),
  })
