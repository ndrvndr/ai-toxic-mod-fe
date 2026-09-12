import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import type {
  ChatMessageEvent,
  ModerationActionEvent,
} from "@/types/live-session"

import { liveSessionMessagesQueryOptions } from "../queries/live-sessions.query"

interface FeedItem extends ChatMessageEvent {
  actionStatus?: "success" | "failed"
  actionType?: string
}

export function useLiveFeed(liveSessionId: string | undefined) {
  const [messages, setMessages] = useState<FeedItem[]>([])
  const [connected, setConnected] = useState(false)

  const historyQuery = useQuery({
    ...liveSessionMessagesQueryOptions(liveSessionId ?? ""),
    enabled: !!liveSessionId,
  })

  useEffect(() => {
    if (!historyQuery.data) return

    const hydrated: FeedItem[] = historyQuery.data
      .map((msg) => {
        const hasAction = msg.moderationActions.length > 0
        const firstAction = msg.moderationActions[0]

        return {
          id: msg.id,
          authorDisplayName: msg.authorDisplayName ?? "Unknown",
          text: msg.messageText,
          sentAt: msg.sentAt,
          toxicityLabel: hasAction ? "flagged" : "safe",
          reason: hasAction ? firstAction.reason : "",
          actionType: hasAction ? firstAction.actionType : undefined,
          actionStatus:
            hasAction && firstAction.status !== "pending"
              ? firstAction.status
              : undefined,
        } satisfies FeedItem
      })
      .reverse()
    setMessages(hydrated)
  }, [historyQuery.data])

  useEffect(() => {
    if (!liveSessionId) return

    const socket = io(`${import.meta.env.VITE_API_URL}/moderation`, {
      withCredentials: true,
    })

    socket.on("connect", () => {
      setConnected(true)
      socket.emit("subscribe:live-session", { liveSessionId })
    })

    socket.on("chat-message", (payload: ChatMessageEvent) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === payload.id)) return prev
        return [payload, ...prev].slice(0, 200)
      })
    })

    socket.on("moderation-action", (payload: ModerationActionEvent) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === payload.chatMessageId
            ? {
                ...msg,
                actionStatus: payload.status,
                actionType: payload.actionType,
              }
            : msg
        )
      )
    })

    socket.on("disconnect", () => setConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [liveSessionId])

  return { messages, connected, isLoadingHistory: historyQuery.isLoading }
}
