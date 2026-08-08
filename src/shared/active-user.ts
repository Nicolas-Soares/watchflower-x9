import type { User } from './types/user.js'

export let ACTIVE_USER: User
export function setActiveUser(user: User): void {
  ACTIVE_USER = user
}
