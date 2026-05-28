import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const discount = compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : null;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group block rounded-3xl bg-card overflow-hidden shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        {discount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-urgent text-urgent-foreground text-[11px] font-bold">
            -{discount}%
          </span>
        )}
        <Button
          onClick={handleAdd}
          disabled={isLoading || !variant}
          size="icon"
          className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-foreground text-background hover:bg-accent shadow-lift opacity-90 group-hover:opacity-100"
          aria-label="Quick add"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
        </Button>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold leading-tight">{node.title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">{currency} {price.toFixed(0)}</span>
          {compareAt && compareAt > price && (
            <span className="text-sm text-muted-foreground line-through">{currency} {compareAt.toFixed(0)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
