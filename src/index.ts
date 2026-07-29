import 'dotenv/config'

// CLIENTS
import { baseClient } from './clients/base.js'
import { prisma } from './clients/prisma.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui-util.js'
import { io } from './utils/io-util.js'

// COMMANDS
import { upsertWalletWatchlistsCommand } from './commands/main-menu-commands/upsert-wallet-watchlists.js'
import { getWalletBalanceCommand } from './commands/main-menu-commands/get-wallet-balance.js'

async function login() {
  printAppTitle()
  const users = await prisma.user.findMany()
  let user = undefined

  if (!users.length) {
    let username = ''

    while (!username) {
      printAppTitle()
      print('=== Create an user ===')
      username = await io.question('Username: ')
    }

    user = await prisma.user.create({ data: { username } })

    logger.info( { user }, 'User created:')
    print(`User created: ${user.username}`)
  } else {
    do {
      printAppTitle()
      print('=== Choose an user ===')
      print(...users.map((user, index) => `${index + 1} - ${user.username}`))

      const userSelection = await io.question('> ')
      user = users[parseInt(userSelection) - 1]
    } while (!user)
  }

  return user
}

try {
  const ACTIVE_USER = await login()
  
  while (true) {
    // `>> Logged as [${ACTIVE_USER.username}]`
    printAppTitle()
    print('Choose an option:')
    print(`
      1 - Get wallet balance
      2 - Create/Edit wallet watchlist
      3 - Exit
    `)
  
    const option = await io.question('> ')
  
    switch (option) {
      case '1':
        await getWalletBalanceCommand({ client: baseClient })
        break
      case '2':
        await upsertWalletWatchlistsCommand()
        break
      case '3':
        print('Exiting...')
        process.exit(0)
     default:
        break
    }
  }
} catch (error) {
  print('A major error occurred. Please check the logs for more details.')
  const errorMessage = treatError(error)
  logger.error({ error }, `Error: ${errorMessage}`)
  process.exit(1)
}
