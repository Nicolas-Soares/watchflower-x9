// LIBS
import { formatEther  } from 'viem'

// UTILS
import io from '../utils/io-util.js'

// RPC
import { getBalance } from '../rpc/get-balance.js'
import { getBaseUSDC } from '../rpc/get-base-usdc.js'
import { getEthereumUSDC } from '../rpc/get-ethereum-usdc.js'
import { getUSDT } from '../rpc/get-usdt.js'

export async function getWalletBalance({ client }: { client: any }): Promise<void> {
  io.printAppTitle()
  io.print('=== Get Wallet Balance ===')
  
  const walletAddress = await io.input({ message: 'Insert wallet address:' })
  
  const weiBalance = await getBalance({ client, address: walletAddress })
  const ethBalance = formatEther(weiBalance)

  const baseUsdcBalance = await getBaseUSDC({ client, address: walletAddress })

  io.print(`Balance: ${ethBalance} ETH`)
  io.print(`Balance: ${baseUsdcBalance} USDC`)

  await io.pressEnterToContinue()
}
