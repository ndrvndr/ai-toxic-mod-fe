import { useQuery } from "@tanstack/react-query"

import { overviewQueryOptions } from "../queries/overview.query"

export function useOverview() {
  const query = useQuery(overviewQueryOptions)

  return {
    overview: query.data,
    isLoading: query.isLoading,
  }
}
