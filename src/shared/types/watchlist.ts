import type { User } from './user.js'
import type { Wallet } from './wallet.js'

export interface Watchlist {
  id:         string,
  createdAt:  Date,
  updatedAt:  Date,
  name:       string
  wallets?:   Wallet[]
  userId:     string
  user?:      User
}
