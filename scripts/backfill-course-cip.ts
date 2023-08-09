import { Updateable } from 'kysely'

import { db } from '@/server/db/db'
import { Course } from '@/server/db/schema'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'

async function main() {
  const courses = await getCourses()

  for (const course of courses) {
    if (course.cipCode) {
      continue
    }

    const headline =
      course.parsedContent?.headline ||
      course.parsedContent?.outline ||
      course.description

    if (!headline) {
      console.warn(`No headline for course ${course.id}`)
      continue
    }

    const result = await parseCourseCip(headline)

    if (!result.cipCode) {
      console.warn(`No CIP code for course ${course.id}`)
      continue
    }

    console.log(
      `Updating course ${course.id} with CIP code ${result.cipCode} / ${result.cipTitle}`,
    )

    await updateCourse(course.id, {
      cipCode: result.cipCode || null,
      cipTitle: result.cipTitle || null,
    })
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
