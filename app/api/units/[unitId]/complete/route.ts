import { NextResponse } from 'next/server'

import { enrollInCourse, markUnitAsComplete } from '@/server/db/enrollment/setters'
import { getUnitAndModule } from '@/server/db/units/getters'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

async function completeUnit(
  request: Request,
  { userId, params }: { userId: string; params: { unitId: string } },
) {
  const unit = await getUnitAndModule(params.unitId)

  if (!unit) {
    return error('Unit not found')
  }

  // Noops if already enrolled
  await enrollInCourse({ userId, courseId: unit.courseId })

  await markUnitAsComplete({ userId, unitId: unit.id, courseId: unit.courseId })

  return NextResponse.json({ success: true })
}

export const POST = withAuth(completeUnit)
