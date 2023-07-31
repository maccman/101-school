import { Selectable } from 'kysely'
import { retry } from 'ts-retry'

import { assert, assertString } from '@/lib/assert'
import { prompt } from '@/lib/readline'
import { slugify } from '@/lib/slugify'
import { getCourseBySlug } from '@/server/db/courses/getters'
import { getModuleByNumber } from '@/server/db/modules/getters'
import {
  Course,
  CourseModule,
  CourseParsedModule,
  CourseParsedUnit,
} from '@/server/db/schema'
import { setUnit, updateUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { pickImageForWikpediaUrls } from '@/server/lib/wikipedia'

async function main() {
  const title = await prompt('Course title: ')

  const course = await getCourseBySlug(slugify(title))
  assert(course)

  await Promise.all(
    course.parsedContent.modules.map((mod) => generateAndSaveUnits(mod, course)),
  )
}

main()

async function generateAndSaveUnits(
  courseModule: CourseParsedModule,
  course: Selectable<Course>,
) {
  console.log(`Generating unit for module ${courseModule.week}...`)

  const section = await getModuleByNumber(course.id, courseModule.week)
  assert(section)

  for (const parsedUnit of courseModule.units) {
    await generateAndSaveUnit(parsedUnit, course, section, courseModule)
  }
}

async function generateAndSaveUnit(
  parsedUnit: CourseParsedUnit,
  course: Selectable<Course>,
  module: Selectable<CourseModule>,
  courseModule: CourseParsedModule,
) {
  console.log(`Generating unit ${parsedUnit.number}...`)

  let unitId: string | null = null
  let unitContent: string | null = null

  await retry(
    async () => {
      unitContent = await generateUnit({
        courseDescription: course.description,
        courseBody: course.content,
        moduleBody: module.content,
        moduleNumber: courseModule.week,
        unitNumber: parsedUnit.number,
      })

      unitId = await setUnit({
        moduleId: module.id,
        number: parsedUnit.number,
        title: parsedUnit.title,
        content: unitContent,
      })
    },
    { maxTry: 3, delay: 1000, onError: console.error },
  )

  if (!unitId || !unitContent) {
    console.error('Failed to generate unit')
    return
  }

  await retry(
    async () => {
      assertString(unitId)
      assertString(unitContent)

      const wikipediaUrls = await generateWikipediaUrls(unitContent)

      const image = await pickImageForWikpediaUrls(wikipediaUrls)

      await updateUnit(unitId, {
        wikipediaUrls,
        image,
      })
    },
    { maxTry: 3, delay: 1000, onError: console.error },
  )
}
