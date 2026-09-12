import { ShieldCheck } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-12 text-center md:py-20">
      <div className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-muted-foreground sm:px-4 sm:text-sm">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span>AI-powered live chat moderation for YouTube</span>
      </div>

      <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Keep your live chat clean, automatically
      </h1>

      <p className="max-w-xl text-base text-muted-foreground md:text-lg">
        Connect your YouTube channel, set your moderation rules, and let AI
        catch toxic messages that keyword filters miss — in real time, while you
        focus on streaming.
      </p>

      <Button
        size="lg"
        className="w-full sm:w-auto"
        nativeButton={false}
        render={<Link to="/auth/login">Login with YouTube to get started</Link>}
      />
    </section>
  )
}
