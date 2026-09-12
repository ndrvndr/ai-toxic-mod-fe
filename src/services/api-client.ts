export async function apiFetch(path: string, options?: RequestInit) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
