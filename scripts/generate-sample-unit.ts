import { Selectable } from 'kysely'

import { assert } from '@/lib/assert'
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
import { setUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { getImageForPageAndTest } from '@/server/lib/wikipedia'

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

  const unitContent = await generateUnit({
    courseDescription: course.description,
    courseBody: course.content,
    moduleBody: module.content,
    moduleNumber: courseModule.week,
    unitNumber: parsedUnit.number,
  })

  const wikipediaUrls = await generateWikipediaUrls(unitContent)

  const image = await getImageForPageAndTest(wikipediaUrls)

  await setUnit({
    moduleId: module.id,
    number: parsedUnit.number,
    title: parsedUnit.title,
    content: unitContent,
    wikipediaUrls,
    image,
  })
}
