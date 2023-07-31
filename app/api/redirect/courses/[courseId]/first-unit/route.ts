import { NextResponse } from 'next/server'

import { getCourse, getFirstCourseUnit } from '@/server/db/courses/getters'
import { notFound } from '@/server/helpers/error'
import { getPathForCourseUnit } from '@/server/helpers/links'

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const course = await getCourse(params.courseId)
  const courseUnit = await getFirstCourseUnit(params.courseId)

  if (!course || !courseUnit) {
    return notFound()
  }

  const url = new URL(
    getPathForCourseUnit({
      course,
      courseModule: {
        number: courseUnit.moduleNumber,
        title: courseUnit.moduleTitle,
      },
      courseUnit,
    }),
    request.url,
  )

  return NextResponse.redirect(url)
}
