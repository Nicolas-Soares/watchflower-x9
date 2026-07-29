// LIBS
import fs from 'fs/promises'

// UTILS
import { print, clear } from '../utils/ui.js'

const banner = await fs.readFile("./src/banner.txt", "utf8")

export function printAppTitle() {
  clear()
  print(banner)
}
