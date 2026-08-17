// LIBS
import { formatUnits, erc20Abi } from 'viem'

export async function getEthereumUSDC(
  { address, client }:
  { address: string, client: any }
): Promise<string> {
  const USDC_CONTRACT = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

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
