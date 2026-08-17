// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import io from '../../utils/io-util.js'

// GLOBALS
import { ACTIVE_USER } from '../../shared/active-user.js'

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

  const watchlistSelection = await io.select({
    message: '=== List wallets from which list? ===',
    choices: [
      { name: '<< Return to previous menu', value: 'return' },
      ...watchlists.map(watchlist => ({ name: watchlist.name, value: watchlist.id }))
    ]
  })

  if (watchlistSelection == 'return') return

  const watchlistWallets = await prisma.wallet.findMany({
    where: {
      watchlists: {
        some: { id: watchlistSelection }
      }
    },
  })

  const walletsFormattedDataToPrint = `${watchlistWallets.map(w => `${w.network} | ${w.nickname} | ${w.address}`).join('\n')}`

  io.print('NETWORK | WALLET | ADDRESS\n')
  io.print(walletsFormattedDataToPrint)
  await io.pressEnterToContinue()
}
