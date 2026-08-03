// LIBS
import 'dotenv/config'
import { select as promptSelect } from '@inquirer/prompts'

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

// TYPES
import type { User } from './shared/types/user.js'

// GLOBALS
let ACTIVE_USER: User

async function main() {
  try {
    ACTIVE_USER = await login()
  
    appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`)
  
    while (true) {
      printAppTitle()
    
      const option = await promptSelect({
        message: '=== Main Menu ===',
        choices: [
          { name: 'Get wallet balance', value: 'balance' },
          { name: 'Manage wallet watchlists', value: 'manage-watchlists' },
          { name: 'Switch user', value: 'switch-user' },
          { name: 'Exit', value: 'exit' }
        ]
      })
      
      switch (option) {
        case 'exit': print('Exiting...'); process.exit(0);
        case 'balance': await getWalletBalance({ client: baseClient }); break;
        case 'manage-watchlists': await manageWalletWatchlists(); break;
        case 'switch-user':
          ACTIVE_USER = await login();
          appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`);
          break;
      }
    }
  } catch (error) {
    print('A major error occurred. Please check the logs for more details.')
    const errorMessage = treatError(error)
    logger.error({ error }, `Error: ${errorMessage}`)
    process.exit(1)
  }
}

main()
