import { registerUserHandlers } from './user-handlers.js'
import { registerWalletHandlers } from './wallet-handlers.js'
import { registerWatchlistHandlers } from './watchlist-handlers.js'

export function registerAllIpcHandlers() {
  registerUserHandlers()
  registerWalletHandlers()
  registerWatchlistHandlers()
}
