import { notFound } from 'next/navigation'
import React, { ReactNode } from 'react'

import CourseSidebar from '@/components/course-sidebar/course-sidebar'
import { getCourse, getCourseUnits } from '@/server/db/courses/getters'

export default async function CourseShowLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { courseId: string }
}) {
  const [course, courseUnits] = await Promise.all([
    getCourse(params.courseId),
    getCourseUnits(params.courseId),
  ])

  if (!course) {
    return notFound()
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar course={course} courseUnits={courseUnits} />

      {children}
    </div>
  )
}
