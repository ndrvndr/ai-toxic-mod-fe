import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

import type { CurrentUser } from "@/types/auth"

export const AuthServices = {
  getCurrentUser: createServerFn({ method: "GET" }).handler(async () => {
    const cookieHeader = getRequestHeader("cookie")

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    })

    if (!response.ok) {
      return null
    }

    const { data } = (await response.json()) as { data: CurrentUser | null }
    return data
  }),

  async logout(): Promise<void> {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
  },
}
