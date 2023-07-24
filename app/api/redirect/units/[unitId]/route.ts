import { NextResponse } from 'next/server'

import { getCourse } from '@/server/db/courses/getters'
import { getModule } from '@/server/db/modules/getters'
import { getUnit } from '@/server/db/units/getters'
import { notFound } from '@/server/helpers/error'
import { getPathForCourseUnit } from '@/server/helpers/links'

export async function GET(req: Request, { params }: { params: { unitId: string } }) {
  const courseUnit = await getUnit(params.unitId)

  if (!courseUnit) {
    return notFound()
  }

  const courseModule = await getModule(courseUnit.moduleId)

  if (!courseModule) {
    return notFound()
  }

  const course = await getCourse(courseModule.courseId)

  if (!course) {
    return notFound()
  }

  const url = getPathForCourseUnit({ course, courseModule, courseUnit })

  return NextResponse.redirect(url)
}
