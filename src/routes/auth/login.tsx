import { createFileRoute, redirect } from "@tanstack/react-router"

import { LoginPage } from "@/features/auth/login-page"
import { getCurrentUser } from "@/features/auth/services/get-current-user"

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    const currentUser = await getCurrentUser()

    if (currentUser) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: LoginPage,
})
