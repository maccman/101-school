import { CourseModule } from './types'
import { db } from '../db'

export async function getCourses() {
  const records = await db
    .selectFrom('courses')
    .selectAll()
    .orderBy('title', 'asc')
    .execute()

  return records
}

export async function getCourseByTitle(courseTitle: string) {
  const record = await db
    .selectFrom('courses')
    .selectAll()
    .where('title', '=', courseTitle)
    .executeTakeFirst()

  return record ?? null
}

export async function getCourseBySlug(courseSlug: string) {
  const record = await db

    .selectFrom('courses')
    .selectAll()
    .where('slug', '=', courseSlug)
    .executeTakeFirst()

  return record ?? null
}

export async function getCourseBySlugOrId(courseSlugOrId: string) {
  return (await getCourseBySlug(courseSlugOrId)) ?? (await getCourse(courseSlugOrId))
}

export async function getCourse(courseId: string) {
  const record = await db
    .selectFrom('courses')
    .selectAll()
    .where('id', '=', courseId)
    .executeTakeFirst()

  return record ?? null
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
      'course_modules.number as moduleNumber',
      'course_modules.title as moduleTitle',
      'course_module_units.id as unitId',
      'course_module_units.number as unitNumber',
      'course_module_units.title as unitTitle',
    ])
    .orderBy('course_modules.number', 'asc')
    .orderBy('course_module_units.number', 'asc')
    .execute()

  const grouped = new Map<string, CourseModule>()

  for (const record of records) {
    if (!grouped.has(record.moduleId)) {
      grouped.set(record.moduleId, {
        id: record.moduleId,
        number: record.moduleNumber,
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
    .innerJoin('course_modules', 'courses.id', 'course_modules.courseId')
    .innerJoin('course_module_units', 'course_modules.id', 'course_module_units.moduleId')
    .selectAll(['course_module_units'])
    .select([
      'course_modules.title as moduleTitle',
      'course_modules.number as moduleNumber',
    ])
    .orderBy('course_modules.number', 'asc')
    .orderBy('course_module_units.number', 'asc')
    .executeTakeFirst()

  return record ?? null
}

export async function getCoursesWithImages() {
  const records = await db
    .selectFrom('courses')
    .leftJoin('course_images', 'courses.id', 'course_images.courseId')
    .selectAll(['courses'])
    .select(['course_images.image as image'])
    .execute()

  return records
}

export async function searchCourses(query: string) {
  const records = await db
    .selectFrom('courses')
    .where('title', 'like', `%${query}%`)
    .selectAll()
    .limit(10)
    .execute()

  return records
}

export async function getCoursesByUser(userId: string) {
  const records = await db
    .selectFrom('courses')
    .innerJoin('course_enrollments', 'courses.id', 'course_enrollments.courseId')
    .leftJoin('course_images', 'courses.id', 'course_images.courseId')
    .where('course_enrollments.userId', '=', userId)
    .selectAll(['courses'])
    .select(['course_images.image as image'])
    .execute()

  return records
}

export async function generateUniqueCourseSlug(slug: string) {
  let count = 0

  while (true) {
    const newSlug = count === 0 ? slug : `${slug}-${count}`
    const record = await db
      .selectFrom('courses')
      .select(['id'])
      .where('slug', '=', newSlug)
      .executeTakeFirst()

    if (!record) {
      return newSlug
    }

    count++

    if (count > 100) {
      throw new Error('Could not generate unique slug')
    }
  }
}
