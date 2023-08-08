import { Logger } from 'inngest/middleware/logger'

import { assert, assertString } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { updateCourse } from '@/server/db/courses/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'
import { parseCourseDeweyDecimalClass } from '@/server/helpers/ai/prompts/parse-course-ddc'

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

  // Extract DDC code and title from course
  logger.info('Parsing DDC code and title', { courseId })
  const { ddcCode, ddcTitle } = await safeParseCourseDdc(content)

  // Save course
  logger.info('Saving course', { courseId })
  await updateCourse(course.id, {
    content,
    parsedContent,
    ddcCode,
    ddcTitle,
  })
}

function safeParseCourseDdc(content: string) {
  try {
    return parseCourseDeweyDecimalClass(content)
  } catch (error) {
    console.error(error)
    return {
      ddcCode: null,
      ddcTitle: null,
    }
  }
}
