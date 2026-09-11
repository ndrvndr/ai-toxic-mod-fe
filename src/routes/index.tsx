import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="grid min-h-screen place-items-center">Hello World!</div>
  )
}
