// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import { logger } from '../utils/logger-util.js'
import io from '../utils/io-util.js'

// GLOBALS
import { ACTIVE_USER } from '../shared/active-user.js'

export default async function (): Promise<void> {
  io.printAppTitle()

  const watchlistName = await io.input({ message: 'Enter watchlist name: ' })
  const userId = ACTIVE_USER.id

  const watchlist = await prisma.watchlist.create({
    data: {
      name: watchlistName,
      userId
    }
  })

  logger.info({ watchlist }, 'Watchlist created:')
}
