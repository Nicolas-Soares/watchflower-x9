import { createPublicClient, webSocket } from 'viem'
import {
  base,
  mainnet,
  polygon
} from 'viem/chains'
 
export const baseClient = createPublicClient({ 
  chain: base, 
  transport: webSocket(`${process.env.BASE_MAINNET_RPC_URL}${process.env.ALCHEMY_API_KEY}`),
})

export const ethereumClient = createPublicClient({ 
  chain: mainnet, 
  transport: webSocket(`${process.env.ETHEREUM_MAINNET_RPC_URL}${process.env.ALCHEMY_API_KEY}`),
})

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: webSocket(`${process.env.POLYGON_MAINNET_RPC_URL}${process.env.ALCHEMY_API_KEY}`),
})
