import { useQuery } from "@tanstack/react-query"

import type { HistoryListParams } from "@/types/history"

import { sessionsListQueryOptions } from "../queries/history.query"

export function useHistoryList(params: HistoryListParams) {
  const query = useQuery(sessionsListQueryOptions(params))

  return {
    sessions: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
  }
}
