import 'dotenv/config'

// CLIENTS
import { baseClient } from './clients/base.js'
import { prisma } from './clients/prisma.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle, appTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui-util.js'
import { io } from './utils/io-util.js'

// COMMANDS
import { upsertWalletWatchlistsCommand } from './commands/main-menu-commands/upsert-wallet-watchlists.js'
import { getWalletBalanceCommand } from './commands/main-menu-commands/get-wallet-balance.js'

async function createNewUser() {
  let username = ''
  
  while (!username) {
    printAppTitle()
    print('=== Create a new user ===')
    username = await io.question('Username: ')
  }
  
  const user = await prisma.user.create({ data: { username } })
  
  logger.info({ user }, 'User created:')
  print(`User created: ${user.username}`)

  return user
}

async function login() {
  printAppTitle()
  const users = await prisma.user.findMany()
  let user = undefined

  if (!users.length) {
    user = await createNewUser()
  } else {
    do {
      printAppTitle()
      print('=== Choose an user ===')
      print('0 - Create new user')
      print(users.map((user, index) => `${index + 1} - ${user.username}`).join('\n'))

      const userSelection = await io.question('> ')
      if (userSelection == '0') return await createNewUser()
      user = users[parseInt(userSelection) - 1]
    } while (!user)
  }

  return user
}

try {
  const ACTIVE_USER = await login()
  appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`)
  
  while (true) {
    printAppTitle()
    print('=== Main Menu ===')
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
