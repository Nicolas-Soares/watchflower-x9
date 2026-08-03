// UTILS
import { printAppTitle } from '../utils/print-app-title-util.js'
import { print, pressEnterToContinue } from '../utils/ui-util.js'
import io from '../utils/io-util.js'

// RPC
import { checkBalance } from '../rpc/check-balance.js'

export async function getWalletBalance({ client }: { client: any }): Promise<void> {
  printAppTitle()
  print('=== Get Wallet Balance ===')
  
  const walletAddress = await io.input({ message: 'Insert wallet address:' })
  
  await checkBalance({ client, address: walletAddress })
  await pressEnterToContinue()
}
