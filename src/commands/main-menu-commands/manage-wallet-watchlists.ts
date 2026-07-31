// UTILS
import { printAppTitle } from '../../utils/print-app-title-util.js'
import { print } from '../../utils/ui-util.js'
import { io } from '../../utils/io-util.js'

export async function manageWalletWatchlistsCommand(): Promise<void> {
  let returnToMenu: boolean = false
  
  while (!returnToMenu) {
    printAppTitle()
    print("=== Manage Wallet Watchlists ===")
    print(`
      1 - Create new watchlist
      2 - Edit existing watchlist
      3 - Delete watchlist
      4 - Return to main menu
    `)
  
    const watchlistOption = await io.question("> ");
  
    switch (watchlistOption) {
      case "1":
        print("Creating new watchlist...");
        // call create watchlist function
        await io.question("> Press ENTER to return to menu...");
        returnToMenu = true;
        break;
      case "2":
        print("Editing existing watchlist...");
        // call edit watchlist function
        await io.question("> Press ENTER to return to menu...");
        returnToMenu = true;
        break;
      case "3":
        print("Deleting watchlist...");
        // call delete watchlist function
        await io.question("> Press ENTER to return to menu...");
        returnToMenu = true;
        break;
      case "4":
        returnToMenu = true;
        break;
      default:
        break;
    }
  }
}
