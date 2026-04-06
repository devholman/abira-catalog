-- CreateTable
CREATE TABLE "ShippingRateSelection" (
    "id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "rateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShippingRateSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShippingRateSelection" ADD CONSTRAINT "ShippingRateSelection_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
