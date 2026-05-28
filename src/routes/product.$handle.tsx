import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShieldCheck, Truck, RefreshCw, Flame, Star } from "lucide-react";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Aurum` },
      { name: "description", content: "Free US shipping, 24h dispatch, 30-day guarantee." },
    ],
  }),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Product not found</p>
        <Link to="/" className="underline">← Back to shop</Link>
      </div>
    );
  }

  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const allImages = node.images.edges;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const stockLeft = Math.floor(Math.random() * 8) + 4;

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
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 pb-16">
          <div className="space-y-3">
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/40">
              {image && <img src={image.url} alt={image.altText ?? node.title} className="w-full h-full object-cover" />}
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary/40">
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-urgent/10 text-urgent text-xs font-bold mb-3">
                <Flame className="w-3 h-3" /> Selling fast
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">{node.title}</h1>
              <div className="mt-3 flex items-center gap-1 text-muted-foreground/40">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4" />)}
                <span className="ml-2 text-xs text-muted-foreground">No reviews yet</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-display font-bold">{currency} {price.toFixed(0)}</span>
              {compareAt && compareAt > price && (
                <>
                  <span className="text-xl text-muted-foreground line-through">{currency} {compareAt.toFixed(0)}</span>
                  <span className="px-2 py-0.5 rounded-full bg-urgent text-urgent-foreground text-xs font-bold">
                    Save {currency} {(compareAt - price).toFixed(0)}
                  </span>
                </>
              )}
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">{node.description}</p>

            <div className="p-4 rounded-2xl bg-secondary/50 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Sale ends in</p>
                <CountdownTimer minutes={23} className="mt-1" />
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">In stock</p>
                <p className="text-sm font-bold text-urgent">Only {stockLeft} left!</p>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              disabled={isAdding || !variant}
              size="lg"
              className="hidden md:flex w-full h-14 text-base bg-foreground hover:bg-accent text-background rounded-full"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : `Add to bag — ${currency} ${price.toFixed(0)}`}
            </Button>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl border border-border">
                <Truck className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="font-medium">Free shipping</p>
              </div>
              <div className="p-3 rounded-xl border border-border">
                <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="font-medium">30-day refund</p>
              </div>
              <div className="p-3 rounded-xl border border-border">
                <RefreshCw className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="font-medium">Easy returns</p>
              </div>
            </div>

            <details className="p-4 rounded-2xl border border-border">
              <summary className="font-semibold cursor-pointer">Shipping & returns</summary>
              <p className="mt-3 text-sm text-muted-foreground">
                Ships from our US warehouse within 24 hours. Standard delivery 2–5 business days. Free returns within 30 days — pre-paid label included.
              </p>
            </details>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBuyBar product={product} />
    </div>
  );
}
