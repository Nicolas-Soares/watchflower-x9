// LIBS
import 'dotenv/config'

// CLIENTS
import { baseClient } from './clients/base.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { appTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import io from './utils/io-util.js'

// FUNCTIONS
import createWatchlist from './functions/watchlist/create-watchlist.js'
import { manageWalletWatchlists } from './functions/watchlist/manage-wallet-watchlists.js'
import { getWalletBalance } from './services/get-wallet-balance.js'
import { login } from './functions/user/login.js'

// TYPES
import type { User } from './shared/types/user.js'

// GLOBALS
import {
  ACTIVE_USER,
  setActiveUser
} from './shared/active-user.js'

async function main() {
  try {
    setActiveUser(await login())
  
    appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`)
  
    while (true) {
      io.printAppTitle()
    
      const option = await io.select({
        message: '=== Main Menu ===',
        choices: [
          { name: '[<>] Switch user', value: 'switch-user' },
          { name: '[$] Get wallet balance', value: 'balance' },
          { name: '[+] Create new watchlist', value: 'create-watchlist' },
          { name: '[#] Manage wallet watchlists', value: 'manage-watchlists' },
          { name: '<< Exit', value: 'exit' }
        ]
      })
      
      switch (option) {
        case 'switch-user':
          setActiveUser(await login())
          appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`);
          break;
        case 'balance':
          await getWalletBalance({ client: baseClient });
          break;
        case 'create-watchlist':
          await createWatchlist()
          break;
        case 'manage-watchlists':
          await manageWalletWatchlists();
          break;
        case 'exit':
          io.print('Exiting...');
          process.exit(0);
      }
    }
  } catch (error) {
    io.print('A major error occurred. Please check the logs for more details.')

    const errorMessage = treatError(error)

    logger.error({ error }, `Error: ${errorMessage}`)
    
    process.exit(1)
  }
}

main()
