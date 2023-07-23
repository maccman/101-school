import { db } from '../db'

export async function getCourseByTitle(courseTitle: string) {
  const record = await db
    .selectFrom('courses')
    .selectAll()
    .where('title', '=', courseTitle)
    .executeTakeFirst()

  return record ?? null
}

export async function getCourse(courseId: string) {
  const record = await db
    .selectFrom('courses')
    .selectAll()
    .where('id', '=', courseId)
    .executeTakeFirst()

  return record ?? null
}

interface CourseModule {
  id: string
  week: number
  title: string
  units: {
    id: string
    number: number
    title: string
  }[]
}

export async function getCourseUnits(
  courseId: string,
): Promise<Map<string, CourseModule>> {
  const records = await db
    .selectFrom('courses')
    .where('courses.id', '=', courseId)
    .innerJoin('course_modules', 'courses.id', 'course_modules.courseId')
    .innerJoin('course_module_units', 'course_modules.id', 'course_module_units.moduleId')
    .select([
      'courses.id as courseId',
      'courses.title as courseTitle',
      'courses.description as courseDescription',
      'course_modules.id as moduleId',
      'course_modules.week as moduleWeek',
      'course_modules.title as moduleTitle',
      'course_module_units.id as unitId',
      'course_module_units.number as unitNumber',
      'course_module_units.title as unitTitle',
    ])
    .orderBy('course_modules.week', 'asc')
    .orderBy('course_module_units.number', 'asc')
    .execute()

  const grouped = new Map<string, CourseModule>()

  for (const record of records) {
    if (!grouped.has(record.moduleId)) {
      grouped.set(record.moduleId, {
        id: record.moduleId,
        week: record.moduleWeek,
        title: record.moduleTitle,
        units: [],
      })
    }

    grouped.get(record.moduleId)!.units.push({
      id: record.unitId,
      number: record.unitNumber,
      title: record.unitTitle,
    })
  }

  return grouped
}

export async function getFirstCourseUnit(courseId: string) {
  const record = await db
    .selectFrom('courses')
    .where('courses.id', '=', courseId)
    .leftJoin('course_modules', 'courses.id', 'course_modules.courseId')
    .leftJoin('course_module_units', 'course_modules.id', 'course_module_units.moduleId')
    .select([
      'courses.id as courseId',
      'courses.title as courseTitle',
      'courses.description as courseDescription',
      'course_modules.id as moduleId',
      'course_modules.week as moduleWeek',
      'course_modules.title as moduleTitle',
      'course_module_units.id as unitId',
      'course_module_units.number as unitNumber',
      'course_module_units.title as unitTitle',
      'course_module_units.image as unitImage',
      'course_module_units.body as unitBody',
    ])
    .orderBy('course_modules.week', 'asc')
    .orderBy('course_module_units.number', 'asc')
    .executeTakeFirst()

  return record ?? null
}
