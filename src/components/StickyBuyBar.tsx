import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

export const StickyBuyBar = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/95 backdrop-blur border-t border-border">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground truncate">{node.title}</p>
          <p className="font-bold">{currency} {price.toFixed(0)}</p>
        </div>
        <Button onClick={handleAdd} disabled={isLoading || !variant} className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to bag"}
        </Button>
      </div>
    </div>
  );
};
