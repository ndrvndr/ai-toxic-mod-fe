export const AuthServices = {
  async logout(): Promise<void> {
    const csrfToken = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/)?.[1]

    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: csrfToken
        ? { "x-csrf-token": decodeURIComponent(csrfToken) }
        : {},
    })
  },
}
