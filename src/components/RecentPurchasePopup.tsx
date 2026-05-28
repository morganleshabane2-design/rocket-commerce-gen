import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ShoppingBag, X } from "lucide-react";

const cities = ["Brooklyn, NY", "Austin, TX", "Los Angeles, CA", "Miami, FL", "Seattle, WA", "Chicago, IL", "Denver, CO", "Portland, OR"];
const minutesAgo = () => Math.floor(Math.random() * 30) + 1;

export const RecentPurchasePopup = () => {
  const { data: products } = useProducts();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState<{ title: string; image?: string; city: string; mins: number } | null>(null);

  useEffect(() => {
    if (!products || products.length === 0) return;
    let timeout: ReturnType<typeof setTimeout>;
    const show = () => {
      const p = products[Math.floor(Math.random() * products.length)];
      setItem({
        title: p.node.title,
        image: p.node.images.edges[0]?.node.url,
        city: cities[Math.floor(Math.random() * cities.length)],
        mins: minutesAgo(),
      });
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), 5000);
    };
    const initial = setTimeout(show, 6000);
    const interval = setInterval(show, 18000);
    return () => { clearTimeout(initial); clearInterval(interval); clearTimeout(timeout); };
  }, [products]);

  if (!item) return null;

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 max-w-xs p-3 pr-4 rounded-2xl bg-card border border-border shadow-lift">
        <div className="w-12 h-12 rounded-xl bg-secondary overflow-hidden flex-shrink-0 flex items-center justify-center">
          {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <ShoppingBag className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Someone in {item.city}</p>
          <p className="text-sm font-medium truncate">Just bought {item.title}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{item.mins} min ago</p>
        </div>
        <button onClick={() => setVisible(false)} aria-label="Dismiss">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
