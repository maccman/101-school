import { db } from '../db'

export async function getCourseByTitle(courseTitle: string) {
  const record = await db
    .selectFrom('courses')
    .selectAll()
    .where('title', '=', courseTitle)
    .executeTakeFirst()

  return record ?? null
}
