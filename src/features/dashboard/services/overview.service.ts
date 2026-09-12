import { apiFetch } from "@/services/api-client"
import type { DashboardOverview } from "@/types/live-session"

export const OverviewServices = {
  async getOverview(): Promise<DashboardOverview> {
    const { data } = await apiFetch("/live-sessions/overview")
    return data
  },
}
