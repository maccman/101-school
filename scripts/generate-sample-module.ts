import { Selectable } from 'kysely'

import { assert } from '@/lib/assert'
import { prompt } from '@/lib/readline'
import { slugify } from '@/lib/slugify'
import { getCourseBySlug } from '@/server/db/courses/getters'
import { setModule } from '@/server/db/modules/setters'
import { Course, CourseParsedModule } from '@/server/db/schema'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'

async function main() {
  const title = await prompt('Course title: ')

  const course = await getCourseBySlug(slugify(title))

  assert(course)

  await Promise.all(
    course.parsedContent.modules.map((mod) => generateAndSaveModule(mod, course)),
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
    courseBody: course.content,
    moduleNumber: parsedModule.week,
  })

  await setModule({
    courseId: course.id,
    title: parsedModule.title,
    content: moduleBody,
    number: parsedModule.week,
  })
}
