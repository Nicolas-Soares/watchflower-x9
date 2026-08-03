// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import { printAppTitle } from '../utils/print-app-title-util.js'
import { logger } from '../utils/logger-util.js'
import io from '../utils/io-util.js'

// FUNCTIONS
import { createNewUser } from './create-new-user.js'
import { deleteUser } from './delete-user.js'

// TYPES
import type { User } from '../shared/types/user.js'

export async function login(): Promise<User> {
  printAppTitle()

  const users = await prisma.user.findMany()

  if (!users.length) return await createNewUser()

  while (true) {
    printAppTitle()
  
    const userSelection = await io.select({
      message: '=== Choose an user ===',
      choices: [
        { name: '+ Create new user', value: 'create-new-user' },
        { name: '- Delete user', value: 'delete-user' },
        ...users.map(user => ({ name: user.username, value: user.id }))
      ]
    })
  
    if (userSelection == 'create-new-user') return await createNewUser()
    if (userSelection == 'delete-user') {
      await deleteUser()
      return await login()
    }
  
    const user = users.find(u => u.id === userSelection)
  
    logger.info(`User selected: ${user}`)

    if (user) return user
  }
}
