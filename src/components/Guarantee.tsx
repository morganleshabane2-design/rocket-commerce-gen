import { ShieldCheck } from "lucide-react";

export const Guarantee = () => (
  <section id="guarantee" className="py-20 md:py-28">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
        <ShieldCheck className="w-8 h-8 text-accent" />
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
        Try it for 30 days. If you don't love it, we'll refund every cent.
      </h2>
      <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-xl mx-auto text-balance">
        No restocking fees. No questions. We make products we'd buy ourselves — so we stand behind them with everything we've got.
      </p>
    </div>
  </section>
);
