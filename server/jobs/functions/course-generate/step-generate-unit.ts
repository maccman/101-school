import { Logger } from 'inngest/middleware/logger'

import { assert } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { getModuleByNumber } from '@/server/db/modules/getters'
import { CourseParsedModule, CourseParsedUnit } from '@/server/db/schema'
import { setUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { getBestImageForWikipediaUrls } from '@/server/lib/wikipedia'

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

  const unitContent = await generateUnit(
    {
      courseDescription: course.description,
      courseBody: course.content,
      moduleBody: courseModule.content,
      moduleNumber: parsedModule.week,
      unitNumber: extractUnitNumber(parsedUnit.number),
    },
    {
      targeting: course.targeting ?? undefined,
      weekCount: course.weekCount ?? undefined,
      language: course.language ?? undefined,
    },
  )

  const wikipediaUrls = await safeGenerateWikipediaUrls(unitContent)

  const image = await getBestImageForWikipediaUrls(wikipediaUrls)

  logger.info('Saving unit', {
    courseId: course.id,
    moduleNumber: parsedModule.week,
    unitNumber: parsedUnit.number,
  })

  await setUnit({
    moduleId: courseModule.id,
    number: extractUnitNumber(parsedUnit.number),
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

function extractUnitNumber(parsedUnitNumber: number): number {
  // Number can be a float, like 1.2 or 1.3
  // We want to return the float part, like 2 or 3

  const unitNumberString = parsedUnitNumber.toString()

  const dotIndex = unitNumberString.indexOf('.')

  if (dotIndex === -1) {
    return parsedUnitNumber
  }

  return parseFloat(unitNumberString.slice(dotIndex + 1))
}
