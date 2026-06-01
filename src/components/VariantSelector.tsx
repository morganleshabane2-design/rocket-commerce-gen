import type { ShopifyProduct } from "@/lib/shopify";

type Variant = ShopifyProduct["node"]["variants"]["edges"][number]["node"];

interface Props {
  product: ShopifyProduct;
  selected: Record<string, string>;
  onChange: (optionName: string, value: string) => void;
}

/** Detect whether the product really has meaningful variants. */
export function hasRealVariants(product: ShopifyProduct) {
  const opts = product.node.options ?? [];
  if (opts.length === 0) return false;
  if (opts.length === 1 && opts[0].name.toLowerCase() === "title" && opts[0].values[0] === "Default Title") return false;
  return true;
}

export function findVariant(product: ShopifyProduct, selected: Record<string, string>): Variant | undefined {
  return product.node.variants.edges
    .map((e) => e.node)
    .find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value));
}

export const VariantSelector = ({ product, selected, onChange }: Props) => {
  if (!hasRealVariants(product)) return null;

  return (
    <div className="space-y-5">
      {product.node.options.map((opt) => (
        <div key={opt.name}>
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{opt.name}</p>
            <p className="text-sm font-medium">{selected[opt.name] ?? "—"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((value) => {
              const active = selected[opt.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChange(opt.name, value)}
                  className={`px-4 h-11 rounded-full border text-sm font-medium transition-all ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card hover:border-foreground/50"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
