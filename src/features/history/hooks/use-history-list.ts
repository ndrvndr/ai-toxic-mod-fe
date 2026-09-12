import { useQuery } from "@tanstack/react-query"

import { sessionsListQueryOptions } from "../queries/history.query"

export function useHistoryList() {
  const query = useQuery(sessionsListQueryOptions)

  return {
    sessions: query.data ?? [],
    isLoading: query.isLoading,
  }
}
