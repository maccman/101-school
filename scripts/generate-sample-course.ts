import { createCourse, updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'

async function main() {
  console.log('Generating course...')
  const content = await generateCourse('Astronomy 101')

  const courseId = await createCourse({
    title: 'Astronomy 101',
    slug: 'astronomy-101',
    description: 'Learn about the stars and planets',
    content,
  })

  console.log('Parsing course...')
  const parsedContent = await parseCourse(content)

  await updateCourse(courseId, { parsedContent })

  console.log('Done!')
}

main()
