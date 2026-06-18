import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { shopifyImage } from "@/lib/shopify";
import { FreeShippingBar, FREE_SHIPPING_THRESHOLD } from "./FreeShippingBar";
import { UpsellRail } from "./UpsellRail";

export const CartDrawer = () => {
  const { items, isLoading, isSyncing, isOpen, setOpen, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const savings = items.reduce((s, i) => {
    const list = i.product.node.compareAtPriceRange?.minVariantPrice.amount;
    if (!list) return s;
    const diff = parseFloat(list) - parseFloat(i.price.amount);
    return diff > 0 ? s + diff * i.quantity : s;
  }, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) { window.open(url, "_blank"); setOpen(false); }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        <SheetHeader className="flex-shrink-0 px-6 pt-6">
          <SheetTitle className="font-display text-2xl">Your bag</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Nothing here yet." : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your bag is empty</p>
                <Button variant="outline" className="mt-6 rounded-full" onClick={() => setOpen(false)}>
                  Keep shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="px-6 pt-4">
                <FreeShippingBar subtotal={totalPrice} currency={currency} />
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0 space-y-3">
                {items.map((item) => {
                  const img = item.product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-3 p-3 rounded-2xl bg-secondary/40">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-background flex-shrink-0">
                        {img && (
                          <img
                            src={shopifyImage(img.url, 200)}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedOptions.filter((o) => o.value !== "Default Title").map((o) => o.value).join(" • ")}
                        </p>
                        <p className="font-semibold mt-1 text-sm">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)} aria-label="Remove">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <UpsellRail />
              </div>

              <div className="flex-shrink-0 space-y-3 px-6 py-4 border-t bg-background">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You're saving</span>
                    <span className="font-medium text-accent">−{currency} {savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{totalPrice >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Calculated at checkout"}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t">
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
                  <span className="text-2xl font-display font-bold">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full h-12 text-base bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <><ExternalLink className="w-4 h-4 mr-2" /> Secure checkout</>
                  )}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="w-3 h-3" /> 30-day money-back guarantee
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
