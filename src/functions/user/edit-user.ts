// CLIENTS
import { prisma } from '../../clients/prisma.js'

// UTILS
import io from '../../utils/io-util.js'

export async function editUser(): Promise<void> {
  io.printAppTitle()

  const users = await prisma.user.findMany()

  const userSelection = await io.select({
    message: '=== Choose an user to edit ===',
    choices: [
      ...users.map(user => ({ name: user.username, value: user.id }))
    ]
  })

  const newUsername = await io.input({ message: 'New username:' })

  await prisma.user.update(
    {
      where: { id: userSelection },
      data: { username: newUsername }
    }
  )

  io.print(`Updated username to: ${newUsername} successfully!`)
  await io.pressEnterToContinue()
}
