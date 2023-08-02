import { Logger } from 'inngest/middleware/logger'

import { assert } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { getModuleByNumber } from '@/server/db/modules/getters'
import { CourseParsedModule, CourseParsedUnit } from '@/server/db/schema'
import { setUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { pickImageForWikpediaUrls } from '@/server/lib/wikipedia'

export async function stepGenerateUnit({
  parsedUnit,
  courseId,
  parsedModule,
  logger,
}: {
  parsedUnit: CourseParsedUnit
  parsedModule: CourseParsedModule
  courseId: string
  logger: Logger
}) {
  const course = await getCourse(courseId)
  assert(course, 'Course not found')

  const courseModule = await getModuleByNumber(course.id, parsedModule.week)
  assert(courseModule, 'Module not found')

  logger.info('Generating unit', {
    courseId: course.id,
    moduleNumber: parsedModule.week,
    unitNumber: parsedUnit.number,
  })

  const unitContent = await generateUnit({
    courseDescription: course.description,
    courseBody: course.content,
    moduleBody: courseModule.content,
    moduleNumber: parsedModule.week,
    unitNumber: parsedUnit.number,
  })

  const wikipediaUrls = await safeGenerateWikipediaUrls(unitContent)

  const image = await pickImageForWikpediaUrls(wikipediaUrls)

  logger.info('Saving unit', {
    courseId: course.id,
    moduleNumber: parsedModule.week,
    unitNumber: parsedUnit.number,
  })

  await setUnit({
    moduleId: courseModule.id,
    number: parsedUnit.number,
    title: parsedUnit.title,
    content: unitContent,
    wikipediaUrls,
    image,
  })
}

function safeGenerateWikipediaUrls(content: string) {
  try {
    return generateWikipediaUrls(content)
  } catch (error) {
    console.error(error)
    return []
  }
}
