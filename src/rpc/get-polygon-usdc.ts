// LIBS
import { formatUnits, erc20Abi } from 'viem'

export async function getPolygonUSDC(
  { address, client }:
  { address: string, client: any }
): Promise<string> {
  const USDC_CONTRACT = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'

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
