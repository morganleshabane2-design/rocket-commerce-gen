export const Footer = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="font-display text-xl font-bold mb-3">AURUM<span className="text-accent">.</span></div>
        <p className="text-muted-foreground max-w-xs">Tiny upgrades for the algorithm generation. Ships from the US.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Shop</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><a href="/#bestsellers" className="hover:text-foreground">Bestsellers</a></li>
          <li><a href="/#guarantee" className="hover:text-foreground">Guarantee</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Help</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li>Shipping: 2–5 business days</li>
          <li>Returns: 30 days, free</li>
          <li>support@aurum.shop</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Aurum. All rights reserved.
    </div>
  </footer>
);
