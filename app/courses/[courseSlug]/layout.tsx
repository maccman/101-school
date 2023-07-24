import { Metadata } from 'next'
import React, { ReactNode } from 'react'

import ChatSidebar from '@/components/chat-sidebar/chat-sidebar'
import CourseSidebar from '@/components/course-sidebar/course-sidebar'
import { getCourseBySlug, getCourseUnits } from '@/server/db/courses/getters'

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string }
}): Promise<Metadata> {
  const course = await getCourseBySlug(params.courseSlug)

  if (!course) {
    return {
      title: '101.school',
      description: 'Learn anything',
    }
  }

  return {
    title: `${course.title} - 101.school`,
    description: course.description,
  }
}

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
    <div className="overflow-hidden grid lg:grid-cols-5 h-screen">
      <CourseSidebar
        course={course}
        courseUnits={courseUnits}
        className="hidden lg:block"
      />

      <div className="col-span-2 lg:col-span-3 lg:border-l overflow-auto pb-10">
        {children}
      </div>

      <ChatSidebar messages={[]} />
    </div>
  )
}
