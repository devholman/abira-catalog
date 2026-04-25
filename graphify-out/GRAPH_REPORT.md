# Graph Report - .  (2026-04-24)

## Corpus Check
- Corpus is ~38,994 words - fits in a single context window. You may not need a graph.

## Summary
- 287 nodes · 246 edges · 44 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_API Backend & Email|API Backend & Email]]
- [[_COMMUNITY_Checkout Flow|Checkout Flow]]
- [[_COMMUNITY_Platform Architecture & Integrations|Platform Architecture & Integrations]]
- [[_COMMUNITY_Cart & Store State|Cart & Store State]]
- [[_COMMUNITY_API Route Handlers|API Route Handlers]]
- [[_COMMUNITY_Cart UI & Products|Cart UI & Products]]
- [[_COMMUNITY_Store Config & Auth|Store Config & Auth]]
- [[_COMMUNITY_Admin Order Management|Admin Order Management]]
- [[_COMMUNITY_Root Client Layout|Root Client Layout]]
- [[_COMMUNITY_Admin Fulfillment View|Admin Fulfillment View]]
- [[_COMMUNITY_Filter Dropdown|Filter Dropdown]]
- [[_COMMUNITY_Customer Data Context|Customer Data Context]]
- [[_COMMUNITY_Toast Notifications|Toast Notifications]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_404 Not Found|404 Not Found]]
- [[_COMMUNITY_Contact Form|Contact Form]]
- [[_COMMUNITY_Admin Layout|Admin Layout]]
- [[_COMMUNITY_Logo Count Table|Logo Count Table]]
- [[_COMMUNITY_Fulfillment Table|Fulfillment Table]]
- [[_COMMUNITY_Confirmation Page|Confirmation Page]]
- [[_COMMUNITY_Email Template|Email Template]]
- [[_COMMUNITY_Cart Icon|Cart Icon]]
- [[_COMMUNITY_Swipe Icon|Swipe Icon]]
- [[_COMMUNITY_Number Utilities|Number Utilities]]
- [[_COMMUNITY_Select Menu|Select Menu]]
- [[_COMMUNITY_Shopping Cart Component|Shopping Cart Component]]
- [[_COMMUNITY_Home View Component|Home View Component]]
- [[_COMMUNITY_Notes Component|Notes Component]]
- [[_COMMUNITY_Address Validation Error|Address Validation Error]]
- [[_COMMUNITY_Accordion Component|Accordion Component]]
- [[_COMMUNITY_Catalog Card|Catalog Card]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Modal with Pricing|Modal with Pricing]]
- [[_COMMUNITY_Shipping Rate Form|Shipping Rate Form]]
- [[_COMMUNITY_Form Input Component|Form Input Component]]
- [[_COMMUNITY_Order Cleanup Cron|Order Cleanup Cron]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]

## God Nodes (most connected - your core abstractions)
1. `POST()` - 35 edges
2. `Error()` - 16 edges
3. `GET()` - 14 edges
4. `Multi-Tenant E-Commerce Platform` - 9 edges
5. `DELETE()` - 6 edges
6. `sendEmail()` - 5 edges
7. `Shippo Shipping Integration` - 5 edges
8. `Order Creation Flow` - 5 edges
9. `DB Model: Order` - 5 edges
10. `useCart()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Abira Catalog - Project Documentation (CLAUDE.md)` --references--> `Abira Sports Apparel Logo - Yellow/Black A-shape with 'ABIRA SPORTS' text`  [INFERRED]
  CLAUDE.md → public/abiraLogo.svg
- `Abira Catalog - README` --references--> `Vercel Logo - Black wordmark SVG`  [INFERRED]
  README.md → public/vercel.svg
- `Abira Catalog - README` --references--> `Next.js Logo - Black wordmark SVG`  [INFERRED]
  README.md → public/next.svg
- `fetchFulfillmentData()` --calls--> `Error()`  [INFERRED]
  /Users/devynholman/projects/abira_catalog/app/admin/fulfillment/page.tsx → /Users/devynholman/projects/abira_catalog/app/error.tsx
- `POST()` --calls--> `Error()`  [INFERRED]
  /Users/devynholman/projects/abira_catalog/app/api/webhooks/square/route.ts → /Users/devynholman/projects/abira_catalog/app/error.tsx

## Hyperedges (group relationships)
- **Order Creation Pipeline: Cart -> OrderForm -> API -> Square -> Email** — claude_md_cart_context, claude_md_api_orders, claude_md_api_square_payment_link, claude_md_mailgun, claude_md_order_creation_flow [EXTRACTED 1.00]
- **Multi-Tenant Store Isolation: Catalog Route + Auth + StoreId Scoping** — claude_md_catalog_route, claude_md_multitenant_auth, claude_md_store_config_context, claude_md_api_store_config [EXTRACTED 0.95]
- **Global Provider Tree Composition in ClientLayout** — claude_md_layout_client_tsx, claude_md_store_config_context, claude_md_customer_data_context, claude_md_cart_context, claude_md_toast_context [EXTRACTED 0.90]

## Communities

### Community 0 - "API Backend & Email"
Cohesion: 0.06
Nodes (8): generateCustomerEmailBody(), generateMerchantEmailBody(), attemptRefund(), createOrderItems(), dollarsToCents(), formatPhoneNumber(), isFromSquare(), POST()

### Community 1 - "Checkout Flow"
Cohesion: 0.1
Nodes (12): fetchPaymentLink(), sendEmail(), Error(), onSubmit(), fetchCatalogOrders(), fetchOrders(), handleBuyLabel(), handleDeleteOrder() (+4 more)

### Community 2 - "Platform Architecture & Integrations"
Cohesion: 0.09
Nodes (25): Abira Sports Apparel Logo - Yellow/Black A-shape with 'ABIRA SPORTS' text, Abira Catalog - Project Documentation (CLAUDE.md), API Route: /api/shippo/, API Route: /api/square/create-payment-link/, API Route: /api/webhooks/square/, AWS S3 Image Storage, DB Model: Order, DB Model: OrderItem (+17 more)

### Community 3 - "Cart & Store State"
Cohesion: 0.12
Nodes (18): API Route: /api/orders/, API Route: /api/storeConfig/, CartContext - Cart State Management, Cart/Checkout Route (app/cart/), Team Catalog Route (app/catalog/[slug]/), CustomerDataContext - Checkout Customer Info, force-dynamic Export for Non-Cached Pages, Client Layout (app/layout.client.tsx) (+10 more)

### Community 4 - "API Route Handlers"
Cohesion: 0.16
Nodes (2): DELETE(), GET()

### Community 5 - "Cart UI & Products"
Cohesion: 0.17
Nodes (5): CartProvider(), useCart(), getS3ImageUrl(), ItemCard(), Cart()

### Community 6 - "Store Config & Auth"
Cohesion: 0.33
Nodes (3): PasscodeEntryPage(), StoreConfigProvider(), useStoreConfig()

### Community 7 - "Admin Order Management"
Cohesion: 0.48
Nodes (5): calculatePriceWithTax(), calculateTax(), handleCancelOrder(), handleFinalDelete(), mapPaymentStatus()

### Community 8 - "Root Client Layout"
Cohesion: 0.67
Nodes (2): ClientLayout(), LayoutWrapper()

### Community 9 - "Admin Fulfillment View"
Cohesion: 0.67
Nodes (2): fetchFulfillmentData(), handleStoreChange()

### Community 10 - "Filter Dropdown"
Cohesion: 0.67
Nodes (2): handleFilterClick(), updateButtonPosition()

### Community 11 - "Customer Data Context"
Cohesion: 0.67
Nodes (1): useCustomerData()

### Community 12 - "Toast Notifications"
Cohesion: 0.67
Nodes (1): useToast()

### Community 13 - "Root Layout"
Cohesion: 0.67
Nodes (1): RootLayout()

### Community 14 - "Home Page"
Cohesion: 0.67
Nodes (1): Home()

### Community 15 - "404 Not Found"
Cohesion: 0.67
Nodes (1): NotFound()

### Community 16 - "Contact Form"
Cohesion: 0.67
Nodes (1): ContactForm()

### Community 17 - "Admin Layout"
Cohesion: 0.67
Nodes (1): AdminLayout()

### Community 18 - "Logo Count Table"
Cohesion: 0.67
Nodes (1): LogoCountTable()

### Community 19 - "Fulfillment Table"
Cohesion: 0.67
Nodes (1): requestSort()

### Community 20 - "Confirmation Page"
Cohesion: 0.67
Nodes (1): ConfirmationPage()

### Community 21 - "Email Template"
Cohesion: 0.67
Nodes (1): generateEmailBody()

### Community 22 - "Cart Icon"
Cohesion: 0.67
Nodes (1): CartIcon()

### Community 23 - "Swipe Icon"
Cohesion: 0.67
Nodes (1): SwipeIcon()

### Community 24 - "Number Utilities"
Cohesion: 0.67
Nodes (1): toFixedNumber()

### Community 25 - "Select Menu"
Cohesion: 0.67
Nodes (1): SelectMenu()

### Community 26 - "Shopping Cart Component"
Cohesion: 0.67
Nodes (1): getLastName()

### Community 27 - "Home View Component"
Cohesion: 0.67
Nodes (1): handleViewCart()

### Community 28 - "Notes Component"
Cohesion: 0.67
Nodes (1): Notes()

### Community 29 - "Address Validation Error"
Cohesion: 0.67
Nodes (1): handleApplySuggested()

### Community 30 - "Accordion Component"
Cohesion: 0.67
Nodes (1): Accordion()

### Community 31 - "Catalog Card"
Cohesion: 0.67
Nodes (1): CatalogCard()

### Community 32 - "Button Component"
Cohesion: 0.67
Nodes (1): Button()

### Community 33 - "Modal with Pricing"
Cohesion: 0.67
Nodes (1): calculateTotalPrice()

### Community 34 - "Shipping Rate Form"
Cohesion: 0.67
Nodes (1): handleSubmit()

### Community 35 - "Form Input Component"
Cohesion: 0.67
Nodes (1): FormInput()

### Community 36 - "Order Cleanup Cron"
Cohesion: 1.0
Nodes (2): API Route: /api/cron/finalize-deletes/, API Route: /api/orders/[id]/

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Confirmation Route (app/confirmation/)

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Admin Dashboard (app/admin/)

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): API Routes (app/api/)

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): ToastContext - Toast Notifications

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (1): API Route: /api/customers/byStore/

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (1): API Route: /api/admin/

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (1): Utility: utils/numUtils.js - Numeric Formatting

## Knowledge Gaps
- **28 isolated node(s):** `TypeScript`, `Tailwind CSS`, `Prisma 6 + PostgreSQL (Neon)`, `Root Layout (app/layout.tsx)`, `Cart/Checkout Route (app/cart/)` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `API Route Handlers`** (14 nodes): `route.ts`, `route.ts`, `route.ts`, `route.ts`, `route.ts`, `route.ts`, `DELETE()`, `GET()`, `route.ts`, `route.ts`, `route.ts`, `route.ts`, `route.ts`, `route.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Client Layout`** (4 nodes): `layout.client.tsx`, `ClientLayout()`, `LayoutWrapper()`, `layout.client.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Fulfillment View`** (4 nodes): `page.tsx`, `fetchFulfillmentData()`, `handleStoreChange()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Filter Dropdown`** (4 nodes): `FilterDropdown.tsx`, `handleFilterClick()`, `updateButtonPosition()`, `FilterDropdown.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Customer Data Context`** (3 nodes): `CustomerDataContext.tsx`, `useCustomerData()`, `CustomerDataContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toast Notifications`** (3 nodes): `ToastContext.tsx`, `useToast()`, `ToastContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (3 nodes): `layout.tsx`, `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Page`** (3 nodes): `page.tsx`, `Home()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `404 Not Found`** (3 nodes): `not-found.tsx`, `NotFound()`, `not-found.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Form`** (3 nodes): `page.tsx`, `ContactForm()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Layout`** (3 nodes): `layout.tsx`, `AdminLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo Count Table`** (3 nodes): `LogoCountTable.tsx`, `LogoCountTable()`, `LogoCountTable.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fulfillment Table`** (3 nodes): `FulfillmentTable.tsx`, `requestSort()`, `FulfillmentTable.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Confirmation Page`** (3 nodes): `page.tsx`, `ConfirmationPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Email Template`** (3 nodes): `emailTemplate.js`, `generateEmailBody()`, `emailTemplate.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cart Icon`** (3 nodes): `CartIcon()`, `CartIcon.tsx`, `CartIcon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Swipe Icon`** (3 nodes): `SwipeIcon.tsx`, `SwipeIcon()`, `SwipeIcon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Number Utilities`** (3 nodes): `toFixedNumber()`, `numUtils.js`, `numUtils.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Select Menu`** (3 nodes): `SelectMenu.tsx`, `SelectMenu()`, `SelectMenu.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shopping Cart Component`** (3 nodes): `ShoppingCart.tsx`, `getLastName()`, `ShoppingCart.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home View Component`** (3 nodes): `Home.tsx`, `handleViewCart()`, `Home.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Notes Component`** (3 nodes): `Notes.tsx`, `Notes()`, `Notes.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Address Validation Error`** (3 nodes): `handleApplySuggested()`, `AddressValidationError.tsx`, `AddressValidationError.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Accordion Component`** (3 nodes): `Accordion()`, `Accordion.tsx`, `Accordion.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Catalog Card`** (3 nodes): `CatalogCard()`, `CatalogCard.tsx`, `CatalogCard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (3 nodes): `Button()`, `Button.tsx`, `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Modal with Pricing`** (3 nodes): `Modal.tsx`, `calculateTotalPrice()`, `Modal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shipping Rate Form`** (3 nodes): `ShippingRate.tsx`, `handleSubmit()`, `ShippingRate.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Input Component`** (3 nodes): `FormInput.tsx`, `FormInput()`, `FormInput.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Order Cleanup Cron`** (2 nodes): `API Route: /api/cron/finalize-deletes/`, `API Route: /api/orders/[id]/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Confirmation Route (app/confirmation/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Admin Dashboard (app/admin/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `API Routes (app/api/)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `ToastContext - Toast Notifications`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `API Route: /api/customers/byStore/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `API Route: /api/admin/`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `Utility: utils/numUtils.js - Numeric Formatting`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `POST()` connect `API Backend & Email` to `Checkout Flow`, `API Route Handlers`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `Error()` connect `Checkout Flow` to `API Backend & Email`, `Admin Fulfillment View`, `API Route Handlers`, `Admin Order Management`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `GET()` connect `API Route Handlers` to `API Backend & Email`, `Checkout Flow`, `Cart UI & Products`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `POST()` (e.g. with `withRetry()` and `Error()`) actually correct?**
  _`POST()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `Error()` (e.g. with `fetchOrders()` and `handleDeleteOrder()`) actually correct?**
  _`Error()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `GET()` (e.g. with `Cart()` and `Error()`) actually correct?**
  _`GET()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `TypeScript`, `Tailwind CSS`, `Prisma 6 + PostgreSQL (Neon)` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._