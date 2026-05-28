-- Fix null labelPurchased values on orders that predate the NOT NULL constraint.
-- Prisma 6 throws P2032 when it finds null for a non-nullable Boolean field.
UPDATE "Order" SET "labelPurchased" = false WHERE "labelPurchased" IS NULL;
