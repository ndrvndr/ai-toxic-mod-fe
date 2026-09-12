import { CtaSection } from "./components/cta-section"
import { FeaturesOverviewSection } from "./components/features-overview-section"
import { HeroSection } from "./components/hero-section"
import { HowItWorksSection } from "./components/how-it-works-section"

export function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesOverviewSection />
      <CtaSection />
    </div>
  )
}
