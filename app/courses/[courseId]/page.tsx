import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getCourse, getFirstCourseUnit } from '@/server/db/courses/getters'

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const [course, courseUnit] = await Promise.all([
    getCourse(params.courseId),
    getFirstCourseUnit(params.courseId),
  ])

  if (!course || !courseUnit) {
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
