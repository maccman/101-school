import { getNumberFromSlug } from './slug'
import { getCourseBySlug } from '../db/courses/getters'
import { getModuleByNumber } from '../db/modules/getters'
import { CourseModule } from '../db/modules/types'
import { getUnitByNumber } from '../db/units/getters'
import { CourseModuleUnit } from '../db/units/types'

export async function getCourseContext(params: {
  courseSlug: string
  moduleSlug?: string
  unitSlug?: string
}) {
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    return {
      course: null,
      courseModule: null,
      courseUnit: null,
    }
  }

  let courseModule: CourseModule | null = null

  if (params.moduleSlug) {
    const moduleNumber = getNumberFromSlug(params.moduleSlug)

    if (typeof moduleNumber === 'number') {
      courseModule = await getModuleByNumber(course.id, moduleNumber)
    }
  }

  let courseUnit: CourseModuleUnit | null = null

  if (courseModule && params.unitSlug) {
    const unitNumber = getNumberFromSlug(params.unitSlug)

    if (typeof unitNumber === 'number') {
      courseUnit = await getUnitByNumber(courseModule.id, unitNumber)
    }
  }

  return {
    course,
    courseModule,
    courseUnit,
  }
}
