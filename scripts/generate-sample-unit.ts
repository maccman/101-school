import { assert } from '@/lib/assert'
import { getCourseByTitle } from '@/server/db/courses/getters'
import { getSectionByWeek } from '@/server/db/sections/getters'
import { createUnit } from '@/server/db/units/setters'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'

async function main() {
  const course = await getCourseByTitle('Astronomy 101')
  assert(course)

  for (const courseModule of course.parsedBody.modules) {
    console.log(`Generating unit for module ${courseModule.week}...`)

    const section = await getSectionByWeek(course.id, courseModule.week)
    assert(section)

    for (const parsedUnit of courseModule.units) {
      console.log(`Generating unit ${parsedUnit.number}...`)

      const unitBody = await generateUnit({
        courseDescription: course.description,
        courseBody: course.body,
        moduleBody: section.body,
        moduleNumber: courseModule.week,
        unitNumber: parsedUnit.number,
      })

      createUnit({
        title: parsedUnit.title,
        body: unitBody,
        sectionId: section.id,
      })
    }
  }
}

main()
