import { Selectable } from 'kysely'

import { assert } from '@/lib/assert'
import { getCourseByTitle } from '@/server/db/courses/getters'
import { setModule } from '@/server/db/modules/setters'
import { Course, CourseParsedModule } from '@/server/db/schema'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'

async function main() {
  const course = await getCourseByTitle('Astronomy 101')

  assert(course)

  await Promise.all(
    course.parsedBody.modules.map((mod) => generateAndSaveModule(mod, course)),
  )
}

main()

async function generateAndSaveModule(
  parsedModule: CourseParsedModule,
  course: Selectable<Course>,
) {
  console.log(`Generating module ${parsedModule.week}...`)

  const moduleBody = await generateModule({
    courseDescription: course.description,
    courseBody: course.body,
    moduleNumber: parsedModule.week,
  })

  await setModule({
    courseId: course.id,
    title: parsedModule.title,
    body: moduleBody,
    week: parsedModule.week,
  })
}
