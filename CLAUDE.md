# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Build
npm run build            # Build Next.js (also runs prisma migrate deploy via postbuild)

# Database
npm run prismaDev        # Run Prisma migrations in development
npm run prisma:migrate   # Deploy migrations (production)
npm run prisma:generate  # Regenerate Prisma Client after schema changes
npm run prismaStudio     # Open Prisma Studio UI

# Linting
npm run lint             # Run ESLint
```

No test suite is configured in this project.

## Architecture Overview

This is a **multi-tenant e-commerce platform** for sports teams to sell custom apparel. Each team has a unique catalog slug (e.g., `/catalog/cinco`), passcode-gated via cookies.

**Stack**: Next.js 14 App Router · TypeScript · Tailwind CSS · Prisma 6 + PostgreSQL (Neon) · Square (payments) · Shippo (shipping) · Mailgun (email) · AWS S3 (images)

### App Router Structure

```
app/
├─ layout.tsx                  # Root layout wraps everything in LayoutWrapper
├─ layout.client.tsx           # Client layout: ToastProvider → Header → ClientLayout
├─ catalog/[slug]/             # Team catalog route, passcode-gated
├─ cart/                       # Checkout flow (force-dynamic)
├─ confirmation/               # Post-payment confirmation
├─ admin/                      # Admin dashboard (no auth protection)
└─ api/                        # All API routes (see below)
```

`ClientLayout` (in `layout.client.tsx`) composes the global provider tree:
`StoreConfigProvider → CustomerDataProvider → CartProvider → page`

### Context / State

| Context | Purpose |
|---|---|
| `CartContext` | Cart state with localStorage persistence; handles add-Fit (+$5), XL (+$3), add-back pricing |
| `StoreConfigContext` | Store branding, product catalog, player roster; 24h localStorage cache with version check |
| `CustomerDataContext` | Customer info collected during checkout |
| `ToastContext` | Toast notifications |

### API Routes

```
/api/orders/              → CRUD for orders; POST creates customer + order atomically
/api/orders/[id]/         → GET/PUT order; DELETE queues for background cleanup
/api/square/create-payment-link/  → Generate Square checkout link (idempotency key required)
/api/webhooks/square/     → Square payment completion webhook → triggers email
/api/shippo/              → GET rates; /buy-rate purchases label; /save-rate persists selection
/api/storeConfig/         → GET store config (branding, items, players)
/api/customers/byStore/   → Fetch customers for a store
/api/admin/               → Admin bulk operations
/api/cron/finalize-deletes/ → Background cleanup job for queued order deletions
```

### Order Creation Flow

```
Cart → OrderForm (collect address) 
→ POST /api/orders (create Customer + Order + OrderItems) 
→ POST /api/square/create-payment-link 
→ Mailgun confirmation emails (customer + merchant)
→ Redirect to Square hosted checkout
```

Payment completion triggers the Square webhook which updates `PaymentStatus` on the order.

### Database Schema Key Points

- **Order** → has many **OrderItem**, one optional **ShippingLabel**, one optional **ShippingRateSelection**
- Cascade deletes: deleting an Order removes related items, labels, and rate selections
- `paymentLinkId` on Order is used as idempotency key for Square
- `storeId` on Order/Customer enables multi-tenant filtering
- Enums: `Categories`, `PaymentStatus` (PENDING/COMPLETED/FAILED), `OrderStatus` (ACTIVE/CANCEL_REQUESTED/CANCELED), `RefundStatus`

### Multi-Store / Multi-Tenant

- Each store lives at `/catalog/[slug]`
- Access is gated by a passcode stored as a cookie (`isAuthenticated`)
- Store config (branding, colors, logo, items, player roster) is loaded via `/api/storeConfig`
- Orders and customers are scoped by `storeId`

### Key Utilities

- `utils/server.ts` — `withRetry()` for resilient external API calls
- `utils/images.tsx` — `getS3ImageUrl()` for S3 image URLs
- `utils/email.ts` — Mailgun email wrapper
- `utils/numUtils.js` — numeric formatting

### Configuration Notes

- `next.config.mjs`: standalone output mode (for Vercel/Docker), S3 image domains whitelisted
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
- Square supports sandbox/production via env var toggle
- `export const dynamic = "force-dynamic"` is used on pages that must not be cached (cart, auth-gated pages)

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
