// LIBS
import {
  select as promptSelect,
  input as promptInput
} from '@inquirer/prompts'

function dedent(text: string): string {
  if (!text || !text.includes('\n')) return text

  const lines = text.split('\n')

  let minIndent: number | null = null
  for (const line of lines) {
    if (line.trim().length === 0) continue
    const leadingSpaces = line.match(/^[\t ]*/)?.[0].length ?? 0
    if (minIndent === null || leadingSpaces < minIndent) {
      minIndent = leadingSpaces
    }
  }

  const cleanedLines = minIndent && minIndent > 0
    ? lines.map(line => (line.trim().length === 0 ? '' : line.slice(minIndent)))
    : lines

  if (lines.length > 2 && lines[0]?.trim() === '' && lines[lines.length - 1]?.trim() === '') {
    return cleanedLines.slice(1, -1).join('\n')
  }

  return cleanedLines.join('\n')
}

async function select(
  { message, choices }:
  { message: string, choices: { value: string, name: string }[] }
) {
  return await promptSelect({
    message,
    choices
  })
}

async function input(
  { message, validation = true }:
  { message: string, validation?: boolean }
) {
  return await promptInput({
    message,
    ...(validation && { validate: (value) => value.trim() !== '' || 'Input cannot be empty' })
  })
}

async function pressEnterToContinue(): Promise<void> {
  await input({
    message: '> Press ENTER to return to menu...',
    validation: false
  })
}

function print(message: string = ''): void {
  console.log(dedent(message))
}

function clear(): void {
  console.clear()
}

export default {
  select,
  input,
  print,
  clear,
  pressEnterToContinue
}
