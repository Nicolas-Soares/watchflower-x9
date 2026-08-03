// LIBS
import {
  select as promptSelect,
  input as promptInput
} from '@inquirer/prompts'

export async function select(
  { message, choices }:
  { message: string, choices: { value: string, name: string }[] }
) {
  return await promptSelect({
    message,
    choices
  })
}

export async function input({ message, validation = true }: { message: string, validation?: boolean }) {
  return await promptInput({
    message,
    ...(validation && { validate: (value) => value.trim() !== '' || 'Input cannot be empty' })
  })
}

export default {
  select,
  input
}
