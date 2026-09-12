import { Link } from "@tanstack/react-router"
import { RadioOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { LiveSession } from "@/types/live-session"

interface RecentSessionsListProps {
  sessions: LiveSession[] | undefined
  isLoading: boolean
}

export function RecentSessionsList({
  sessions,
  isLoading,
}: RecentSessionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Streams</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))
        ) : sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <Link
              key={session.id}
              to="/dashboard/history/$sessionId"
              params={{ sessionId: session.id }}
              className="flex items-center justify-between rounded-md py-2 hover:bg-muted"
            >
              <span className="text-sm">
                {session.title ?? session.platformLiveId}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(session.startedAt).toLocaleDateString()}
                </span>
                <Badge
                  variant={session.status === "live" ? "default" : "secondary"}
                >
                  {session.status}
                </Badge>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex min-h-36 flex-col items-center justify-center gap-y-2">
            <RadioOff className="size-12" />
            <p className="text-sm text-muted-foreground">No sessions yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
