import { NextResponse } from 'next/server'

import { getCourse } from '@/server/db/courses/getters'
import { getModule } from '@/server/db/modules/getters'
import { getNextUnit } from '@/server/db/units/getters'
import { notFound } from '@/server/helpers/error'
import { getPathForCourseUnit } from '@/server/helpers/links'

export async function GET(request: Request, { params }: { params: { unitId: string } }) {
  const nextCourseUnit = await getNextUnit(params.unitId)

  if (!nextCourseUnit) {
    // Redirect back
    return NextResponse.redirect(request.headers.get('referer') || '/')
  }

  const courseModule = await getModule(nextCourseUnit.moduleId)

  if (!courseModule) {
    return notFound()
  }

  const course = await getCourse(courseModule.courseId)

  if (!course) {
    return notFound()
  }

  const url = new URL(
    getPathForCourseUnit({ course, courseModule, courseUnit: nextCourseUnit }),
    request.url,
  )

  return NextResponse.redirect(url)
}
