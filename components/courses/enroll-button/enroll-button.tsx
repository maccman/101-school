import { getCourseEnrollment } from '@/server/db/enrollment/getters'
import { auth } from '@/server/helpers/auth'

import { EnrollButtonClient } from './enroll-button-client'
import { ButtonProps } from '../../ui/button'

interface EnrollButtonProps extends ButtonProps {
  courseId: string
  hideEnrolled?: boolean
}

export async function EnrollButton({
  courseId,
  hideEnrolled,
  ...props
}: EnrollButtonProps) {
  const userId = await auth()
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
