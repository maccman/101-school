import { db } from '../db'

export async function getModulesByCourse(courseId: string) {
  const records = await db
    .selectFrom('course_modules')
    .where('courseId', '=', courseId)
    .selectAll()
    .execute()

  return records
}

export async function getModuleByNumber(courseId: string, number: number) {
  const record = await db
    .selectFrom('course_modules')
    .where('courseId', '=', courseId)
    .where('number', '=', number)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getModule(moduleId: string) {
  const record = await db
    .selectFrom('course_modules')
    .where('id', '=', moduleId)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}
