# FORME SUPPLY

FORME SUPPLY is the public storefront brand. FORME CORE is the internal product-research and operations system.

## Current architecture

- **Storefront:** TanStack Start + React, Shopify Storefront API for catalogue data, and Shopify cart mutations for checkout hand-off.
- **Operations:** FORME CORE is deployed separately on AppDeploy. Its backend stores product research, supplier evidence, quality reviews, CJdropshipping catalogue candidates and preliminary AI assessments.
- **Supplier discovery:** CJdropshipping catalogue results are research candidates only. A supplier warehouse flag, product listing, certification field or AI score is not independent verification.
- **AI qualification:** Scores are triage signals for human research, not proof of demand, profit, compliance, stock availability or supplier reliability.

## Development

This repository uses Bun.

```bash
bun install --frozen-lockfile
bun run dev
bun run lint
bun run build
```

## Integration configuration

The storefront uses a Shopify **Storefront API** endpoint and public Storefront access token. Keep private Shopify Admin API credentials, CJdropshipping API keys, payment credentials and other private secrets out of source control and browser bundles. Configure private credentials only through the relevant platform's encrypted secret manager.

Do not rotate or replace a working integration credential without checking the connected store and deployment first.

## Launch gates

This repository is not a declaration that the store is ready to accept orders. Before any public launch or order acceptance, the business owner must review and approve:

1. Exact legal business identity, contact details, domain and storefront branding.
2. Shopify checkout, payment provider, currency, tax and shipping configuration.
3. Product specifications, compatibility, safety and market-specific compliance evidence.
4. Supplier identity, manufacturer, exact model, sample quality, warranty, returns and delivery commitments.
5. Customer support process, privacy notice, marketing consent, returns policy and applicable consumer-law requirements.
6. Product prices, landed costs, margins and any public product listing.

No supplier contact, supplier order, payment, paid service, financial commitment or public product listing should be initiated by automation. Those actions require explicit owner approval and appropriate adult oversight.

## Data integrity principles

- Preserve existing product, supplier, audit and review records.
- Never turn missing evidence into a positive claim.
- Keep supplier-provided values separate from independently verified facts.
- Do not publish invented reviews, ratings, discounts, shipping estimates or guarantees.
- Treat customer email capture as unavailable until it is connected to a real consent-aware mailing-list provider.
- Keep cart and checkout actions explicit; do not place orders automatically.
