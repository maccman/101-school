import { db } from '../db'

export async function getUnit(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .where('id', '=', unitId)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitByNumber(moduleId: string, number: number) {
  const record = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .where('number', '=', number)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitsByModule(moduleId: string) {
  const records = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .selectAll()
    .execute()

  return records
}

export async function getUnitsByCourse(courseId: string) {
  const records = await db
    .selectFrom('course_module_units')
    .innerJoin('course_modules', 'course_module_units.moduleId', 'course_modules.id')
    .where('course_modules.courseId', '=', courseId)
    .selectAll()
    .execute()

  return records
}

export async function searchUnits({
  courseId,
  query,
}: {
  courseId: string
  query: string
}) {
  const records = await db
    .selectFrom('course_module_units')
    .innerJoin('course_modules', 'course_module_units.moduleId', 'course_modules.id')
    .where('content', 'like', `%${query}%`)
    .where('course_modules.courseId', '=', courseId)
    .selectAll()
    .execute()

  return records
}
