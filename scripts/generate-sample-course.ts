import { prompt } from '@/lib/readline'
import { slugify } from '@/lib/slugify'
import { createCourse, updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'

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

  const parsedCip = await parseCourseCip(
    parsedContent.headline || parsedContent.outline || title,
  )

  await updateCourse(courseId, {
    parsedContent,
    cipCode: parsedCip.cipCode || null,
    cipTitle: parsedCip.cipTitle || null,
  })

  console.log('Done!')
}

main()
