import { Logger } from 'inngest/middleware/logger'

import { assert } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { setModule } from '@/server/db/modules/setters'
import { CourseParsedModule } from '@/server/db/schema'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'

export async function stepGenerateModule({
  parsedModule,
  courseId,
  logger,
}: {
  parsedModule: CourseParsedModule
  courseId: string
  logger: Logger
}) {
  const course = await getCourse(courseId)
  assert(course, 'Course not found')

  logger.info('Generating module', {
    courseId: course.id,
    moduleNumber: parsedModule.week,
  })
  const moduleContent = await generateModule({
    courseDescription: course.description,
    courseBody: course.content,
    moduleNumber: parsedModule.week,
  })

  logger.info('Saving module', { courseId: course.id, moduleNumber: parsedModule.week })
  await setModule({
    courseId: course.id,
    title: parsedModule.title,
    content: moduleContent,
    number: parsedModule.week,
  })
}
