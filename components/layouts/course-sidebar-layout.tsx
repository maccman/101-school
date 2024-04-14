import { ReactNode, Suspense } from 'react'

import { CourseSidebar } from '@/components/course-sidebar'
import CourseSidebarWithEnrollment from '@/components/course-sidebar/course-sidebar-with-enrollment'
import { getCourseBySlugOrId, getCourseUnitsMap } from '@/server/db/courses/getters'
import { CourseGenerating } from '@/components/courses/course-generating'

export default async function CourseSidebarLayout({
  children,
  courseSlug,
}: {
  children: ReactNode
  courseSlug: string
}) {
  const course = await getCourseBySlugOrId(courseSlug)

  if (!course) {
    console.warn(`Course with slug "${courseSlug}" not found`)
    return null
  }

  const courseUnits = await getCourseUnitsMap(course.id)

  if (!course.generatedAt || courseUnits.size === 0) {
    return <CourseGenerating />
  }

  return (
    <div className="md:flex-1 md:overflow-hidden md:flex">
      <Suspense
        fallback={
          <CourseSidebar
            course={course}
            courseUnits={courseUnits}
            className="md:w-1/4 md:min-w-[300px] md:max-w-[400px] md:flex-none"
          />
        }
      >
        <CourseSidebarWithEnrollment
          course={course}
          courseUnits={courseUnits}
          className="md:w-1/4 md:min-w-[300px] md:max-w-[400px] md:flex-none"
        />
      </Suspense>

      <div className="md:flex-1 md:border-l flex">{children}</div>
    </div>
  )
}
