import 'dotenv/config'

// CLIENTS
import { baseClient } from './clients/base.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle, appTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui-util.js'
import { io } from './utils/io-util.js'

// FUNCTIONS
import { manageWalletWatchlists } from './functions/manage-wallet-watchlists.js'
import { getWalletBalance } from './services/get-wallet-balance.js'
import { login } from './functions/login.js'

// GLOBALS
let ACTIVE_USER

try {
  ACTIVE_USER = await login()
  appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`)
  
  while (true) {
    printAppTitle()
    print('=== Main Menu ===')
    print(`
      1 - Get wallet balance
      2 - Manage wallet watchlists
      3 - Switch user
      0 - Exit
    `)
  
    const option = await io.question('> ')
  
    switch (option) {
      case '0': print('Exiting...'); process.exit(0);
      case '1': await getWalletBalance({ client: baseClient }); break;
      case '2': await manageWalletWatchlists(); break;
      case '3':
        ACTIVE_USER = await login();
        appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`);
        break;
      default: break;
    }
  }
} catch (error) {
  print('A major error occurred. Please check the logs for more details.')
  const errorMessage = treatError(error)
  logger.error({ error }, `Error: ${errorMessage}`)
  process.exit(1)
}
