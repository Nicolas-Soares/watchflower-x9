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

  const watchlistId = await io.select({
    message: '=== Choose a watchlist to edit ===',
    choices: [
      ...watchlists.map(watchlist => ({ name: watchlist.name, value: watchlist.id }))
    ]
  })

  const watchlist = await prisma.watchlist.findUnique({
    where: { id: watchlistId },
    include: { wallets: true }
  })

  const editOption = await io.select({
    message: `=== Edit options ===`,
    choices: [
      { name: 'Change name', value: 'change-name' },
      { name: 'Add wallet', value: 'add-wallet' },
      { name: 'Remove wallet', value: 'remove-wallet' },
      { name: 'Return to previous menu', value: 'return' }
    ]
  })

  switch (editOption) {
    case 'change-name':
      const newWatchlistName = await io.input({ message: 'Enter watchlist name:' })

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: { name: newWatchlistName }
      })

      io.print(`Changed ${watchlist?.name} to --> ${newWatchlistName}`)
      break
    case 'add-wallet':
      const watchlistWallets = await prisma.wallet.findMany({
        where: {
          watchlists: {
            some: { id: watchlistId }
          }
        },
      })

      io.print(`${watchlistWallets.map(w => `[${w.nickname}] ${w.address}`).join('\n')}`)

      const walletAddrs = await io.input({ message: 'Enter wallet address:' })
      const walletNickname = await io.input({
        message: 'Enter wallet nickname (or don\'t):',
        validation: false
      })

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: {
          wallets: {
            connectOrCreate: {
              where: { address: walletAddrs },
              create: {
                address: walletAddrs,
                ...(walletNickname && { nickname: walletNickname })
              }
            }
          }
        }
      })

      io.print(`Address ${walletAddrs} added to ${watchlist?.name}`)
      break
    case 'remove-wallet':
      if (!watchlist?.wallets.length) {
        io.print('No wallets found in this watchlist.')
        break
      }

      const walletToDelete = await io.select({
        message: `=== Choose a wallet to remove from ${watchlist?.name} ===`,
        choices: [
          ...watchlist?.wallets.map(wallet => ({ name: `[${wallet.nickname}] ${wallet.address}`, value: wallet.id }))
        ]
      })

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: {
          wallets: {
            disconnect: { id: walletToDelete }
          }
        }
      })

      io.print(`Address removed from ${watchlist?.name}`)
      break
    case 'return':
      return
  }

  await io.pressEnterToContinue()
}
