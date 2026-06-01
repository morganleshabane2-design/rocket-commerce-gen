
# Aurum Storefront — Full Overhaul Plan

A coordinated upgrade across visual design, conversion stack, SEO/performance, and new features. Built on the existing TanStack Start + Shopify Storefront API setup.

## 1. Visual design polish

- **New hero direction**: editorial split layout with large product photography on one side, oversized display typography on the other. Replace generic centered hero. Add subtle scroll-driven motion (framer-motion) on the headline.
- **Typography upgrade**: pair an Awwwards-grade display font (e.g. PP Editorial / Fraunces) with Inter Tight body. Add expressive type scale and balanced tracking.
- **Refined token system in `src/styles.css`**: layered surfaces, accent gradient, soft shadows, premium oklch palette (warm off-white + deep ink + single saturated accent).
- **Polished product cards**: hover image swap (2nd Shopify image), price reveal animation, "Add to bag" inline action.
- **Sticky transparent header** that solidifies on scroll, with cart count animation.

## 2. Conversion & CRO stack

- **Product Detail Page upgrade**
  - Image gallery with thumbnails + zoom on hover.
  - Variant selector (size/color swatches from `selectedOptions`) with availability per variant.
  - Quantity stepper.
  - Trust row (shipping / returns / guarantee) with icons.
  - Sticky "Add to bag" on mobile that mirrors the chosen variant + price.
  - "Frequently bought together" / cross-sell rail pulling other Shopify products.
  - Accordion sections: Ingredients/Specs, Shipping, FAQ.
- **Cart drawer upgrade**
  - Free-shipping progress bar ("$X away from free shipping").
  - Upsell rail inside drawer (one-click add other products).
  - Subtotal + savings breakdown + applied discount code field.
  - Express checkout button styled prominently; `channel=online_store` preserved.
- **Site-wide nudges (kept tasteful, not spammy)**
  - Replace fake countdown + fake "recent purchase" popups (they hurt trust). Keep only honest urgency (real low-stock when Shopify reports it).
  - Announcement bar with rotating real value props (free US shipping, 30-day returns, 24h dispatch).
  - Exit-intent stays but offers a real, working Shopify discount code created via the API.
- **Reviews UI** — empty-state structure only ("No reviews yet"), per policy. No fake reviews.

## 3. New features

- **Collections / category routes** (`/collections/$handle`) using Shopify Storefront `collectionByHandle`.
- **Search** — header search modal hitting Shopify `products(query:)`.
- **Bundles page** (`/bundles`) — curated multi-product offer; real Shopify discount code applied.
- **About** (`/about`) and **FAQ** (`/faq`) routes for trust + SEO surface area.
- **Email capture** at footer, persisted (Lovable Cloud table — newsletter_signups) with RLS. Confirms via toast.
- **Order lookup** stub linking to Shopify order status page.

## 4. SEO & performance

- **Per-route `head()`** with unique title/description/og on `/`, `/about`, `/faq`, `/collections/$handle`, `/product/$handle`, `/bundles`.
- **JSON-LD**: Organization on root, Product schema on PDP (name, image, offers.price, availability), BreadcrumbList on deep routes, FAQPage on `/faq`.
- **Dynamic `sitemap.xml`** server route enumerating routes + all Shopify products + collections.
- **`robots.txt`** allowing all, pointing to sitemap.
- **Image optimization**: explicit width/height to kill CLS, `loading="lazy"` below the fold, `fetchpriority="high"` + preload for hero LCP image, Shopify CDN `?width=` params for responsive `srcset`.
- **Fonts**: `font-display: swap`, preconnect to font host.
- **Defer non-critical work**: lazy-mount ExitIntentPopup and announcement rotator.
- **Canonical tags** on every leaf route; remove from root.

## 5. Cleanup / removals

- Remove fake countdown + fake recent-purchase popup (replace with real Shopify-driven signals).
- Consolidate duplicate trust strips into a single shared component.
- Audit unused assets (`aurora.jpg`, `slides.jpg`, `posture.jpg`) and remove if unreferenced after redesign.

## Technical notes

- **Stack**: TanStack Start, TanStack Query, Zustand cart, Shopify Storefront API 2025-07 — unchanged.
- **New routes**: `src/routes/about.tsx`, `src/routes/faq.tsx`, `src/routes/collections.$handle.tsx`, `src/routes/bundles.tsx`, `src/routes/sitemap[.]xml.ts`.
- **New lib**: extend `src/lib/shopify.ts` with `fetchCollections`, `fetchCollectionByHandle`, `searchProducts`.
- **New components**: `AnnouncementBar`, `SearchModal`, `VariantSelector`, `FreeShippingBar`, `UpsellRail`, `ProductJsonLd`, `NewsletterForm`.
- **Backend**: enable Lovable Cloud for `newsletter_signups` table (id, email unique, created_at) with insert-only RLS for anon.
- **Real discount code**: create via `shopify--create_discount_code` (e.g. `WELCOME10`) and surface in exit-intent + newsletter confirmation.
- **PDP head()** derives og:image from the product's first Shopify image; canonical from handle.

## Suggested build order

1. Design tokens + typography + hero/header redesign.
2. PDP overhaul (gallery, variants, sticky bar, cross-sell).
3. Cart drawer upgrades (free-ship bar, upsell, discount field).
4. New routes (collections, search, about, faq, bundles) + nav wiring.
5. SEO pass (per-route head, JSON-LD, sitemap, robots, image perf).
6. Cleanup (remove fake urgency, prune assets).
7. Lovable Cloud newsletter table + real Shopify discount code.

Approve and I'll start in this order, checking in after each phase.
