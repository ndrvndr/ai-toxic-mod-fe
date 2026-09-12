export type LiveSessionStatus = "live" | "ended"

export interface LiveSession {
  id: string
  connectionId: string
  platformLiveId: string
  title: string | null
  status: LiveSessionStatus
  startedAt: string
  endedAt: string | null
}

export interface ChatMessageEvent {
  id: string
  authorDisplayName: string
  text: string
  sentAt: string
  toxicityLabel: "safe" | "flagged"
  reason: string
}

export interface ModerationActionEvent {
  chatMessageId: string
  actionType: string
  status: "success" | "failed"
  reason: string
}

export interface ChatMessageWithModeration {
  id: string
  authorDisplayName: string | null
  messageText: string
  sentAt: string
  moderationResult: {
    toxicityLabel: "safe" | "borderline" | "toxic"
  } | null
  moderationActions: Array<{
    actionType: string
    status: "pending" | "success" | "failed"
    reason: string
  }>
}
