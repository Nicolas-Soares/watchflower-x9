import { viemClient } from '../clients/viem.js'
import { formatEther } from 'viem'

export async function checkBalance(address: string): Promise<{ address: string; balanceEth: string }> {
  const balance = await viemClient.getBalance({ address: address as `0x${string}` })
  return {
    address,
    balanceEth: formatEther(balance)
  }
}
