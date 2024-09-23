/*
  Warnings:

  - The values [DRIFITS] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('TSHIRTS', 'HOODIES');
ALTER TABLE "OrderItem" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "OrderItem" ALTER COLUMN "category" TYPE "Categories_new" USING ("category"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
ALTER TABLE "OrderItem" ALTER COLUMN "category" SET DEFAULT 'TSHIRTS';
COMMIT;
