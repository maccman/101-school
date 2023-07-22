import { createCourse, updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'

async function main() {
  console.log('Generating course...')
  const body = await generateCourse('Astronomy 101')

  const courseId = await createCourse({
    title: 'Astronomy 101',
    description: 'Learn about the stars and planets',
    body,
  })

  console.log('Parsing course...')
  const parsedBody = await parseCourse(body)

  await updateCourse(courseId, { parsedBody })

  console.log('Done!')
}

main()
