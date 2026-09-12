import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="flex flex-col items-center gap-4 px-4 py-12 text-center md:py-20">
      <h2 className="text-xl font-semibold sm:text-2xl">
        Ready to clean up your live chat?
      </h2>
      <p className="text-muted-foreground">
        It takes less than a minute to connect your channel.
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
