import { slugify } from '@/plugins/slugify'

export function getNumberFromSlug(slug: string): number | null {
  const firstPart = slug.split('-').shift()

  if (!firstPart) {
    return null
  }

  const number = parseInt(firstPart, 10)

  if (isNaN(number)) {
    return null
  }

  return number
}

export function getSlug({ number, title }: { number: number; title: string }) {
  return `${number}-${slugify(title)}`
}
