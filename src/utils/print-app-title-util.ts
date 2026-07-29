import fs from 'fs/promises'
const banner = await fs.readFile("./src/banner.txt", "utf8")

export function printAppTitle() {
  console.clear()
  console.log(banner)
}
