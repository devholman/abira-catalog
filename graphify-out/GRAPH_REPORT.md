# Graph Report - abira_catalog  (2026-09-05)

## Corpus Check
- 87 files · ~62,055 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 210 nodes · 169 edges · 17 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]

## God Nodes (most connected - your core abstractions)
1. `POST()` - 21 edges
2. `Error()` - 15 edges
3. `GET()` - 9 edges
4. `Multi-Tenant E-Commerce Platform` - 9 edges
5. `Shippo Shipping Integration` - 5 edges
6. `Order Creation Flow` - 5 edges
7. `DB Model: Order` - 5 edges
8. `DELETE()` - 4 edges
9. `computeUnitPriceInternal()` - 4 edges
10. `Square Payments Integration` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Abira Catalog - Project Documentation (CLAUDE.md)` --references--> `Abira Sports Apparel Logo - Yellow/Black A-shape with 'ABIRA SPORTS' text`  [INFERRED]
  CLAUDE.md → public/abiraLogo.svg
- `Abira Catalog - README` --references--> `Vercel Logo - Black wordmark SVG`  [INFERRED]
  README.md → public/vercel.svg
- `Abira Catalog - README` --references--> `Next.js Logo - Black wordmark SVG`  [INFERRED]
  README.md → public/next.svg
- `Error()` --calls--> `withRetry()`  [INFERRED]
  app/error.tsx → utils/server.ts
- `Error()` --calls--> `onSubmit()`  [INFERRED]
  app/error.tsx → components/OrderForm.tsx

## Hyperedges (group relationships)
- **Order Creation Pipeline: Cart -> OrderForm -> API -> Square -> Email** — claude_md_cart_context, claude_md_api_orders, claude_md_api_square_payment_link, claude_md_mailgun, claude_md_order_creation_flow [EXTRACTED 1.00]
- **Multi-Tenant Store Isolation: Catalog Route + Auth + StoreId Scoping** — claude_md_catalog_route, claude_md_multitenant_auth, claude_md_store_config_context, claude_md_api_store_config [EXTRACTED 0.95]
- **Global Provider Tree Composition in ClientLayout** — claude_md_layout_client_tsx, claude_md_store_config_context, claude_md_customer_data_context, claude_md_cart_context, claude_md_toast_context [EXTRACTED 0.90]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (11): fetchPaymentLink(), sendEmail(), Error(), handleCancelOrder(), handleFinalDelete(), onSubmit(), fetchFulfillmentData(), fetchOrders() (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (6): generateCustomerEmailBody(), generateMerchantEmailBody(), attemptRefund(), isFromSquare(), POST(), withRetry()

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (6): useCart(), getS3ImageUrl(), ItemCard(), Cart(), DELETE(), GET()

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (12): Abira Sports Apparel Logo - Yellow/Black A-shape with 'ABIRA SPORTS' text, Abira Catalog - Project Documentation (CLAUDE.md), AWS S3 Image Storage, Multi-Tenant E-Commerce Platform, next.config.mjs - Standalone Output + S3 Domains, Next.js 14 App Router, Prisma 6 + PostgreSQL (Neon), Tailwind CSS (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (13): API Route: /api/shippo/, API Route: /api/square/create-payment-link/, API Route: /api/webhooks/square/, DB Model: Order, DB Model: OrderItem, DB Model: ShippingLabel, DB Model: ShippingRateSelection, Enum: OrderStatus (ACTIVE/CANCEL_REQUESTED/CANCELED) (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.28
Nodes (5): calculateTotalPrice(), toFixedNumber(), computeLegacyUnitPrice(), computeUnitPrice(), computeUnitPriceInternal()

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (9): API Route: /api/storeConfig/, Cart/Checkout Route (app/cart/), Team Catalog Route (app/catalog/[slug]/), force-dynamic Export for Non-Cached Pages, Multi-Tenant Passcode Auth via Cookie, Rationale: force-dynamic on auth-gated and cart pages to prevent stale cached responses, Rationale: 24h localStorage cache with version check for StoreConfig, Rationale: Passcode-gated catalog slugs for multi-tenant team isolation (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (9): API Route: /api/orders/, CartContext - Cart State Management, CustomerDataContext - Checkout Customer Info, Client Layout (app/layout.client.tsx), Root Layout (app/layout.tsx), Mailgun Email Integration, Order Creation Flow, Global Provider Tree: StoreConfigProvider > CustomerDataProvider > CartProvider (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (2): PasscodeEntryPage(), useStoreConfig()

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (2): API Route: /api/cron/finalize-deletes/, API Route: /api/orders/[id]/

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (1): Confirmation Route (app/confirmation/)

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (1): Admin Dashboard (app/admin/)

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (1): API Routes (app/api/)

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (1): ToastContext - Toast Notifications

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (1): API Route: /api/customers/byStore/

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (1): API Route: /api/admin/

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): Utility: utils/numUtils.js - Numeric Formatting

## Knowledge Gaps
- **28 isolated node(s):** `TypeScript`, `Tailwind CSS`, `Prisma 6 + PostgreSQL (Neon)`, `Root Layout (app/layout.tsx)`, `Cart/Checkout Route (app/cart/)` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (5 nodes): `page.tsx`, `StoreConfigContext.tsx`, `PasscodeEntryPage()`, `StoreConfigProvider()`, `useStoreConfig()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (2 nodes): `API Route: /api/cron/finalize-deletes/`, `API Route: /api/orders/[id]/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `Confirmation Route (app/confirmation/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `Admin Dashboard (app/admin/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `API Routes (app/api/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `ToastContext - Toast Notifications`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `API Route: /api/customers/byStore/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `API Route: /api/admin/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `Utility: utils/numUtils.js - Numeric Formatting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Error()` connect `Community 0` to `Community 1`, `Community 2`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `POST()` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `GET()` connect `Community 2` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `POST()` (e.g. with `withRetry()` and `Error()`) actually correct?**
  _`POST()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `Error()` (e.g. with `fetchOrders()` and `handleDeleteOrder()`) actually correct?**
  _`Error()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `GET()` (e.g. with `DELETE()` and `Cart()`) actually correct?**
  _`GET()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Shippo Shipping Integration` (e.g. with `Utility: utils/server.ts - withRetry()` and `DB Model: ShippingLabel`) actually correct?**
  _`Shippo Shipping Integration` has 3 INFERRED edges - model-reasoned connections that need verification._