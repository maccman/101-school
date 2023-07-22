import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'

async function main() {
  const body = await generateCourse('Astronomy 101')

  console.log(body)
}

main()
