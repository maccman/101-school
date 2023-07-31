import { NextResponse } from 'next/server'

import { enrollInCourse } from '@/server/db/enrollment/setters'
import { withAuth } from '@/server/helpers/auth'

async function coursesEnroll(
  request: Request,
  { params, userId }: { params: { courseId: string }; userId: string },
) {
  await enrollInCourse({ userId, courseId: params.courseId })

  return NextResponse.json({ success: true })
}

export const POST = withAuth(coursesEnroll)
