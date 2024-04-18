import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { getCourseBySlugOrId, getFirstCourseUnit } from '@/server/db/courses/getters'
import { getModule } from '@/server/db/modules/getters'
import CourseSidebarLayout from '@/components/layouts/course-sidebar-layout'
import { CourseGenerating } from '@/components/courses/course-generating'

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const course = await getCourseBySlugOrId(params.courseSlug)

  if (!course) {
    return notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    console.error(
      `Course with slug "${params.courseSlug}" does not have a first module and unit`,
    )
    return <CourseGenerating />
  }

  const courseModule = await getModule(courseUnit.moduleId)

  if (!courseModule) {
    console.error(`Course with slug "${params.courseSlug}" has no module`)
    return notFound()
  }

  return (
    <CourseSidebarLayout courseSlug={params.courseSlug}>
      <CourseUnit courseModule={courseModule} courseUnit={courseUnit} course={course} />
    </CourseSidebarLayout>
  )
}
