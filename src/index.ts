import { logger } from './logger.js'
import { baseClient } from './clients/base.js'
import { formatEther  } from 'viem'
import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"
import fs from 'fs/promises'

const banner = await fs.readFile("./src/banner.txt", "utf8")

// logger.info('Starting Watchflower...')
console.log(banner)

const io = createInterface({
  input: stdin,
  output: stdout,
})

while (true) {
  console.log('Choose an option:')
  console.log(`
    1. Get balance
    2. Exit
  `)

  const option = await io.question('> ')

  switch (option) {
    case '1':
      const balance = await baseClient.getBalance({ address: '0xb8e0410b35a2f23e81369c9defe67d46ae8aa1a1' })
      console.log(`Balance: ${formatEther(balance)} ETH`)
      break
    case '2':
      console.log('Exiting...')
      process.exit(0)
    default:
      console.log('Invalid option.')
  }
}

