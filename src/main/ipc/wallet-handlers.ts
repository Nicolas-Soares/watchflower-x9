import { ipcMain } from 'electron'
import { checkBalance } from '../services/wallet-service.js'
import { treatError } from '../utils/treat-error.js'

export function registerWalletHandlers() {
  ipcMain.handle('wallet:checkBalance', async (_event, address: string) => {
    try {
      return await checkBalance(address)
    } catch (error) {
      treatError(error, 'Error checking balance')
    }
  })
}
