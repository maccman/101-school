import { renderAsync } from '@react-email/render'

import { assert } from '@/lib/assert'
import { db } from '@/server/db/db'
import { CourseUnitEmail } from '@/server/emails/course-unit-email'

export const config = {
  runtime: 'edge',
}

export default async function handle() {
  const course = await db.selectFrom('courses').selectAll().executeTakeFirst()
  assert(course, 'course not found')

  const courseModule = await db
    .selectFrom('course_modules')
    .selectAll()
    .where('courseId', '=', course.id)
    .executeTakeFirst()
  assert(courseModule, 'module not found')

  const courseUnit = await db
    .selectFrom('course_module_units')
    .selectAll()
    .where('moduleId', '=', courseModule.id)
    .executeTakeFirst()
  assert(courseUnit, 'unit not found')

  const email = 'john@example.com'

  const element = CourseUnitEmail({
    course,
    courseModule,
    courseUnit,
    email,
  })

  const html = await renderAsync(element)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
