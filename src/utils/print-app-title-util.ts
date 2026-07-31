// LIBS
import fs from 'fs/promises'

// UTILS
import { print, clear } from './ui-util.js'

const banner = await fs.readFile("./src/banner.txt", "utf8")

export class AppTitle {
  public subHeader: string

  constructor(subHeader: string = '') {
    this.subHeader = subHeader
  }

  public setSubHeader(subHeader: string): void {
    this.subHeader = subHeader
  }

  public print(options?: { subHeader?: string }): void {
    clear()
    print(`${banner}\n`)

    const textToPrint = options?.subHeader !== undefined ? options.subHeader : this.subHeader
    if (textToPrint) {
      print(textToPrint)
    }
  }
}

export const appTitle = new AppTitle()

export function printAppTitle(options?: { subHeader?: string }): void {
  appTitle.print(options)
}
