// LIBS
import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"
import { config } from 'dotenv'

// BLOCKCHAIN CLIENTS
import { baseClient } from './clients/base.js'

// UTILS
import { logger } from './utils/logger-util.js'
import { printAppTitle } from './utils/print-app-title-util.js'
import { treatError } from './utils/treat-error-util.js'
import { print } from './utils/ui.js'

// COMMANDS
import { checkBalance } from './commands/check-balance.js'

try {
  config()
  printAppTitle()
  
  const io = createInterface({
    input: stdin,
    output: stdout,
  })
  
  while (true) {
    print('Choose an option:')
    print(`
      1. Get wallet balance
      2. Exit
    `)
  
    const option = await io.question('> ')
  
    switch (option) {
      case '1':
        print('Insert wallet address:')

        const walletAddress = await io.question('> ')

        await checkBalance({ client: baseClient, address: walletAddress })
        break
      case '2':
        print('Exiting...')
        process.exit(0)
      default:
        print('Invalid option.')
    }
  }
} catch (error) {
  const errorMessage = treatError(error)
  logger.error({ error }, `Error: ${errorMessage}`)
  process.exit(1)
}
