import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { CourseSidebar } from '@/components/course-sidebar'
import { HeaderLayout } from '@/components/layouts/header-layout'
import { getCourseBySlug, getCourseUnits } from '@/server/db/courses/getters'
import { getCourseEnrollment } from '@/server/db/enrollment/getters'
import { auth } from '@/server/helpers/auth'

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
  const [userId, course] = await Promise.all([auth(), getCourseBySlug(params.courseSlug)])

  if (!course) {
    console.warn(`Course with slug "${params.courseSlug}" not found`)
    notFound()
  }

  const courseUnits = await getCourseUnits(course.id)
  const courseEnrollment = userId
    ? await getCourseEnrollment({ userId, courseId: course.id })
    : null

  return (
    <HeaderLayout courseId={course.id}>
      <div className="md:flex-1 md:overflow-hidden md:flex">
        <CourseSidebar
          course={course}
          courseUnits={courseUnits}
          courseEnrollment={courseEnrollment}
          className="md:w-1/4 md:min-w-[300px] md:max-w-[400px] md:flex-none"
        />

        <div className="md:flex-1 md:border-l flex">{children}</div>
      </div>
    </HeaderLayout>
  )
}
