/**
 * Trims common leading indentation from multiline strings while preserving relative indentation.
 * Also removes empty leading and trailing lines.
 */
export const dedent = (text: string): string => {
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

export const print = (message: string = ''): void => {
  console.log(dedent(message))
}

export const clear = (): void => {
  console.clear()
}
