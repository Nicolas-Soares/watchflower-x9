export interface User {
  id: string
  createdAt: Date
  updatedAt: Date
  username: string
  discordWebhookUrl: string | null
  discordEnabled: boolean
}

export interface Wallet {
  id: string
  createdAt: Date
  updatedAt: Date
  nickname: string
  blockchain: string
  address: string
  watchListId: string
}

export interface WatchList {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  userId: string
}

export type WatchListWithWallets = WatchList & {
  wallets: Wallet[]
}

export interface ElectronAPI {
  getUsers: () => Promise<User[]>
  createUser: (username: string) => Promise<User>
  getUserById: (id: string) => Promise<User | null>
  checkBalance: (address: string) => Promise<{ address: string; balanceEth: string }>
  getWatchlists: (userId: string) => Promise<WatchListWithWallets[]>
  createWatchlist: (data: { name: string; userId: string }) => Promise<WatchList>
  updateWatchlist: (data: { id: string; name: string }) => Promise<WatchList>
  deleteWatchlist: (id: string) => Promise<void>
  addWallet: (data: { address: string; nickname: string; blockchain: string; watchListId: string }) => Promise<Wallet>
  removeWallet: (id: string) => Promise<void>
}

declare global {
  interface Window {
    api: ElectronAPI
  }
}
