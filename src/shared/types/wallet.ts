import type { Blockchain } from "./blockchain.enum.js"
import type { Watchlist } from "./watchlist.js"

export interface Wallet {
  id:           string,
  createdAt:    Date,
  updatedAt:    Date,
  nickname:     string,
  blockchain?:  Blockchain,
  address:      string,
  watchlistId:  string,
  watchlist?:   Watchlist
}
