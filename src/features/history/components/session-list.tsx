import { Link } from "@tanstack/react-router"
import { format } from "date-fns"
import { Search } from "lucide-react"

import type { DataTableColumn } from "@/components/data-table"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { PaginationMeta } from "@/types/history"
import type { LiveSession } from "@/types/live-session"

const sessionColumns: DataTableColumn<LiveSession>[] = [
  {
    header: "Stream",
    className: "w-[50%]",
    cell: (session) => (
      <Link
        to="/dashboard/history/$sessionId"
        params={{ sessionId: session.id }}
        className="text-primary hover:underline"
      >
        {session.title ?? session.platformLiveId}
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
  meta,
  search,
  onSearchChange,
  onPageChange,
  isLoading = false,
  isFetching = false,
}: {
  sessions: LiveSession[]
  meta?: PaginationMeta
  search: string
  onSearchChange: (value: string) => void
  onPageChange: (page: number) => void
  isLoading?: boolean
  isFetching?: boolean
}) {
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search streams..."
          className="pl-9"
        />
      </div>

      <DataTable
        data={sessions}
        columns={sessionColumns}
        isLoading={isLoading}
        emptyMessage="No live sessions yet."
        pagination={
          meta
            ? {
                ...meta,
                onPageChange,
                isFetching,
              }
            : undefined
        }
      />
    </div>
  )
}
