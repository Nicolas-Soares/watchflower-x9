// UTILS
import { printAppTitle } from '../utils/print-app-title-util.js'
import io from '../utils/io-util.js'

// RPC
import { checkBalance } from '../rpc/check-balance.js'

export async function getWalletBalance({ client }: { client: any }): Promise<void> {
  printAppTitle()
  io.print('=== Get Wallet Balance ===')
  
  const walletAddress = await io.input({ message: 'Insert wallet address:' })
  
  await checkBalance({ client, address: walletAddress })
  await io.pressEnterToContinue()
}
