import { notFound, redirect } from 'next/navigation'

import { getFirstCourseUnit } from '@/server/db/courses/getters'
import { getPathForCourseUnit } from '@/server/helpers/links'
import { getCourseContext } from '@/server/helpers/params-getters'

export const runtime = 'edge'

export default async function CourseModulePage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string }
}) {
  const { course, courseModule } = await getCourseContext(params)

  if (!course || !courseModule) {
    notFound()
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  if (!courseUnit) {
    notFound()
  }

  const path = getPathForCourseUnit({
    course,
    courseModule,
    courseUnit,
  })

  redirect(path)
}
