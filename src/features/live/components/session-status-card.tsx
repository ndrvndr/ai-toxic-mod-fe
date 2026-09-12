import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { LiveSession } from "@/types/live-session"

export function SessionStatusCard({
  session,
  connected,
}: {
  session: LiveSession
  connected: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>Session: {session.platformLiveId}</span>
          <Badge variant={connected ? "default" : "secondary"}>
            {connected ? "Connected" : "Connecting..."}
          </Badge>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
