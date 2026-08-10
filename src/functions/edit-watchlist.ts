// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import io from '../utils/io-util.js'

// GLOBALS
import { ACTIVE_USER } from '../shared/active-user.js'

export default async function (): Promise<void> {
  io.printAppTitle()

  const userId = ACTIVE_USER.id
  const watchlists = await prisma.watchlist.findMany({
    where: { userId }
  })

  if (watchlists.length == 0) {
    io.print('No watchlists found for the current user.')
    await io.pressEnterToContinue()
    return
  }

  const watchlistId = await io.select({
    message: '=== Choose a watchlist to edit ===',
    choices: [
      ...watchlists.map(watchlist => ({ name: watchlist.name, value: watchlist.id }))
    ]
  })

  const watchlist = await prisma.watchlist.findUnique({ where: { id: watchlistId } })

  const editOption = await io.select({
    message: `=== Edit ${watchlist?.name} ===`,
    choices: [
      { name: 'Change name', value: 'change-name' },
      { name: 'Add wallet', value: 'add-wallet' },
      { name: 'Remove wallet', value: 'remove-wallet' },
      { name: 'Return to previous menu', value: 'return' }
    ]
  })

  switch (editOption) {
    case 'change-name':
      const newWatchlistName = await io.input({ message: 'Enter watchlist name: ' })

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: { name: newWatchlistName }
      })

      io.print(`Watchlist ${watchlist?.name} updated to ${newWatchlistName}`)
      break
    case 'add-wallet':
      const walletAddrs = await io.input({ message: 'Enter wallet address: ' })

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: {
          wallets: {
            connectOrCreate: {
              where: { address: walletAddrs },
              create: { address: walletAddrs }
            }
          }
        }
      })

      break
    case 'remove-wallet':
      break
    case 'return':
      return
  }

  await io.pressEnterToContinue()
}
