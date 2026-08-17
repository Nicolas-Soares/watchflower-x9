// LIBS
import { formatEther  } from 'viem'

// CLIENTS
import {
  baseClient,
  ethereumClient
} from '../clients/network-clients.js'

// UTILS
import io from '../utils/io-util.js'

// RPC
import { getBalance } from '../rpc/get-balance.js'
import { getBaseUSDC } from '../rpc/get-base-usdc.js'
import { getEthereumUSDC } from '../rpc/get-ethereum-usdc.js'
import { getUSDT } from '../rpc/get-usdt.js'

export async function getWalletBalance(): Promise<void> {
  io.printAppTitle()
  io.print('=== Get Wallet Balance ===')

  const client = await io.select({
    message: '=== Select a network ===',
    choices: [
      { name: 'Ethereum', value: ethereumClient },
      { name: 'Base', value: baseClient }
    ]
  })

  const walletAddress = (await io.input({ message: 'Insert wallet address:' })).toLowerCase()
  
  switch (client) {
    case ethereumClient:
      const ethereumNativeCurrencyBalance = await getBalance({ client, address: walletAddress })
      
      io.print(`ETH: ${formatEther(ethereumNativeCurrencyBalance)}`)
      break
    case baseClient:
      const baseNativeCurrencyBalance = await getBalance({ client, address: walletAddress })
      const baseUsdcBalance = await getBaseUSDC({ client, address: walletAddress })
      
      io.print(`ETH: ${formatEther(baseNativeCurrencyBalance)}`)
      io.print(`USDC: ${baseUsdcBalance}`)
      break
    // case SOLANA:
    //   break;
  }

  await io.pressEnterToContinue()
}
