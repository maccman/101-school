import { notFound } from 'next/navigation'

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

      <p>{courseUnit.unitBody}</p>
    </div>
  )
}
