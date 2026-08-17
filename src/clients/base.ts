import { createPublicClient, webSocket } from 'viem'
import { base } from 'viem/chains'
 
export const baseClient = createPublicClient({ 
  chain: base, 
  transport: webSocket(`${process.env.BASE_MAINNET_RPC_URL}${process.env.ALCHEMY_API_KEY}`),
})
