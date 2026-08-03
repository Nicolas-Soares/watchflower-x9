// LIBS
import { formatEther  } from 'viem'

// UTILS
import { logger } from '../utils/logger-util.js'
import io from '../utils/io-util.js'

export async function checkBalance(
  { address, client }:
  { address: string, client: any }
): Promise<void> {
  try {
    const weiBalance = await client.getBalance({ address })
    const ethBalance = formatEther(weiBalance)
    
    io.print(`Balance: ${ethBalance} ETH`)
  } catch (error) {
    io.print(`Error checking balance for address [${address}]. Please check the logs for more details.`)
    logger.error({ error }, `Error checking balance for address [${address}]`)
  }
}
