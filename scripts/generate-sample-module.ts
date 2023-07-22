import { assert } from '@/lib/assert'
import { getCourseByTitle } from '@/server/db/courses/getters'
import { setModule } from '@/server/db/sections/setters'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'

async function main() {
  const course = await getCourseByTitle('Astronomy 101')

  assert(course)

  for (const parsedModule of course.parsedBody.modules) {
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
}

main()
