/*
  Warnings:

  - You are about to drop the column `watchlistId` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_watchlistId_fkey";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "watchlistId";

-- CreateTable
CREATE TABLE "_WalletToWatchlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WalletToWatchlist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_WalletToWatchlist_B_index" ON "_WalletToWatchlist"("B");

-- AddForeignKey
ALTER TABLE "_WalletToWatchlist" ADD CONSTRAINT "_WalletToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WalletToWatchlist" ADD CONSTRAINT "_WalletToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
