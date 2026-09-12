import { apiFetch } from "@/services/api-client"
import type { HistoryListParams, PaginatedLiveSessions } from "@/types/history"
import type {
  ChatMessageWithModeration,
  LiveSessionAnalytics,
} from "@/types/live-session"

export const HistoryServices = {
  async listSessions({
    page,
    limit,
    search,
  }: HistoryListParams): Promise<PaginatedLiveSessions> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
    })
    return apiFetch(`/live-sessions/history?${params}`)
  },

  async getAnalytics(sessionId: string): Promise<LiveSessionAnalytics> {
    const { data } = await apiFetch(`/live-sessions/${sessionId}/analytics`)
    return data
  },

  async getMessages(sessionId: string): Promise<ChatMessageWithModeration[]> {
    const { data } = await apiFetch(`/live-sessions/${sessionId}/messages`)
    return data
  },
}
