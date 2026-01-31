-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'QUEUED', 'SUCCESS', 'FAILED', 'NOT_REQUESTED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deleteQueuedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ShippingLabel" ADD COLUMN     "refundStatus" "RefundStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "refundedAt" TIMESTAMP(3);
