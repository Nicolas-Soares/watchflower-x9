// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import io from '../../utils/io-util.js'

// GLOBALS
import { ACTIVE_USER } from '../../shared/active-user.js'

export default async function (): Promise<void> {
  io.printAppTitle()

  const watchlistName = await io.input({ message: 'Enter watchlist name:' })
  const userId = ACTIVE_USER.id

  await prisma.watchlist.create({
    data: {
      name: watchlistName,
      userId
    }
  })

  io.print(`Watchlist ${watchlistName} created successfully!`)
  await io.pressEnterToContinue()
}
