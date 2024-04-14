import { Selectable } from 'kysely'
import { retry } from 'ts-retry'

import { assert, assertString } from '@/lib/assert'
import { prompt } from '@/lib/readline'
import { slugify } from '@/lib/slugify'
import { getCourse } from '@/server/db/courses/getters'
import { createCourse, updateCourse } from '@/server/db/courses/setters'
import { getModuleByNumber } from '@/server/db/modules/getters'
import { setModule } from '@/server/db/modules/setters'
import {
  Course,
  CourseModule,
  CourseParsedModule,
  CourseParsedUnit,
} from '@/server/db/schema'
import { setUnit, updateUnit } from '@/server/db/units/setters'
import { getUsers } from '@/server/db/users/getters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'
import { getImageForPageAndTest } from '@/server/lib/wikipedia'

async function main() {
  const title = await prompt('Course title: ')

  console.log('Generating course...')

  const content = await generateCourse(title)

  const ownerId = (await getUsers())[0].id

  const courseId = await createCourse({
    ownerId,
    title,
    slug: slugify(title),
    description: `A course about ${title}`,
    content,
  })

  console.log('Parsing course...')
  const parsedContent = await parseCourse(content)

  let parsedCip: any = {
    cipCode: null,
    cipTitle: null,
  }

  try {
    parsedCip = await parseCourseCip(
      parsedContent.headline || parsedContent.outline || title,
    )
  } catch (error) {
    console.error(error)
  }

  await updateCourse(courseId, {
    parsedContent,
    cipCode: parsedCip.cipCode || null,
    cipTitle: parsedCip.cipTitle || null,
  })

  const course = await getCourse(courseId)
  assert(course, 'Course not found')

  console.log('Generating modules...')
  await Promise.all(
    course.parsedContent.modules.map((mod) => generateAndSaveModule(mod, course)),
  )

  console.log('Generating units...')
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

      const image = await getImageForPageAndTest(wikipediaUrls)

      await updateUnit(unitId, {
        wikipediaUrls,
        image,
      })
    },
    { maxTry: 3, delay: 1000, onError: console.error },
  )
}

async function generateAndSaveModule(
  parsedModule: CourseParsedModule,
  course: Selectable<Course>,
) {
  console.log(`Generating module ${parsedModule.week}...`)

  await retry(
    async () => {
      const moduleBody = await generateModule({
        courseDescription: course.description,
        courseBody: course.content,
        moduleNumber: parsedModule.week,
      })

      await setModule({
        courseId: course.id,
        title: parsedModule.title,
        content: moduleBody,
        number: parsedModule.week,
      })
    },
    { maxTry: 3, delay: 1000, onError: console.error },
  )
}
