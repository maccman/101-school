import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { auth } from '@/server/helpers/auth'
import { getCourseContext } from '@/server/helpers/params-getters'

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}): Promise<Metadata> {
  const { course, courseModule, courseUnit } = await getCourseContext(params)

  if (!course || !courseModule || !courseUnit) {
    return {
      title: '101.school',
      description: 'Learn anything',
    }
  }

  return {
    title: `${courseModule.title} / ${courseUnit.title}`,
    description: course.description,
  }
}

export default async function CourseModuleUnitPage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}) {
  const [{ course, courseModule, courseUnit }, userId] = await Promise.all([
    getCourseContext(params),
    auth(),
  ])

  if (!course || !courseModule || !courseUnit) {
    return notFound()
  }

  return (
    <CourseUnit
      courseId={course.id}
      courseModule={courseModule}
      courseUnit={courseUnit}
      userId={userId}
    />
  )
}
