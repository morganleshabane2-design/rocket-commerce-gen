import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Gift } from "lucide-react";

const KEY = "aurum-exit-shown";

export const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(KEY, "1");
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", handler), 10000);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", handler); };
  }, []);

  const claim = () => {
    navigator.clipboard?.writeText("SCROLL10").catch(() => {});
    toast.success("Code SCROLL10 copied to clipboard", { description: "Use at checkout for 10% off." });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2">
          <Gift className="w-7 h-7 text-accent" />
        </div>
        <DialogTitle className="font-display text-3xl font-bold">Wait — 10% off?</DialogTitle>
        <DialogDescription className="text-base">
          One-time code, just for new visitors. Stack it with any sale.
        </DialogDescription>
        <div className="my-2 mx-auto px-5 py-3 rounded-xl bg-secondary font-mono font-bold tracking-widest text-xl">
          SCROLL10
        </div>
        <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={claim}>
          Copy code & keep shopping
        </Button>
        <button className="text-xs text-muted-foreground underline" onClick={() => setOpen(false)}>
          No thanks, I'll pay full price
        </button>
      </DialogContent>
    </Dialog>
  );
};
