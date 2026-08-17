
export async function getBalance(
  { address, client }:
  { address: string, client: any }
): Promise<any> {
  const weiBalance = await client.getBalance({ address })
  return weiBalance
}
