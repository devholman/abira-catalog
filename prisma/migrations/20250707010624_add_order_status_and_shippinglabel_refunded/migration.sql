-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACTIVE', 'CANCEL_REQUESTED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "ShippingLabel" DROP CONSTRAINT "ShippingLabel_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ShippingRateSelection" DROP CONSTRAINT "ShippingRateSelection_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "ShippingLabel" ADD COLUMN     "refunded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shippoTransactionId" TEXT;

-- AddForeignKey
ALTER TABLE "ShippingLabel" ADD CONSTRAINT "ShippingLabel_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingRateSelection" ADD CONSTRAINT "ShippingRateSelection_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
