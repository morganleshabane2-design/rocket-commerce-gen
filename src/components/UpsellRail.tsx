import { Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { shopifyImage } from "@/lib/shopify";

export const UpsellRail = () => {
  const { data: products } = useProducts();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  if (!products) return null;
  const inCart = new Set(items.map((i) => i.product.node.id));
  const suggestions = products.filter((p) => !inCart.has(p.node.id)).slice(0, 3);
  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-border pt-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
        Often bought together
      </p>
      <div className="space-y-2">
        {suggestions.map((p) => {
          const variant = p.node.variants.edges[0]?.node;
          const img = p.node.images.edges[0]?.node;
          const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
          const currency = p.node.priceRange.minVariantPrice.currencyCode;
          return (
            <div key={p.node.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                {img && <img src={shopifyImage(img.url, 200)} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.node.title}</p>
                <p className="text-xs text-muted-foreground">{currency} {price.toFixed(0)}</p>
              </div>
              <button
                onClick={() => variant && addItem({
                  product: p,
                  variantId: variant.id,
                  variantTitle: variant.title,
                  price: variant.price,
                  quantity: 1,
                  selectedOptions: variant.selectedOptions || [],
                })}
                disabled={!variant}
                className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-accent transition"
                aria-label={`Add ${p.node.title} to cart`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
