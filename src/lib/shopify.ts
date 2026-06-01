import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "viral-launchpad-fl4bi.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "726ed0201f7b87f14e21e3d905413ba3";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          compareAtPrice?: { amount: string; currencyCode: string } | null;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

/** Append Shopify CDN sizing params. Safe no-op for non-Shopify URLs. */
export function shopifyImage(url: string | undefined, width: number): string {
  if (!url) return "";
  if (!url.includes("cdn.shopify.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}`;
}

export function shopifyImageSrcSet(url: string | undefined, widths: number[] = [400, 800, 1200, 1600]): string {
  if (!url) return "";
  return widths.map((w) => `${shopifyImage(url, w)} ${w}w`).join(", ");
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Visit admin.shopify.com to upgrade your plan.",
    });
    return;
  }
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  return data;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 6) { edges { node { url altText } } }
  variants(first: 25) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function fetchProducts(first = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data?.data?.product;
  return product ? { node: product } : null;
}

/* ───── Cart mutations ───── */

const CART_QUERY = `query cart($id: ID!) { cart(id: $id) { id totalQuantity } }`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } } }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { field message } }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { field message } }
  }
`;

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

type UserError = { field: string[] | null; message: string };
function isCartNotFoundError(errors: UserError[]) {
  return errors.some((e) => /cart not found|does not exist/i.test(e.message));
}

export async function createShopifyCart(item: CartItem) {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  const userErrors = data?.data?.cartCreate?.userErrors ?? [];
  if (userErrors.length) { console.error(userErrors); return null; }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(cartId: string, item: CartItem) {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const userErrors: UserError[] = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find((l: { node: { merchandise: { id: string } } }) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId, lines: [{ id: lineId, quantity }],
  });
  const userErrors: UserError[] = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });
  const userErrors: UserError[] = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) return { success: false };
  return { success: true };
}

export async function syncShopifyCart(cartId: string) {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  return data?.data?.cart ?? null;
}
