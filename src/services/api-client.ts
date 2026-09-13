function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export async function apiFetch(path: string, options?: RequestInit) {
  const csrfToken = getCookie("csrf_token")
  const method = options?.method?.toUpperCase() ?? "GET"
  const needsCsrf = !["GET", "HEAD", "OPTIONS"].includes(method)

  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(needsCsrf && csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...options?.headers,
    },
  })

  if (response.status === 401) {
    window.location.href = "/auth/login"
    throw new Error("Unauthorized")
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message ?? `Request failed: ${response.status}`)
  }

  return response.json()
}
