import { db } from '../db'

export async function getSectionsByCourseId(courseId: string) {
  const records = await db
    .selectFrom('sections')
    .where('courseId', '=', courseId)
    .selectAll()
    .execute()

  return records
}

export async function getSectionByWeek(courseId: string, weekNumber: number) {
  const record = await db
    .selectFrom('sections')
    .where('courseId', '=', courseId)
    .where('week', '=', weekNumber)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}
