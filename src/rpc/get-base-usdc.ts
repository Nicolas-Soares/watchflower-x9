// LIBS
import { formatUnits, erc20Abi } from 'viem'

export async function getBaseUSDC(
  { address, client }:
  { address: string, client: any }
): Promise<string> {
  const USDC_CONTRACT = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

  const usdtBalance = await client.readContract({
    address: USDC_CONTRACT,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const decimals = await client.readContract({
    address: USDC_CONTRACT,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const formattedBalance = formatUnits(usdtBalance, decimals);

  return formattedBalance
}
