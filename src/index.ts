// LIBS
import 'dotenv/config'

// UTILS
import { logger } from './utils/logger-util.js'
import { appTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import io from './utils/io-util.js'

// FUNCTIONS
import createWatchlist from './functions/watchlist/create-watchlist.js'
import editWatchlist from './functions/watchlist/edit-watchlist.js'
import deleteWatchlist from './functions/watchlist/delete-watchlist.js'
import showWatchlist from './functions/watchlist/show-watchlist.js'
import { getWalletBalance } from './services/get-wallet-balance.js'
import { login } from './functions/user/login.js'

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
          { name: '[*] Show watchlists', value: 'show-watchlist' },
          { name: '[+] Create new watchlist', value: 'create-watchlist' },
          { name: '[#] Edit existing watchlist', value: 'edit-watchlist' },
          { name: '[-] Delete watchlist', value: 'delete-watchlist' },
          { name: '<< Exit', value: 'exit' }
        ]
      })
      
      switch (option) {
        case 'balance': await getWalletBalance(); break;
        case 'show-watchlist': await showWatchlist();                   break;
        case 'create-watchlist': await createWatchlist();               break;
        case 'edit-watchlist': await editWatchlist();                   break;
        case 'delete-watchlist': await deleteWatchlist();               break;
        case 'exit': process.exit(0);
        case 'switch-user':
          setActiveUser(await login())
          appTitle.setSubHeader(`>> Logged as: ${ACTIVE_USER.username}\n`);
          break;
      }
    }
  } catch (error) {
    const errorMessage = treatError(error)
    io.print('A major error occurred. Please check the logs for more details.')
    logger.error({ error }, `Error: ${errorMessage}`)
    process.exit(1)
  }
}

main()
