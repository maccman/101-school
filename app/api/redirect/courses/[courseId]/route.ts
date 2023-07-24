import { NextResponse } from 'next/server'

import { getCourse } from '@/server/db/courses/getters'
import { notFound } from '@/server/helpers/error'
import { getPathForCourse } from '@/server/helpers/links'

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const course = await getCourse(params.courseId)

  if (!course) {
    return notFound()
  }

  const url = getPathForCourse({ course })

  return NextResponse.redirect(url)
}
