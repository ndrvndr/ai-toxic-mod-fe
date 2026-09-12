import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { DashboardOverview } from "@/types/live-session"

interface StatItem {
  label: string
  value: string
  helperText?: string
}

interface StatCardsProps {
  overview: DashboardOverview | undefined
  isLoading: boolean
}

export function StatCards({ overview, isLoading }: StatCardsProps) {
  const stats: StatItem[] = [
    {
      label: "Total Streams",
      value: String(overview?.totalSessions ?? 0),
    },
    {
      label: "Messages Processed",
      value: String(overview?.totalMessages ?? 0),
    },
    {
      label: "Flagged",
      value: String(overview?.totalFlagged ?? 0),
      helperText: `${overview?.flaggedPercentage.toFixed(1) ?? 0}% of total`,
    },
    {
      label: "Active Rules",
      value: String(overview?.totalRules ?? 0),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        : stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-row items-center text-2xl font-semibold">
                <p className="text-2xl font-semibold">{stat.value}</p>

                {stat.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {stat.helperText}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
    </div>
  )
}
