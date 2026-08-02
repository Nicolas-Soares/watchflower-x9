// UTILS
import { printAppTitle } from '../utils/print-app-title-util.js'
import { print } from '../utils/ui-util.js'
import { io } from '../utils/io-util.js'

// FUNCTIONS
import createWatchlist from './create-watchlist.js'
import editWatchlist from './edit-watchlist.js'
import deleteWatchlist from './delete-watchlist.js'

export async function manageWalletWatchlists(): Promise<void> {
  while (true) {
    printAppTitle()
    print("=== Manage Wallet Watchlists ===")
    print(`
      1 - Create new watchlist
      2 - Edit existing watchlist
      3 - Delete watchlist
      0 - Return to main menu
    `)
  
    const watchlistOption = await io.question("> ");
  
    switch (watchlistOption) {
      case "1":
        await createWatchlist()
        await io.question("> Press ENTER to return to menu...");
        return;
      case "2":
        await editWatchlist()
        await io.question("> Press ENTER to return to menu...");
        return;
      case "3":
        await deleteWatchlist()
        await io.question("> Press ENTER to return to menu...");
        return;
      case "0":
        return;
      default:
        break;
    }
  }
}
