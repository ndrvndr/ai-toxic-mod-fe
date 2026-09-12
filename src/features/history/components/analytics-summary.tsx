import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { LiveSessionAnalytics } from "@/types/live-session"

export function AnalyticsSummary({
  analytics,
  isLoading,
}: {
  analytics?: LiveSessionAnalytics
  isLoading: boolean
}) {
  const summary = [
    {
      title: "Total Messages",
      value: analytics?.totalMessages,
    },
    {
      title: "Flagged",
      value: analytics?.flaggedMessages,
    },
    {
      title: "Flagged %",
      value: `${analytics?.flaggedPercentage.toFixed(1)}%`,
    },
    {
      title: "Top Action",
      value: analytics
        ? (Object.entries(analytics.actionBreakdown).sort(
            (a, b) => b[1] - a[1]
          )[0]?.[0] ?? "—")
        : undefined,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {summary.map((item) => (
        <Card key={item.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-5 w-1/2" />
              ) : (
                <CardTitle className="text-sm text-muted-foreground">
                  {item.title}
                </CardTitle>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-2xl font-semibold capitalize">
            {isLoading ? (
              <Skeleton className="h-8 w-2/6 max-w-16" />
            ) : (
              item.value
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
