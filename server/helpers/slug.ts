export function getNumberFromSlug(slug: string): number | null {
  const firstPart = slug.split('-').pop()

  if (!firstPart) {
    return null
  }

  const number = parseInt(firstPart, 10)

  if (isNaN(number)) {
    return null
  }

  return number
}
