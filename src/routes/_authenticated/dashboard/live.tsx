import { createFileRoute } from "@tanstack/react-router"

import { LivePage } from "@/features/live/live-page"

export const Route = createFileRoute("/_authenticated/dashboard/live")({
  component: LivePage,
})
