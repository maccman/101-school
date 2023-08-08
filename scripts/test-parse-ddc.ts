import { Updateable } from 'kysely'
import { retry } from 'ts-retry'

import { db } from '@/server/db/db'
import { Course } from '@/server/db/schema'
import { parseCourseDeweyDecimalClass } from '@/server/helpers/ai/prompts/parse-course-ddc'

async function main() {
  const courses = await getCourses()

  for (const course of courses) {
    if (course.ddcCode) {
      console.log(`Course ${course.id} already has a DDC code`)
      continue
    }

    const headline =
      course.parsedContent.headline || course.parsedContent.outline || course.description

    if (!headline) {
      console.warn(`No headline for course ${course.id}`)
      continue
    }

    await retry(
      async () => {
        const result = await parseCourseDeweyDecimalClass(headline)

        if (!result.ddcCode) {
          console.warn(`No DDC code for course ${course.id}`)
          return
        }

        console.log(
          `Updating course ${course.id}/${course.title} with ddc ${result.ddcCode} / ${result.ddcTitle}`,
        )

        await updateCourse(course.id, {
          ddcCode: result.ddcCode || null,
          ddcTitle: result.ddcTitle || null,
        })
      },
      { maxTry: 5, delay: 5000 },
    )
  }
}

async function getCourses() {
  const records = await db
    .selectFrom('courses')
    .selectAll()
    .orderBy('title', 'asc')
    .execute()

  return records
}

async function updateCourse(id: string, values: Updateable<Course>) {
  await db
    .updateTable('courses')
    .set(values)
    .where('id', '=', id)
    .returning('id')
    .executeTakeFirstOrThrow()
}

main()
