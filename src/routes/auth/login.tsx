import { createFileRoute, redirect } from "@tanstack/react-router"

import { LoginPage } from "@/features/auth/login-page"
import { AuthServices } from "@/features/auth/services/auth.service"

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    const currentUser = await AuthServices.getCurrentUser()

    if (currentUser) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: LoginPage,
})
