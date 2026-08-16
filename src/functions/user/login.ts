// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import { logger } from '../../utils/logger-util.js'
import io from '../../utils/io-util.js'

// FUNCTIONS
import { createNewUser } from './create-new-user.js'
import { deleteUser } from './delete-user.js'
import { editUser } from './edit-user.js'

// TYPES
import type { User } from '../../shared/types/user.js'

export async function login(): Promise<User> {
  io.printAppTitle()

  const users = await prisma.user.findMany()

  if (!users.length) return await createNewUser()

  while (true) {
    io.printAppTitle()
  
    const userSelection = await io.select({
      message: '=== Choose an user ===',
      choices: [
        { name: '[+] Create new user', value: 'create-new-user' },
        { name: '[-] Delete user', value: 'delete-user' },
        { name: '[#] Edit user', value: 'edit-user' },
        ...users.map(user => ({ name: user.username, value: user.id }))
      ]
    })
  
    if (['create-new-user', 'delete-user', 'edit-user'].includes(userSelection)) {
      switch (userSelection) {
        case 'create-new-user':                 return await createNewUser()
        case 'edit-user': await editUser();     return await login()
        case 'delete-user': await deleteUser(); return await login()
      }
    }
  
    const user = users.find(u => u.id === userSelection)
  
    logger.info(`User selected: ${user}`)

    if (user) return user
  }
}
