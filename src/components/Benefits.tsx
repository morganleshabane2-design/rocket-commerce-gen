import { Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, title: "24h US shipping", text: "Orders before 2pm ET ship the same day." },
  { icon: ShieldCheck, title: "30-day guarantee", text: "Love it or your money back. No questions." },
  { icon: RefreshCw, title: "Easy returns", text: "Pre-paid label included in every order." },
  { icon: Sparkles, title: "Real products", text: "Hand-tested by our team before listing." },
];

export const Benefits = () => (
  <section className="py-20 bg-foreground text-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Why Aurum</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-2xl text-balance">
        Built for people who scroll, decide, and want it tomorrow.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {items.map((it) => (
          <div key={it.title} className="p-6 rounded-2xl bg-background/5 border border-background/10">
            <it.icon className="w-7 h-7 text-accent mb-4" />
            <h3 className="font-display font-semibold text-lg">{it.title}</h3>
            <p className="text-sm text-background/70 mt-1">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
