import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const CrossSell = ({ excludeId }: { excludeId?: string }) => {
  const { data: products } = useProducts();
  if (!products) return null;
  const others = products.filter((p) => p.node.id !== excludeId).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
          You might also love
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};
