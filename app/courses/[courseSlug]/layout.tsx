import React, { ReactNode } from 'react'

import CourseSidebar from '@/components/course-sidebar/course-sidebar'
import { getCourseBySlug, getCourseUnits } from '@/server/db/courses/getters'

export default async function CourseShowLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { courseSlug: string }
}) {
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    console.warn(`Course with slug "${params.courseSlug}" not found`)
    return null
  }

  const courseUnits = await getCourseUnits(course.id)

  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar course={course} courseUnits={courseUnits} />

      {children}
    </div>
  )
}
