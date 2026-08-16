// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import io from '../../utils/io-util.js'

// TYPES
import { Blockchain } from '../../shared/types/blockchain.enum.js'

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

  const watchlistWallets = await prisma.wallet.findMany({
    where: {
      watchlists: {
        some: { id: watchlistId }
      }
    },
  })

  const walletsFormattedDataToPrint = `${watchlistWallets.map(w => `${w.blockchain} | ${w.nickname} | ${w.address}`).join('\n')}`

  io.print('CHAIN | WALLET | ADDRESS\n')
  io.print(walletsFormattedDataToPrint)

  const editOption = await io.select({
    message: `=== Edit options ===`,
    choices: [
      { name: '[#] Change watchlist name', value: 'change-name' },
      { name: '[+] Add wallet', value: 'add-wallet' },
      { name: '[#] Edit wallet', value: 'edit-wallet' },
      { name: '[-] Remove wallet', value: 'remove-wallet' },
      { name: '<< Return to previous menu', value: 'return' }
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
      const walletAddrs = await io.input({ message: 'Enter wallet address:' })

      const walletNickname = await io.input({
        message: 'Enter wallet nickname (or don\'t):',
        validation: false
      })

      const userWantsToSetBlockchain = await io.select({
        message: 'Do you want to set a blockchain for this wallet?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false },
        ]
      })


      let walletBlockchain: null | Blockchain = null

      if (userWantsToSetBlockchain) {
        walletBlockchain = await io.select({
          message: 'Chosse an available blockchain:',
          choices: Object.values(Blockchain).map(b => ({ name: b, value: b }))
        })
      }

      await prisma.watchlist.update({
        where: { id: watchlistId },
        data: {
          wallets: {
            connectOrCreate: {
              where: { address: walletAddrs },
              create: {
                address: walletAddrs,
                ...(walletNickname && { nickname: walletNickname }),
                ...(walletBlockchain && { blockchain: walletBlockchain })
              }
            }
          }
        }
      })

      io.print(`Address ${walletAddrs} added to ${watchlist?.name}`)
      break
    case 'edit-wallet':
      io.printAppTitle()

      const walletSelection = await io.select({
        message: '=== Select a wallet to edit ===',
        choices: [
          ...watchlistWallets.map(w => ({ name: `${w.blockchain} | ${w.nickname} | ${w.address}`, value: w.id }))
        ]
      })

      const editSelection = await io.select({
        message: '=== What do you want to edit? ===',
        choices: [
          { name: 'Chain', value: 'blockchain' },
          { name: 'Nickname', value: 'nickname' },
          { name: 'Address', value: 'address' },
        ]
      })

      let value

      if (editSelection == 'blockchain') {
        value = await io.select({
          message: '=== Select a blockchain ===',
          choices: Object.values(Blockchain).map(b => ({ name: b, value: b }))
        })
      } else {
        value = await io.input({ message: `Enter new ${editSelection}` })
      }

      await prisma.wallet.update({
        where: { id: walletSelection },
        data: { [editSelection]: value }
      })

      io.print(`Value of ${editSelection} updated successfully!`)
      break
    case 'remove-wallet':
      if (!watchlist?.wallets.length) {
        io.print('No wallets found in this watchlist.')
        break
      }

      const walletToDelete = await io.select({
        message: `=== Choose a wallet to remove from ${watchlist?.name} ===`,
        choices: [
          ...watchlist?.wallets.map(w => ({ name: `${w.nickname} | ${w.address}`, value: w.id }))
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
    case 'return': return
  }

  await io.pressEnterToContinue()
}
