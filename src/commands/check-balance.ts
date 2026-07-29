// LIBS
import { formatEther  } from 'viem'

// UTILS
import { logger } from '../utils/logger-util.js'

export async function checkBalance(
  { address, client }:
  { address: string, client: any }
): Promise<void> {
  try {
    const weiBalance = await client.getBalance({ address })
    const ethBalance = formatEther(weiBalance)
    
    console.log(`Balance: ${ethBalance} ETH`)
  } catch (error) {
    logger.error({ error }, `Error checking balance for address ${address}`)
  }
}
