/**
 * Converts string to enum. Returns undefined if enum doesn't contain the value.
 *
 * Taken from: https://stackoverflow.com/a/41548441
 */
export function enumFromString<T>(
  enm: { [s: string]: T },
  value: string | undefined | null,
): T | undefined {
  if (!value) return

  const validValues = Object.values(enm) as unknown as string[]
  const isValid = validValues.includes(value)

  if (isValid) {
    return value as unknown as T
  } else {
    return undefined
  }
}
