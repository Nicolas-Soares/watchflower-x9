import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getUsers: () => ipcRenderer.invoke('user:getAll'),
  createUser: (username: string) => ipcRenderer.invoke('user:create', username),
  getUserById: (id: string) => ipcRenderer.invoke('user:getById', id),
  
  checkBalance: (address: string) => ipcRenderer.invoke('wallet:checkBalance', address),
  
  getWatchlists: (userId: string) => ipcRenderer.invoke('watchlist:getAll', userId),
  createWatchlist: (data: { name: string; userId: string }) => ipcRenderer.invoke('watchlist:create', data),
  updateWatchlist: (data: { id: string; name: string }) => ipcRenderer.invoke('watchlist:update', data),
  deleteWatchlist: (id: string) => ipcRenderer.invoke('watchlist:delete', id),
  addWallet: (data: { address: string; nickname: string; blockchain: string; watchListId: string }) => ipcRenderer.invoke('watchlist:addWallet', data),
  removeWallet: (id: string) => ipcRenderer.invoke('watchlist:removeWallet', id)
})
