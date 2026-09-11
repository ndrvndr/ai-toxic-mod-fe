import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/dashboard/live")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/dashboard/live"!</div>
}
