import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { getCourseBySlug, getFirstCourseUnit } from '@/server/db/courses/getters'
import { getModule } from '@/server/db/modules/getters'

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    return notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    return notFound()
  }

  const courseModule = await getModule(courseUnit.moduleId)

  if (!courseModule) {
    return notFound()
  }

  return (
    <CourseUnit
      courseModule={courseModule}
      courseUnit={courseUnit}
      courseId={course.id}
    />
  )
}
