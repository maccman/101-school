import slugifyBase from '@sindresorhus/slugify'

export function slugify(str: string) {
  return slugifyBase(str.toLowerCase())
}
