import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { CrossSell } from "@/components/CrossSell";
import { VariantSelector, findVariant, hasRealVariants } from "@/components/VariantSelector";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Loader2, ShieldCheck, Truck, RefreshCw, Star, Minus, Plus } from "lucide-react";
import { fetchProductByHandle, shopifyImage, shopifyImageSrcSet } from "@/lib/shopify";

const SITE_URL = "https://rocket-commerce-gen.lovable.app";

export const Route = createFileRoute("/product/$handle")({
  loader: ({ params }) => fetchProductByHandle(params.handle),
  component: ProductPage,
  head: ({ params, loaderData }) => {
    const product = loaderData;
    const node = product?.node;
    const title = node ? `${node.title} — Aurum` : `${params.handle.replace(/-/g, " ")} — Aurum`;
    const desc = node?.description
      ? node.description.slice(0, 155)
      : "Free US shipping, 24h dispatch, 30-day money-back guarantee.";
    const image = node?.images.edges[0]?.node.url;
    const price = node?.priceRange.minVariantPrice.amount;
    const currency = node?.priceRange.minVariantPrice.currencyCode ?? "USD";
    const variant = node?.variants.edges[0]?.node;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `${SITE_URL}/product/${params.handle}` },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/product/${params.handle}` }],
      scripts: node ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: node.title,
          description: node.description,
          image: node.images.edges.map((e) => e.node.url),
          brand: { "@type": "Brand", name: "Aurum" },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/product/${params.handle}`,
            priceCurrency: currency,
            price,
            availability: variant?.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }),
      }] : [],
    };
  },
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Initialize variant selection on first load
  useMemo(() => {
    if (!product) return;
    const firstVariant = product.node.variants.edges[0]?.node;
    if (firstVariant) {
      const init: Record<string, string> = {};
      firstVariant.selectedOptions.forEach((o) => { init[o.name] = o.value; });
      setSelectedOptions(init);
    }
  }, [product]);

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
  const variant = (hasRealVariants(product) && findVariant(product, selectedOptions)) || node.variants.edges[0]?.node;
  const images = node.images.edges;
  const image = images[activeImage]?.node ?? images[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const currency = variant?.price.currencyCode ?? node.priceRange.minVariantPrice.currencyCode;

  const handleAdd = async () => {
    if (!variant || !variant.availableForSale) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to shop
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 pb-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/40">
              {image && (
                <img
                  src={shopifyImage(image.url, 1200)}
                  srcSet={shopifyImageSrcSet(image.url)}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={image.altText ?? node.title}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden bg-secondary/40 border-2 transition ${
                      activeImage === i ? "border-foreground" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={shopifyImage(img.node.url, 200)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-7">
            <div>
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

            <VariantSelector product={product} selected={selectedOptions} onChange={(name, value) =>
              setSelectedOptions((prev) => ({ ...prev, [name]: value }))
            } />

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Qty</p>
              <div className="flex items-center gap-1 border border-border rounded-full p-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center" aria-label="Decrease">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center" aria-label="Increase">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              disabled={isAdding || !variant || !variant.availableForSale}
              size="lg"
              className="hidden md:flex w-full h-14 text-base bg-foreground hover:bg-accent text-background rounded-full"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" />
                : !variant?.availableForSale ? "Sold out"
                : `Add to bag — ${currency} ${(price * qty).toFixed(0)}`}
            </Button>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl border border-border">
                <Truck className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="font-medium">Free US shipping</p>
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

            <Accordion type="single" collapsible className="border-t border-b border-border">
              <AccordionItem value="ship">
                <AccordionTrigger className="text-sm font-semibold">Shipping &amp; delivery</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Ships from our US warehouse within 24 hours (Mon–Fri). Standard delivery 2–5 business days. Free over $0.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="text-sm font-semibold">Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  30-day money-back guarantee. Pre-paid return label included with every order. No restocking fees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="quality">
                <AccordionTrigger className="text-sm font-semibold">Why we picked it</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Every product is hand-tested by our team. If we wouldn't use it ourselves, it doesn't make the shop.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <CrossSell excludeId={node.id} />
      </main>
      <Footer />
      <StickyBuyBar
        title={node.title}
        price={price * qty}
        currency={currency}
        onAdd={handleAdd}
        disabled={!variant || !variant.availableForSale}
      />
    </div>
  );
}
