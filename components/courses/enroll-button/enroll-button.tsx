import { getCourseEnrollment } from '@/server/db/enrollment/getters'

import { EnrollButtonClient } from './enroll-button-client'
import { ButtonProps } from '../../ui/button'

interface EnrollButtonProps extends ButtonProps {
  userId: string | null
  courseId: string
  hideEnrolled?: boolean
}

export async function EnrollButton({
  courseId,
  hideEnrolled,
  userId,
  ...props
}: EnrollButtonProps) {
  const courseEnrollment = userId ? await getCourseEnrollment({ userId, courseId }) : null

  if (hideEnrolled && courseEnrollment) {
    return null
  }

  return (
    <EnrollButtonClient
      enrolled={!!courseEnrollment}
      userId={userId}
      courseId={courseId}
      {...props}
    />
  )
}
