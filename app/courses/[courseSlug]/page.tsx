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
    <div className="px-10 py-5 pb-10">
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
