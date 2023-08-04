export const baseUrl = process.env.APP_HOST
  ? `https://${process.env.APP_HOST}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://101.school'

// Return a formatted first name, with a capital letter
export function formatName(name: string) {
  const [givenName] = name.split(' ')

  return givenName.charAt(0).toUpperCase() + givenName.slice(1)
}
