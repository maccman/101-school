import { Selectable } from 'kysely'

import { assert } from '@/lib/assert'
import { getCourseByTitle } from '@/server/db/courses/getters'
import { getModuleByWeek } from '@/server/db/modules/getters'
import {
  Course,
  CourseModule,
  CourseParsedModule,
  CourseParsedUnit,
} from '@/server/db/schema'
import { setUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { pickImageForWikpediaUrls } from '@/server/lib/wikipedia'

async function main() {
  const course = await getCourseByTitle('Astronomy 101')
  assert(course)

  await Promise.all(
    course.parsedBody.modules.map((mod) => generateAndSaveUnits(mod, course)),
  )
}

main()

async function generateAndSaveUnits(
  courseModule: CourseParsedModule,
  course: Selectable<Course>,
) {
  console.log(`Generating unit for module ${courseModule.week}...`)

  const section = await getModuleByWeek(course.id, courseModule.week)
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

  const unitBody = await generateUnit({
    courseDescription: course.description,
    courseBody: course.body,
    moduleBody: module.body,
    moduleNumber: courseModule.week,
    unitNumber: parsedUnit.number,
  })

  const wikipediaUrls = await generateWikipediaUrls(unitBody)

  const image = await pickImageForWikpediaUrls(wikipediaUrls)

  await setUnit({
    moduleId: module.id,
    number: parsedUnit.number,
    title: parsedUnit.title,
    body: unitBody,
    wikipediaUrls,
    image,
  })
}
