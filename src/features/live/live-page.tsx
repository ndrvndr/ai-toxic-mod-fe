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
    return <p className="text-muted-foreground">Loading...</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Live Monitoring</h1>
        <MonitoringControls />
      </div>

      {activeSession ? (
        <>
          <SessionStatusCard session={activeSession} connected={connected} />
          {isLoadingHistory ? (
            <p className="text-muted-foreground">Loading chat history...</p>
          ) : (
            <LiveFeedList messages={messages} />
          )}
        </>
      ) : (
        <p className="text-muted-foreground">
          No active monitoring session. Start a live stream on YouTube, then
          click "Start Monitoring".
        </p>
      )}
    </div>
  )
}
