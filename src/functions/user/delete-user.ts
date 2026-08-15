// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import io from '../../utils/io-util.js'

export async function deleteUser(): Promise<void> {
  io.printAppTitle()

  const users = await prisma.user.findMany()

  const userSelection = await io.select({
    message: '=== Choose an user to delete ===',
    choices: [
      ...users.map(user => ({ name: user.username, value: user.id }))
    ]
  })

  const user = await prisma.user.delete({ where: { id: userSelection } })

  io.print(`Deleted user: ${user.username} successfully!`)
  await io.pressEnterToContinue()
}
