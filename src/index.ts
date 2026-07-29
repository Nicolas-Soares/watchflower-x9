// LIBS
import { config } from 'dotenv'

// BLOCKCHAIN CLIENTS
import { baseClient } from './clients/base.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui-util.js'
import { io } from './utils/io-util.js'

// COMMANDS
import { upsertWalletWatchlistsCommand } from './commands/main-menu-commands/upsert-wallet-watchlists.js'
import { getWalletBalanceCommand } from './commands/main-menu-commands/get-wallet-balance.js'

try {
  config()
  
  while (true) {
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
