import { Logger } from 'inngest/middleware/logger'

import { assert, assertString } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'

export async function stepParseCourse({
  courseId,
  logger,
}: {
  courseId: string
  logger: Logger
}) {
  const course = await getCourse(courseId)
  assert(course, 'Course not found')

  if (course.parsedContent) {
    logger.info('Course already parsed', { courseId })
    return
  }

  // Generate course if not already generated
  logger.info('Generating course if required', { courseId })
  const content = course.content || (await generateCourse(course.description))
  assertString(content, 'Course content not found')

  // Extract structured data from course
  logger.info('Parsing course', { courseId })
  const parsedContent = await parseCourse(content)

  // Extract CIP code and title from course
  logger.info('Parsing CIP code and title', { courseId })
  const { cipCode, cipTitle } = await safeParseCourseCip(content)

  // Save course
  logger.info('Saving course', { courseId })
  await updateCourse(course.id, {
    content,
    parsedContent,
    cipCode,
    cipTitle,
  })
}
function safeParseCourseCip(content: string) {
  try {
    return parseCourseCip(content)
  } catch (error) {
    console.error(error)
    return {
      cipCode: null,
      cipTitle: null,
    }
  }
}
