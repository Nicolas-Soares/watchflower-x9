import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'
 
export const ethereumClient = createPublicClient({ 
  chain: mainnet, 
  transport: webSocket(`${process.env.ETHEREUM_MAINNET_RPC_URL}${process.env.ALCHEMY_API_KEY}`),
})
