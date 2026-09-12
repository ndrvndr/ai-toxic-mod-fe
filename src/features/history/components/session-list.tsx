import { Link } from "@tanstack/react-router"
import { format } from "date-fns"

import type { DataTableColumn } from "@/components/data-table"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import type { LiveSession } from "@/types/live-session"

const sessionColumns: DataTableColumn<LiveSession>[] = [
  {
    header: "Broadcast ID",
    className: "w-[50%]",
    cell: (session) => (
      <Link
        to="/dashboard/history/$sessionId"
        params={{ sessionId: session.id }}
        className="text-primary hover:underline"
      >
        {session.platformLiveId}
      </Link>
    ),
  },
  {
    header: "Started",
    className: "w-[20%]",
    cell: (session) =>
      format(new Date(session.startedAt), "dd MMM yyyy, hh:mm a"),
  },
  {
    header: "Ended",
    className: "w-[20%]",
    cell: (session) =>
      session.endedAt
        ? format(new Date(session.endedAt), "dd MMM yyyy, hh:mm a")
        : "—",
  },
  {
    header: "Status",
    className: "w-[10%]",
    cell: (session) => (
      <Badge variant={session.status === "live" ? "default" : "secondary"}>
        {session.status}
      </Badge>
    ),
  },
]

export function SessionList({
  sessions,
  isLoading = false,
}: {
  sessions: LiveSession[]
  isLoading?: boolean
}) {
  return (
    <DataTable
      data={sessions}
      columns={sessionColumns}
      isLoading={isLoading}
      emptyMessage="No live sessions yet."
    />
  )
}
