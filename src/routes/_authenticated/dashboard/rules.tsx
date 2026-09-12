import { createFileRoute } from "@tanstack/react-router"

import { RulesPage } from "@/features/rules/rules-page"

export const Route = createFileRoute("/_authenticated/dashboard/rules")({
  component: RulesPage,
})
