import { createFileRoute } from "@tanstack/react-router"

import { SessionDetailPage } from "@/features/history/session-detail-page"

export const Route = createFileRoute(
  "/_authenticated/dashboard/history/$sessionId"
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { sessionId } = Route.useParams()
  return <SessionDetailPage sessionId={sessionId} />
}
