import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Gift } from "lucide-react";

const KEY = "aurum-exit-shown";

export const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("You're on the list", { description: "We'll email your welcome offer shortly." });
    setEmail("");
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
          Drop your email and we'll send your welcome discount, plus first dibs on every drop.
        </DialogDescription>
        <form onSubmit={submit} className="flex flex-col gap-2 mt-2">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 rounded-full text-center"
          />
          <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
            Send me my 10% off
          </Button>
        </form>
        <button className="text-xs text-muted-foreground underline mt-1" onClick={() => setOpen(false)}>
          No thanks
        </button>
      </DialogContent>
    </Dialog>
  );
};
