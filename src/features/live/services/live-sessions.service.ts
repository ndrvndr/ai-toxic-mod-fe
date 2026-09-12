import { apiFetch } from "@/services/api-client"
import type {
  ChatMessageWithModeration,
  LiveSession,
} from "@/types/live-session"

export const LiveSessionsServices = {
  async listLiveSessions(): Promise<LiveSession[]> {
    const { data } = await apiFetch("/live-sessions")
    return data
  },

  async startMonitoring(): Promise<{ session: LiveSession; message: string }> {
    const { data } = await apiFetch("/live-sessions/start-monitoring", {
      method: "POST",
    })
    return data
  },

  async stopMonitoring(sessionId: string): Promise<{ message: string }> {
    const { data } = await apiFetch(
      `/live-sessions/${sessionId}/stop-monitoring`,
      {
        method: "POST",
      }
    )
    return data
  },

  async getMessages(sessionId: string): Promise<ChatMessageWithModeration[]> {
    const { data } = await apiFetch(`/live-sessions/${sessionId}/messages`)
    return data
  },
}
