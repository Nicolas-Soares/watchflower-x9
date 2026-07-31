import 'dotenv/config'

// CLIENTS
import { baseClient } from './clients/base.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle, appTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui-util.js'
import { io } from './utils/io-util.js'

// COMMANDS
import { manageWalletWatchlistsCommand } from './commands/main-menu-commands/manage-wallet-watchlists.js'
import { getWalletBalanceCommand } from './commands/main-menu-commands/get-wallet-balance.js'
import { login } from './commands/subcommands/login.js'

try {
  const ACTIVE_USER = await login()
  appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`)
  
  while (true) {
    printAppTitle()
    print('=== Main Menu ===')
    print(`
      1 - Get wallet balance
      2 - Manage wallet watchlists
      3 - Exit
    `)
  
    const option = await io.question('> ')
  
    switch (option) {
      case '1':
        await getWalletBalanceCommand({ client: baseClient })
        break
      case '2':
        await manageWalletWatchlistsCommand()
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
