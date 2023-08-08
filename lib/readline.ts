import { stdin as input, stdout as output } from 'node:process'
import * as readline from 'node:readline/promises'

export async function prompt(question: string) {
  const rl = readline.createInterface({ input, output })
  const answer = await rl.question(question)
  rl.close()

  return answer
}
