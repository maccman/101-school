import { db } from '../db'

export async function getModulesByCourseId(courseId: string) {
  const records = await db
    .selectFrom('course_modules')
    .where('courseId', '=', courseId)
    .selectAll()
    .execute()

  return records
}

export async function getModuleByWeek(courseId: string, weekNumber: number) {
  const record = await db
    .selectFrom('course_modules')
    .where('courseId', '=', courseId)
    .where('week', '=', weekNumber)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}
