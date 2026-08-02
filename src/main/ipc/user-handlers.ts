import { ipcMain } from 'electron'
import { getUsers, createUser, getUserById } from '../services/user-service.js'
import { treatError } from '../utils/treat-error.js'

export function registerUserHandlers() {
  ipcMain.handle('user:getAll', async () => {
    try {
      return await getUsers()
    } catch (error) {
      treatError(error, 'Error getting users')
    }
  })

  ipcMain.handle('user:create', async (_event, username: string) => {
    try {
      return await createUser(username)
    } catch (error) {
      treatError(error, 'Error creating user')
    }
  })

  ipcMain.handle('user:getById', async (_event, id: string) => {
    try {
      return await getUserById(id)
    } catch (error) {
      treatError(error, 'Error getting user by id')
    }
  })
}
