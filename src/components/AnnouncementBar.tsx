import { useEffect, useState } from "react";
import { Truck, ShieldCheck, Zap } from "lucide-react";

const messages = [
  { icon: Truck, text: "Free US shipping on every order" },
  { icon: ShieldCheck, text: "30-day money-back guarantee" },
  { icon: Zap, text: "Ships in 24 hours from our US warehouse" },
];

export const AnnouncementBar = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);
  const Item = messages[i];
  return (
    <div className="bg-foreground text-background text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-center gap-2 overflow-hidden">
        <Item.icon className="w-3.5 h-3.5 text-accent" />
        <span className="font-medium tracking-wide transition-opacity duration-500" key={i}>
          {Item.text}
        </span>
      </div>
    </div>
  );
};
