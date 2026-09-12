import { LoaderCircle, RadioOff } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

import { LiveFeedList } from "./components/live-feed-list"
import { MonitoringControls } from "./components/monitoring-controls"
import { SessionStatusCard } from "./components/session-status-card"
import { useLiveFeed } from "./hooks/use-live-feed"
import { useLiveMonitoring } from "./hooks/use-live-monitoring"

export function LivePage() {
  const { activeSession, isLoading } = useLiveMonitoring()
  const { messages, connected, isLoadingHistory } = useLiveFeed(
    activeSession?.id
  )

  if (isLoading) {
    return (
      <div className="grid flex-1 place-items-center">
        <LoaderCircle className="size-12 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Live Monitoring</h1>
        <MonitoringControls />
      </div>

      {activeSession ? (
        <>
          <SessionStatusCard session={activeSession} connected={connected} />
          {isLoadingHistory ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="space-y-1 rounded-lg border p-3">
                <Skeleton className="h-5.5 w-36 bg-card-foreground dark:bg-card" />
                <Skeleton className="h-4.5 w-18 bg-card-foreground dark:bg-card" />
              </div>
            ))
          ) : (
            <LiveFeedList messages={messages} />
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <RadioOff className="size-24" />
          <p className="text-muted-foreground">
            No active monitoring session. Start a live stream on YouTube, then
            click "Start Monitoring".
          </p>
        </div>
      )}
    </div>
  )
}
