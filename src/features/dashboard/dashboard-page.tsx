import { ActiveSessionBanner } from "./components/active-session-banner"
import { RecentSessionsList } from "./components/recent-sessions-list"
import { StatCards } from "./components/stat-cards"
import { useOverview } from "./hooks/use-overview"

export function DashboardPage() {
  const { overview, isLoading } = useOverview()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <ActiveSessionBanner
        session={overview?.activeSession}
        isLoading={isLoading}
      />
      <StatCards overview={overview} isLoading={isLoading} />
      <RecentSessionsList
        sessions={overview?.recentSessions}
        isLoading={isLoading}
      />
    </div>
  )
}
