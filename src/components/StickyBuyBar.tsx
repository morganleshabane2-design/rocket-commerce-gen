import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

interface Props {
  title: string;
  price: number;
  currency: string;
  onAdd: () => void;
  disabled?: boolean;
}

export const StickyBuyBar = ({ title, price, currency, onAdd, disabled }: Props) => {
  const isLoading = useCartStore((s) => s.isLoading);
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/95 backdrop-blur border-t border-border">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="font-bold">{currency} {price.toFixed(0)}</p>
        </div>
        <Button
          onClick={onAdd}
          disabled={isLoading || disabled}
          className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to bag"}
        </Button>
      </div>
    </div>
  );
};
