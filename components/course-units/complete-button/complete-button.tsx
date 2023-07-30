import { getCourseEnrollment } from '@/server/db/enrollment/getters'
import { auth } from '@/server/helpers/auth'

import { CompleteButtonClient } from './complete-button-client'

interface CompleteButtonProps {
  courseId: string
  unitId: string
  nextUnitId: string
}

export async function CompleteButton({
  courseId,
  unitId,
  nextUnitId,
}: CompleteButtonProps) {
  const userId = await auth()
  const enrollment = userId ? await getCourseEnrollment({ userId, courseId }) : null
  const isCompleted = enrollment?.completedUnitIds?.includes(unitId) ?? false

  return (
    <CompleteButtonClient
      unitId={unitId}
      nextUnitId={nextUnitId}
      isCompleted={isCompleted}
      isAuthenticated={!!userId}
    />
  )
}
