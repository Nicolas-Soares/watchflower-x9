import type { Network } from "./network.enum.js"
import type { Watchlist } from "./watchlist.js"

export interface Wallet {
  id:           string,
  createdAt:    Date,
  updatedAt:    Date,
  nickname:     string,
  network?:     Network,
  address:      string,
  watchlists?:  Watchlist[]
}
