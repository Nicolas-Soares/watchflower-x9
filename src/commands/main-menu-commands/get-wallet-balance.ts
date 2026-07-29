// UTILS
import { printAppTitle } from '../../utils/print-app-title-util.js'
import { print } from '../../utils/ui-util.js'
import { io } from '../../utils/io-util.js'

// RPC
import { checkBalance } from '../../rpc/check-balance.js'

export async function getWalletBalanceCommand({ client }: { client: any }): Promise<void> {
  printAppTitle()
  print('=== Get wallet balance ===')
  print('Insert wallet address:')
  
  const walletAddress = await io.question('> ')
  
  await checkBalance({ client, address: walletAddress })
  await io.question('> Press ENTER to return to menu...')
}
