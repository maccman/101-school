export function stripTripleBackticks(text: string) {
  // Strip ```js\n and ```\n from the first and last line
  return text.replace(/^```.*?\n/, '').replace(/\n```$/, '')
}
