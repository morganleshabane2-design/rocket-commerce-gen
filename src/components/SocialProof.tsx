import { Star } from "lucide-react";

export const SocialProof = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Reviews</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
          Real reviews, coming soon.
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mt-3 text-sm">
          We only show verified customer reviews — install a review app from the Shopify App Store to start collecting them.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex gap-1 text-muted-foreground/40 mb-3">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4" />)}
            </div>
            <p className="text-sm text-muted-foreground italic">No reviews yet.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
