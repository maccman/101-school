import { ReactNode } from 'react'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { getCourseBySlugOrId } from '@/server/db/courses/getters'

import { notFound } from 'next/navigation'

export default async function CourseShowLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { courseSlug: string }
}) {
  const course = await getCourseBySlugOrId(params.courseSlug)

  if (!course) {
    console.warn(`Course with slug "${params.courseSlug}" not found`)
    return notFound()
  }

  return <HeaderLayout courseId={course.id}>{children}</HeaderLayout>
}
