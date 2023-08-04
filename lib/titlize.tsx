'use client'
export function titlize(str: string) {
  // Make sure first letter is capitalized
  str = str.charAt(0).toUpperCase() + str.slice(1)

  // Add a period if it's missing
  if (!str.endsWith('.')) {
    str += '.'
  }

  return str
}
