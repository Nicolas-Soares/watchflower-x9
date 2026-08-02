import { prisma } from '../clients/prisma.js'
import type { User } from '../../shared/types.js'

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany()
}

export async function createUser(username: string): Promise<User> {
  return await prisma.user.create({
    data: {
      username
    }
  })
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id }
  })
}
