import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { getCourseBySlug, getFirstCourseUnit } from '@/server/db/courses/getters'
import { auth } from '@/server/helpers/auth'

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const [userId, course] = await Promise.all([auth(), getCourseBySlug(params.courseSlug)])

  if (!course) {
    return notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    return notFound()
  }

  return (
    <CourseUnit
      courseModule={{ title: courseUnit.moduleTitle ?? '' }}
      courseUnit={courseUnit}
      userId={userId}
      courseId={course.id}
    />
  )
}
