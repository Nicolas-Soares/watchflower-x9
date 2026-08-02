import { ipcMain } from 'electron'
import { getWatchlists, createWatchlist, updateWatchlist, deleteWatchlist, addWallet, removeWallet } from '../services/watchlist-service.js'
import { treatError } from '../utils/treat-error.js'

export function registerWatchlistHandlers() {
  ipcMain.handle('watchlist:getAll', async (_event, userId: string) => {
    try {
      return await getWatchlists(userId)
    } catch (error) {
      treatError(error, 'Error getting watchlists')
    }
  })

  ipcMain.handle('watchlist:create', async (_event, data: { name: string; userId: string }) => {
    try {
      return await createWatchlist(data)
    } catch (error) {
      treatError(error, 'Error creating watchlist')
    }
  })

  ipcMain.handle('watchlist:update', async (_event, data: { id: string; name: string }) => {
    try {
      return await updateWatchlist(data)
    } catch (error) {
      treatError(error, 'Error updating watchlist')
    }
  })

  ipcMain.handle('watchlist:delete', async (_event, id: string) => {
    try {
      return await deleteWatchlist(id)
    } catch (error) {
      treatError(error, 'Error deleting watchlist')
    }
  })

  ipcMain.handle('watchlist:addWallet', async (_event, data: { address: string; nickname: string; blockchain: string; watchListId: string }) => {
    try {
      return await addWallet(data)
    } catch (error) {
      treatError(error, 'Error adding wallet')
    }
  })

  ipcMain.handle('watchlist:removeWallet', async (_event, id: string) => {
    try {
      return await removeWallet(id)
    } catch (error) {
      treatError(error, 'Error removing wallet')
    }
  })
}
