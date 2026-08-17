// LIBS
import { formatUnits, erc20Abi } from 'viem'

export async function getUSDT(
  { address, client }:
  { address: string, client: any }
): Promise<string> {
  const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

  const usdtBalance = await client.readContract({
    address: USDT_CONTRACT,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const decimals = await client.readContract({
    address: USDT_CONTRACT,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const formattedBalance = formatUnits(usdtBalance, decimals);

  return formattedBalance
}
