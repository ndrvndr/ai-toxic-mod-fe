import { useHistoryList } from "./hooks/use-history-list"
import { SessionList } from "./components/session-list"

export function HistoryPage() {
  const { sessions, isLoading } = useHistoryList()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">History</h1>
      <SessionList sessions={sessions} isLoading={isLoading} />
    </div>
  )
}
