import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { EnrollButton } from '@/components/courses/enroll-button'
import { getCourseBySlug, getFirstCourseUnit } from '@/server/db/courses/getters'
import { auth } from '@/server/helpers/auth'

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const userId = await auth()
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    return notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    return notFound()
  }

  return (
    <div className="px-10 py-5 pb-10 relative">
      <Suspense>
        <EnrollButton
          userId={userId}
          courseId={course.id}
          className="absolute right-5 top-5"
        />
      </Suspense>

      <h3 className="text-base tracking-tight pb-5 text-accent-foreground">
        {courseUnit.moduleTitle}
      </h3>

      {courseUnit.unitImage && (
        <UnitImage
          image={courseUnit.unitImage}
          className="float-right mt-28 ml-5 mb-10"
        />
      )}

      {courseUnit.unitContent && <UnitContent content={courseUnit.unitContent} />}
    </div>
  )
}
