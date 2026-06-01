import { Truck } from "lucide-react";

export const FREE_SHIPPING_THRESHOLD = 50;

export const FreeShippingBar = ({ subtotal, currency }: { subtotal: number; currency: string }) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = remaining === 0;

  return (
    <div className="p-3 rounded-2xl bg-secondary/60 border border-border">
      <div className="flex items-center gap-2 text-xs font-medium mb-2">
        <Truck className="w-4 h-4 text-accent" />
        {unlocked ? (
          <span>You unlocked <span className="text-accent font-bold">free shipping</span> 🎉</span>
        ) : (
          <span>
            Add <span className="font-bold text-foreground">{currency} {remaining.toFixed(0)}</span> for free shipping
          </span>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-background overflow-hidden">
        <div
          className="h-full bg-accent-gradient transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
