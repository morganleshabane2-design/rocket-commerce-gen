## Full overhaul plan — bugs, polish, CRO, features

A complete pass across the store. Every section is in scope.

### 1. Bug audit & fixes
- Sweep every component/route for runtime errors, stale imports, broken types, and dead code (after the `RecentPurchasePopup` ghost import already fixed).
- Verify cart flow end-to-end with Playwright: add → drawer → quantity change → remove → checkout URL has `channel=online_store` and opens in a new tab.
- Verify PDP `product.$handle.tsx`: image gallery, variant switching, quantity stepper, sticky mobile buy bar, cross-sell rail.
- Verify Header/AnnouncementBar scroll behavior, mobile nav, cart badge animation, ExitIntentPopup trigger logic.
- Fix any console errors, hydration warnings, missing keys, accessibility violations (alt text, button labels, focus states).
- Remove unused components / dead code (e.g. confirm `SocialProof` content is real vs fabricated — per policy, no fake reviews).

### 2. Visual polish
- Audit `src/styles.css` tokens: ensure cohesive palette (oklch), typography pair (editorial display + clean body via `@fontsource`), spacing scale, shadow & gradient tokens.
- Hero: refine motion (framer-motion), composition, image treatment, CTA hierarchy.
- ProductCard: hover image swap, price/compare-at treatment, badge system (New/Best seller — only if backed by real Shopify tags).
- PDP: gallery polish, variant pills, trust row, accordion sections, sticky buy bar timing.
- CartDrawer: free-shipping progress bar styling, upsell rail, savings breakdown.
- Footer: clean column layout, newsletter input, social links.
- Consistent focus rings, transitions, and reduced-motion support.

### 3. Conversion (CRO)
- Real Shopify discount code (e.g. `WELCOME10`, 10% off) via `shopify--create_price_rule` + `shopify--create_discount_code`, surfaced in AnnouncementBar + ExitIntentPopup.
- Free-shipping threshold pulled from a single config constant; progress bar in cart.
- Upsell rail in cart (real products, not pseudo).
- PDP cross-sell rail (real products).
- Reviews UI: empty-state only ("No reviews yet"), no fabricated content.
- Trust row (shipping, returns, support) — factual copy only.

### 4. New features
- `/collections/$handle` route with Shopify collection query.
- `/search` route using Shopify `products(query:)`.
- Newsletter capture via Lovable Cloud (`newsletter_signups` table with RLS) — wired into Footer + ExitIntentPopup.
- Order lookup stub link in Footer.
- Better 404 illustration/copy.

### 5. SEO & performance
- Per-route unique `head()` for every page (index, about, faq, product, collection, search, 404).
- JSON-LD: Organization (root), Product (PDP from loader data), BreadcrumbList (PDP/collection), FAQPage (FAQ).
- `og:image` only at leaf routes; product OG image = product image.
- Dynamic `sitemap.xml` includes products + collections from Shopify.
- LCP image: `fetchpriority="high"` + `rel=preload` on hero/PDP main image.
- `font-display: swap` via @fontsource, defer non-critical JS, lazy-load below-the-fold images.
- Validate `robots.txt` and canonical tags on every leaf route.

### Technical notes
- New components: `CollectionGrid`, `SearchModal`, `NewsletterForm`, `ProductJsonLd`, `Breadcrumbs`, `EmptyReviews`.
- New routes: `src/routes/collections.$handle.tsx`, `src/routes/search.tsx`.
- Lovable Cloud enabled for `newsletter_signups` (id, email unique, created_at) with RLS + GRANTs to `anon` INSERT only.
- Shopify discount code created with starts_at blank, no end date, 10% across line items.
- Verify with Playwright: home, PDP, cart add+checkout link, collection, search, newsletter signup.

### Suggested build order
1. Bug sweep + dev-server clean → 2. Design tokens & typography → 3. Hero/Header/Footer polish → 4. PDP + Cart polish → 5. Collections + Search routes → 6. Newsletter (Cloud) → 7. Real discount code + AnnouncementBar wiring → 8. SEO/JSON-LD/sitemap → 9. Playwright verification pass.

### Out of scope
- Real review integration (Judge.me/Yotpo) — requires user account.
- Payment customization beyond Shopify checkout.
- Custom domain / DNS.