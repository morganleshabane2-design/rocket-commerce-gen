import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <section id="bestsellers" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">The drop</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-2xl">
              This week's obsessions.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs md:text-right">
            Curated, tested, and shipped from our US warehouse. No drop-shipping nonsense.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-secondary/40">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">Add products by telling the chat what you want to sell.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};
