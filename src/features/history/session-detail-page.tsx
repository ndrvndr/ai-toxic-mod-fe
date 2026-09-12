import { AnalyticsSummary } from "./components/analytics-summary"
import { MessageHistoryList } from "./components/message-history-list"
import { useSessionDetail } from "./hooks/use-session-detail"

export function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const { analytics, messages, isLoading } = useSessionDetail(sessionId)

  return (
    <div className="flex flex-1 flex-col gap-y-6">
      <h1 className="text-2xl font-semibold">Stream Detail</h1>
      <AnalyticsSummary analytics={analytics} isLoading={isLoading} />
      <div className="flex flex-1 flex-col">
        <h2 className="mb-2 text-lg font-medium">Flagged Messages</h2>
        <MessageHistoryList messages={messages} isLoading={isLoading} />
      </div>
    </div>
  )
}
