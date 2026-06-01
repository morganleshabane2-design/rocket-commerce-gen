import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { AnnouncementBar } from "./AnnouncementBar";

export const Header = () => {
  const items = useCartStore((s) => s.items);
  const setOpen = useCartStore((s) => s.setOpen);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-background/85 border-b border-border/60 shadow-soft"
            : "bg-background/40 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl font-bold tracking-tight shrink-0">
            AURUM<span className="text-accent">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link to="/" className="hover:text-accent transition-colors">Shop</Link>
            <a href="/#bestsellers" className="hover:text-accent transition-colors">Bestsellers</a>
            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
            <Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)} aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                  {totalItems}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium">
              <Link to="/" onClick={() => setMobileOpen(false)}>Shop</Link>
              <a href="/#bestsellers" onClick={() => setMobileOpen(false)}>Bestsellers</a>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
};
