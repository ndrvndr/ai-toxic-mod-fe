import { Badge } from "@/components/ui/badge"
import type { ChatMessageEvent } from "@/types/live-session"

interface FeedItem extends ChatMessageEvent {
  actionStatus?: "success" | "failed"
  actionType?: string
}

export function LiveFeedList({ messages }: { messages: FeedItem[] }) {
  if (messages.length === 0) {
    return <p className="text-muted-foreground">Waiting for chat messages...</p>
  }

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-lg border p-3 ${
            msg.toxicityLabel === "flagged"
              ? "border-destructive/50 bg-destructive/5"
              : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{msg.authorDisplayName}</span>
            <div className="flex gap-2">
              {msg.toxicityLabel === "flagged" && (
                <Badge variant="destructive">{msg.reason}</Badge>
              )}
              {msg.actionType && (
                <Badge
                  variant={
                    msg.actionStatus === "success" ? "outline" : "secondary"
                  }
                >
                  {msg.actionType} · {msg.actionStatus}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm">{msg.text}</p>
        </div>
      ))}
    </div>
  )
}
