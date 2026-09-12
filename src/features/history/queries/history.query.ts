import { queryOptions } from "@tanstack/react-query"

import type { HistoryListParams } from "@/types/history"

import { HistoryServices } from "../services/history.service"

export const historyKeys = {
  all: ["history"] as const,
  list: (params: HistoryListParams) =>
    [...historyKeys.all, "list", params] as const,
  analytics: (sessionId: string) =>
    [...historyKeys.all, sessionId, "analytics"] as const,
  messages: (sessionId: string) =>
    [...historyKeys.all, sessionId, "messages"] as const,
}

export const sessionsListQueryOptions = (params: HistoryListParams) =>
  queryOptions({
    queryKey: historyKeys.list(params),
    queryFn: () => HistoryServices.listSessions(params),
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
