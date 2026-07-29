// LIBS
import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"

export const io = createInterface({
  input: stdin,
  output: stdout,
})
