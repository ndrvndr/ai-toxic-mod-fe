import { FlagOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { ChatMessageWithModeration } from "@/types/live-session"

export function MessageHistoryList({
  messages,
  isLoading,
}: {
  messages: ChatMessageWithModeration[]
  isLoading: boolean
}) {
  const flaggedOnly = messages.filter((m) => m.moderationActions.length > 0)

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="space-y-1 rounded-lg border p-3">
            <Skeleton className="h-5.5 w-36 bg-card-foreground dark:bg-card" />
            <Skeleton className="h-4.5 w-18 bg-card-foreground dark:bg-card" />
            <Skeleton className="h-3.5 w-48 bg-card-foreground dark:bg-card" />
          </div>
        ))}
      </div>
    )
  }

  if (flaggedOnly.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
        <FlagOff className="size-24" />
        <p className="text-center text-muted-foreground">
          No flagged messages in this session.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {flaggedOnly.map((msg) => (
        <div
          key={msg.id}
          className="rounded-lg border border-destructive/50 bg-destructive/5 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{msg.authorDisplayName}</span>

            <div className="flex gap-2">
              {msg.moderationActions.map((action, i) => (
                <Badge key={i} variant="outline">
                  {action.actionType} · {action.status}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm">{msg.messageText}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {msg.moderationActions[0]?.reason}
          </p>
        </div>
      ))}
    </div>
  )
}
