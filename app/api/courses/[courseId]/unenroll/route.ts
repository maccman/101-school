import { NextResponse } from 'next/server'

import { unenrollFromCourse } from '@/server/db/enrollment/setters'
import { getUser } from '@/server/db/users/getters'
import { withAuth } from '@/server/helpers/auth'
import { unsubscribeEmailFromCourse } from '@/server/helpers/course-subscription'

async function coursesUnenroll(
  request: Request,
  { params, userId }: { params: { courseId: string }; userId: string },
) {
  await unenrollFromCourse({ userId, courseId: params.courseId })

  const user = await getUser(userId)

  for (const email of user?.emails ?? []) {
    await unsubscribeEmailFromCourse({
      email,
      courseId: params.courseId,
    })
  }

  return NextResponse.json({ success: true })
}

export const POST = withAuth(coursesUnenroll)
