-- Migration for changing playerNumber from String to Int

ALTER TABLE "Customer" DROP COLUMN "playerNumber";

ALTER TABLE "Customer" ADD COLUMN "playerNumber" INTEGER;
