import { queryOptions, mutationOptions } from "@tanstack/react-query"

import { LiveSessionsServices } from "../services/live-sessions.service"

export const liveSessionsKeys = {
  all: ["live-sessions"] as const,
  list: () => [...liveSessionsKeys.all, "list"] as const,
}

export const liveSessionsQueryOptions = queryOptions({
  queryKey: liveSessionsKeys.list(),
  queryFn: LiveSessionsServices.listLiveSessions,
})

export const startMonitoringMutationOptions = mutationOptions({
  mutationFn: LiveSessionsServices.startMonitoring,
})

export const stopMonitoringMutationOptions = mutationOptions({
  mutationFn: (sessionId: string) =>
    LiveSessionsServices.stopMonitoring(sessionId),
})

export const liveSessionMessagesQueryOptions = (sessionId: string) =>
  queryOptions({
    queryKey: [...liveSessionsKeys.all, sessionId, "messages"] as const,
    queryFn: () => LiveSessionsServices.getMessages(sessionId),
    enabled: !!sessionId,
  })
