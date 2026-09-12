import { History, LayoutDashboard, ListChecks, Radio } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: LayoutDashboard,
    title: "Overview",
    description:
      "See your monitoring status, total messages processed, flagged rate, and recent sessions at a glance.",
  },
  {
    icon: ListChecks,
    title: "Moderation Rules",
    description:
      "Manage blacklist words, whitelist exceptions, and toxicity thresholds — each with its own action: warn, delete, timeout, or ban.",
  },
  {
    icon: Radio,
    title: "Live Monitoring",
    description:
      "Watch chat messages and moderation actions arrive in real time while you're live, with a full history reload if you refresh mid-stream.",
  },
  {
    icon: History,
    title: "History & Analytics",
    description:
      "Review past live sessions with per-session stats: total messages, flagged percentage, and which actions were taken.",
  },
]

export function FeaturesOverviewSection() {
  return (
    <section className="px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl md:mb-10">
        What you get
      </h2>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="flex flex-row items-center gap-3">
              <feature.icon className="h-5 w-5 shrink-0 text-primary" />
              <CardTitle className="text-base">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
