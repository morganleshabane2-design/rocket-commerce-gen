import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => (
  <section className="relative overflow-hidden bg-hero">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pt-28 md:pb-32 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-border text-xs font-medium mb-6">
        <Sparkles className="w-3 h-3 text-accent" />
        Trending on TikTok — 2.3M views this week
      </div>
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] text-balance">
        Tiny upgrades.
        <br />
        <span className="bg-accent-gradient bg-clip-text text-transparent">Massive vibes.</span>
      </h1>
      <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground text-balance">
        Five obsession-worthy products engineered for the scroll. Free US shipping,
        ships in 24 hours, 30-day guarantee.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          size="lg"
          className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full"
          asChild
        >
          <a href="#bestsellers">
            Shop bestsellers <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full" asChild>
          <a href="#guarantee">Why people love us</a>
        </Button>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
        <span>✓ Free shipping over $25</span>
        <span>✓ 30-day money-back</span>
        <span>✓ Ships in 24h from US</span>
      </div>
    </div>
    <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </section>
);
