export function treatError(error: unknown): unknown {
  if (error instanceof Error) {
    return error.message
  } else {
    return error
  }
}
