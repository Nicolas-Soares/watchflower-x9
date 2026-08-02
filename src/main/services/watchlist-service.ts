import { prisma } from '../clients/prisma.js'
import type { WatchListWithWallets, WatchList, Wallet } from '../../shared/types.js'

export async function getWatchlists(userId: string): Promise<WatchListWithWallets[]> {
  return await prisma.watchList.findMany({
    where: { userId },
    include: {
      wallets: true
    }
  })
}

export async function createWatchlist(data: { name: string; userId: string }): Promise<WatchList> {
  return await prisma.watchList.create({
    data
  })
}

export async function updateWatchlist(data: { id: string; name: string }): Promise<WatchList> {
  return await prisma.watchList.update({
    where: { id: data.id },
    data: { name: data.name }
  })
}

export async function deleteWatchlist(id: string): Promise<void> {
  await prisma.watchList.delete({
    where: { id }
  })
}

export async function addWallet(data: { address: string; nickname: string; blockchain: string; watchListId: string }): Promise<Wallet> {
  return await prisma.wallet.create({
    data
  })
}

export async function removeWallet(id: string): Promise<void> {
  await prisma.wallet.delete({
    where: { id }
  })
}
