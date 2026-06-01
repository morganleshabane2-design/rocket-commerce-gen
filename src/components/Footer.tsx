import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("You're on the list", { description: "We'll send the next drop your way." });
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="font-display text-2xl font-bold mb-3">AURUM<span className="text-accent">.</span></div>
          <p className="text-muted-foreground max-w-sm text-sm">
            Tiny upgrades for the algorithm generation. Designed in Brooklyn, shipped from our US warehouse.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2 max-w-sm">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-11 rounded-full bg-background"
            />
            <Button type="submit" className="h-11 rounded-full bg-foreground text-background hover:bg-accent">
              Join
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground mt-2">Get 10% off your first order. Unsubscribe anytime.</p>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#bestsellers" className="hover:text-foreground">Bestsellers</a></li>
            <li><Link to="/" className="hover:text-foreground">All products</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-semibold mb-3 text-sm">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Ships in 24h from the US</li>
            <li>30-day money-back guarantee</li>
            <li><a href="mailto:support@aurum.shop" className="hover:text-foreground">support@aurum.shop</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aurum. All rights reserved.
      </div>
    </footer>
  );
};
