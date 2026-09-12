import { LogIn, ListChecks, Radio } from "lucide-react"

const steps = [
  {
    icon: LogIn,
    title: "1. Login with your YouTube account",
    description:
      "Sign in with the Google account you'll use for streaming. This connects your YouTube channel so the system can read live chat and take moderation actions on your behalf.",
  },
  {
    icon: ListChecks,
    title: "2. Set up your moderation rules",
    description:
      "Add blacklist words to auto-delete specific terms, whitelist words to protect messages you never want flagged, and a toxicity threshold to catch harmful messages even without explicit profanity.",
  },
  {
    icon: Radio,
    title: "3. Start monitoring",
    description:
      'Go live on YouTube as usual, then click "Start Monitoring" on your dashboard. The system finds your active broadcast and starts watching chat automatically.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl md:mb-10">
        How it works
      </h2>

      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-1 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="rounded-full bg-primary/10 p-3">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
