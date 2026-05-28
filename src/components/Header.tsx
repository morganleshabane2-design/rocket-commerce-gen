import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

export const Header = () => {
  const items = useCartStore((s) => s.items);
  const setOpen = useCartStore((s) => s.setOpen);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          AURUM<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-accent transition-colors">Shop</Link>
          <a href="/#bestsellers" className="hover:text-accent transition-colors">Bestsellers</a>
          <a href="/#guarantee" className="hover:text-accent transition-colors">Guarantee</a>
        </nav>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)} aria-label="Open cart">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};
