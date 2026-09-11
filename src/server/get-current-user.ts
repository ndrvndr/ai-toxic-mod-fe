import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

export interface CurrentUser {
  id: string
  email: string
  displayName: string | null
}

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookieHeader = getRequestHeader("cookie")

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    })

    if (!response.ok) {
      return null
    }

    const { data } = (await response.json()) as { data: CurrentUser | null }
    return data
  }
)
