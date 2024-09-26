-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "isAddBack" DROP NOT NULL,
ALTER COLUMN "isAddBack" SET DEFAULT false;
