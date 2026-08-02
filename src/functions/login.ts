// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import { printAppTitle } from '../utils/print-app-title-util.js'
import { print } from '../utils/ui-util.js'
import { io } from '../utils/io-util.js'

// SUBCOMMANDS
import { createNewUser } from './create-new-user.js'

// TYPES
import type { User } from '../shared/types/user.js'

export async function login(): Promise<User> {
  printAppTitle()

  let user: User | undefined = undefined
  const users: User[] = await prisma.user.findMany()

  if (!users.length) {
    user = await createNewUser()
  } else {
    do {
      printAppTitle()
      print('=== Choose an user ===')
      print('0 - Create new user')
      print(users.map((user, index) => `${index + 1} - ${user.username}`).join('\n'))

      const userSelection = await io.question('> ')
      if (userSelection == '0') return await createNewUser()
      user = users[parseInt(userSelection) - 1]
    } while (!user)
  }

  return user
}
