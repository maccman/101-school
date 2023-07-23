import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getCourseBySlug, getFirstCourseUnit } from '@/server/db/courses/getters'

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    return notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    return notFound()
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{courseUnit.unitTitle}</p>

      {courseUnit.unitImage && <UnitImage image={courseUnit.unitImage} />}

      {courseUnit.unitBody && <UnitContent content={courseUnit.unitBody} />}
    </div>
  )
}
