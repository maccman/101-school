import { NextResponse } from 'next/server'

import { unenrollFromCourse } from '@/server/db/enrollment/setters'
import { withAuth } from '@/server/helpers/auth'

async function coursesUnenroll(
  request: Request,
  { params, userId }: { params: { courseId: string }; userId: string },
) {
  await unenrollFromCourse({ userId, courseId: params.courseId })

  return NextResponse.json({ success: true })
}

export const POST = withAuth(coursesUnenroll)
