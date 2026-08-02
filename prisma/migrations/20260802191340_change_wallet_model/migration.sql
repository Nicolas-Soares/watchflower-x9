/*
  Warnings:

  - You are about to drop the column `watchListId` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `watchlistId` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_watchListId_fkey";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "watchListId",
ADD COLUMN     "watchlistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
