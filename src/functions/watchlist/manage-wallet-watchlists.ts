// UTILS
import io from '../../utils/io-util.js'

// FUNCTIONS
import editWatchlist from './edit-watchlist.js'
import deleteWatchlist from './delete-watchlist.js'

export async function manageWalletWatchlists(): Promise<void> {
  while (true) {
    io.printAppTitle()
  
    const option = await io.select({
      message: '=== Manage Wallet Watchlists ===',
      choices: [
        { name: 'Edit existing watchlist', value: 'edit-watchlist' },
        { name: 'Delete watchlist', value: 'delete-watchlist' },
        { name: 'Return to main menu', value: 'main-menu' }
      ]
    });
  
    switch (option) {
      case 'edit-watchlist':
        await editWatchlist()
        break;
      case 'delete-watchlist':
        await deleteWatchlist()
        break;
      case 'main-menu':
        return;
    }
  }
}
