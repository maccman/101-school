import { db } from '../db'

export async function getUnit(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .where('id', '=', unitId)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitAndModule(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .innerJoin('course_modules', 'course_module_units.moduleId', 'course_modules.id')
    .where('course_module_units.id', '=', unitId)
    .selectAll(['course_module_units'])
    .select([
      'course_modules.courseId as courseId',
      'course_modules.number as moduleNumber',
      'course_modules.title as moduleTitle',
    ])
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitAndCourse(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .innerJoin('course_modules', 'course_module_units.moduleId', 'course_modules.id')
    .innerJoin('courses', 'course_modules.courseId', 'courses.id')
    .where('course_module_units.id', '=', unitId)
    .selectAll(['course_module_units'])
    .select([
      'courses.id as courseId',
      'courses.slug as courseSlug',
      'course_modules.number as moduleNumber',
      'course_modules.title as moduleTitle',
    ])
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
    .selectAll(['course_module_units'])
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
    .where((eb) =>
      eb.or([
        eb('course_module_units.content', 'like', `%${query}%`),
        eb('course_module_units.title', 'like', `%${query}%`),
      ]),
    )
    .where('course_modules.courseId', '=', courseId)
    .selectAll(['course_module_units'])
    .execute()

  return records
}

export async function getNextUnit(unitId: string) {
  const currentUnit = await getUnitAndModule(unitId)

  if (!currentUnit) {
    return null
  }

  // Find either the unit with the next number or the next module
  const nextUnit = await db
    .selectFrom('course_module_units_next')
    .where('course_module_units_next.id', '=', unitId)
    .where('course_module_units_next.courseId', '=', currentUnit.courseId)
    .innerJoin(
      'course_module_units',
      'course_module_units_next.nextId',
      'course_module_units.id',
    )
    .selectAll(['course_module_units'])
    .executeTakeFirst()

  return nextUnit ?? null
}
