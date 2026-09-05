// Single source of truth for apparel surcharge math.
//
// Imported by both the client cart (context/CartContext.tsx, components/Modal.tsx)
// and the server order routes so the price the customer is shown, the price we
// persist, and the price Square charges can never drift apart.
//
// Keep this file dependency-light: it may only import the pure `toFixedNumber`
// helper. Nothing from `app/` — it has to stay importable by the client bundle.

import { toFixedNumber } from "./numUtils";

// Customer-facing material string that signals the Dri-Fit upcharge. This is the
// value stored in each team config's `material` array (via `catalogConfigs.DRIFIT`)
// and the value compared against in the client cart.
export const DRIFIT_MATERIAL_LABEL = "Dri-Fit (+ $5)";

// The value actually persisted to OrderItem.material — the "(+ $5)" annotation is
// stripped so it doesn't leak onto admin fulfillment sheets.
export const DRIFIT_NORMALIZED = "Dri-Fit";

export const DRIFIT_SURCHARGE = 5;
export const OVERSIZE_SURCHARGE = 3;
export const OVERSIZE_SIZES = ["2XL", "3XL", "4XL"];
export const DEFAULT_BACKOPTION_PRICE = 2;

// Strip the "(+ $5)" annotation for storage. Mirrors the ternary that used to
// live inline in app/api/orders/route.ts.
export function normalizeMaterial(material: string): string {
  return material === DRIFIT_MATERIAL_LABEL ? DRIFIT_NORMALIZED : material;
}

export interface UnitPriceArgs {
  basePrice: number;
  material: string;
  size: string;
  isAddBack?: boolean | null;
  backOptionPrice?: number | null;
}

function computeUnitPriceInternal(
  args: UnitPriceArgs,
  driFitMatches: (material: string) => boolean
): number {
  let price = args.basePrice;
  if (args.isAddBack) {
    price += args.backOptionPrice ?? DEFAULT_BACKOPTION_PRICE;
  }
  if (driFitMatches(args.material)) {
    price += DRIFIT_SURCHARGE;
  }
  if (OVERSIZE_SIZES.includes(args.size)) {
    price += OVERSIZE_SURCHARGE;
  }
  return toFixedNumber(price, 2, 10);
}

// Canonical surcharge-inclusive price for ONE unit. `material` must be the RAW
// cart selection string (before normalizeMaterial). Matches the per-unit `base`
// math in CartContext.calculateTotalPrice exactly.
export function computeUnitPrice(args: UnitPriceArgs): number {
  return computeUnitPriceInternal(
    args,
    (material) => material === DRIFIT_MATERIAL_LABEL
  );
}

// Fallback for orders created before OrderItem.unitPrice existed, used by
// GET /api/orders/[orderId]. Identical to computeUnitPrice except it also treats
// the persisted `"Dri-Fit"` value as an upcharge — restoring the behavior that
// existed before commit cc9c08e.
export function computeLegacyUnitPrice(args: UnitPriceArgs): number {
  return computeUnitPriceInternal(
    args,
    (material) =>
      material === DRIFIT_MATERIAL_LABEL || material === DRIFIT_NORMALIZED
  );
}
