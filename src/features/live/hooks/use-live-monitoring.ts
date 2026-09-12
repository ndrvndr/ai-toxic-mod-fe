import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { toast } from "@/components/ui/toast"

import {
  liveSessionsKeys,
  liveSessionsQueryOptions,
  startMonitoringMutationOptions,
  stopMonitoringMutationOptions,
} from "../queries/live-sessions.query"

const STORAGE_KEY = "activeLiveSessionId"

export function useLiveMonitoring() {
  const queryClient = useQueryClient()

  const sessionsQuery = useQuery(liveSessionsQueryOptions)

  const startMutation = useMutation({
    ...startMonitoringMutationOptions,
    onSuccess: ({ session }) => {
      localStorage.setItem(STORAGE_KEY, session.id)
      queryClient.invalidateQueries({ queryKey: liveSessionsKeys.all })
      toast.add({ type: "success", title: "Monitoring started" })
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to start monitoring",
      })
    },
  })

  const stopMutation = useMutation({
    ...stopMonitoringMutationOptions,
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEY)
      queryClient.invalidateQueries({ queryKey: liveSessionsKeys.all })
      toast.add({ type: "success", title: "Monitoring stopped" })
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to stop monitoring",
      })
    },
  })

  const activeSession = sessionsQuery.data?.find(
    (s) => s.id === localStorage.getItem(STORAGE_KEY) && s.status === "live"
  )

  return {
    activeSession,
    isLoading: sessionsQuery.isLoading,

    startMonitoring: startMutation.mutate,
    isStarting: startMutation.isPending,

    stopMonitoring: stopMutation.mutate,
    isStopping: stopMutation.isPending,
  }
}
