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
    message: '=== Choose a watchlist to delete ===',
    choices: [
      ...watchlists.map(watchlist => ({ name: watchlist.name, value: watchlist.id }))
    ]
  })

  const watchlist = await prisma.watchlist.delete({ where: { id: watchlistSelection } })

  io.print(`Deleted watchlist: ${watchlist.name} successfully!`)
  await io.pressEnterToContinue()
}
