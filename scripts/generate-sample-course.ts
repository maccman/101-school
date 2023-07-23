import slugify from '@sindresorhus/slugify'

import { prompt } from '@/lib/readline'
import { createCourse, updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'

async function main() {
  console.log('Generating course...')
  const title = await prompt('Course title: ')

  const content = await generateCourse(title)

  const courseId = await createCourse({
    title,
    slug: slugify(title),
    description: `A course about ${title}`,
    content,
  })

  console.log('Parsing course...')
  const parsedContent = await parseCourse(content)

  await updateCourse(courseId, { parsedContent })

  console.log('Done!')
}

main()
