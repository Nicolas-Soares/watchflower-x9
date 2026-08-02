// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import { logger } from '../utils/logger-util.js'
import { printAppTitle } from '../utils/print-app-title-util.js'
import { print } from '../utils/ui-util.js'
import { io } from '../utils/io-util.js'

// TYPES
import type { User } from '../shared/types/user.js'

export async function createNewUser(): Promise<User> {
  let username: string = ''

  while (!username) {
    printAppTitle()
    print('=== Create a new user ===')
    username = await io.question('Username: ')
  }

  const user: User = await prisma.user.create({ data: { username } })

  logger.info({ user }, 'User created:')
  print(`User created: ${user.username}`)

  return user
}
