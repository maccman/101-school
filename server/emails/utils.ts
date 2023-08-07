// Return a formatted first name, with a capital letter
export function formatName(name: string) {
  const [givenName] = name.split(' ')

  return givenName.charAt(0).toUpperCase() + givenName.slice(1)
}
