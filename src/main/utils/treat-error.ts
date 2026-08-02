import { logger } from './logger.js'

export function treatError(error: unknown, context: string): never {
  logger.error(error, context)
  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`)
  }
  throw new Error(`${context}: An unknown error occurred`)
}
