import { prompt } from '@/lib/readline'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'

async function main() {
  console.log('Generating course CIP...')
  const title = await prompt('Course description: ')

  const result = await parseCourseCip(title)

  console.log(result)
}

main()
