import { queryOptions } from "@tanstack/react-query"

import { OverviewServices } from "../services/overview.service"

export const overviewQueryOptions = queryOptions({
  queryKey: ["overview"] as const,
  queryFn: OverviewServices.getOverview,
})
