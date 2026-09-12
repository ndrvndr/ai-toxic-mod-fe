import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { LiveSession } from "@/types/live-session"

interface ActiveSessionBannerProps {
  session: LiveSession | null | undefined
  isLoading: boolean
}

export function ActiveSessionBanner({
  session,
  isLoading,
}: ActiveSessionBannerProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-9 w-36" />
        </CardContent>
      </Card>
    )
  }

  if (!session) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-between py-4">
          <p className="text-muted-foreground">
            No active monitoring session right now.
          </p>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link to="/dashboard/live">Go to Live Monitoring</Link>}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardContent className="flex items-center justify-between py-4">
        <p>
          🔴 Currently monitoring:{" "}
          <span className="font-medium">
            {session.title ?? session.platformLiveId}
          </span>
        </p>
        <Button
          nativeButton={false}
          render={<Link to="/dashboard/live">View Live Feed</Link>}
        />
      </CardContent>
    </Card>
  )
}
