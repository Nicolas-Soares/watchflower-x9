// CLIENTS
import { prisma } from '../clients/prisma.js'

// UTILS
import { logger } from '../utils/logger-util.js'
import io from '../utils/io-util.js'

// TYPES
import type { User } from '../shared/types/user.js'

export async function createNewUser(): Promise<User> {
  let username: string = ''

  io.printAppTitle()
  io.print('=== Create a new user ===')
  username = await io.input({ message: 'Username: ' })

  const user = await prisma.user.create({ data: { username } })

  logger.info({ user }, 'User created:')
  io.print(`User created: ${user.username}`)

  return user
}
