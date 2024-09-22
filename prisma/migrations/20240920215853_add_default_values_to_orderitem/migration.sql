/*
  Warnings:

  - You are about to drop the column `playerName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `playerNumber` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "playerName",
DROP COLUMN "playerNumber";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "playerName" TEXT NOT NULL DEFAULT 'Jane Doe',
ADD COLUMN     "playerNumber" INTEGER NOT NULL DEFAULT 0;
