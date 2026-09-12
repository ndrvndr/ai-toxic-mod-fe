import { apiFetch } from "@/services/api-client"
import type {
  ChatMessageWithModeration,
  LiveSession,
  LiveSessionAnalytics,
} from "@/types/live-session"

export const HistoryServices = {
  async listSessions(): Promise<LiveSession[]> {
    const { data } = await apiFetch("/live-sessions")
    return data
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
