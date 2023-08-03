import { NextResponse } from 'next/server'

import { enrollInCourse } from '@/server/db/enrollment/setters'
import { withUnenforcedAuth } from '@/server/helpers/auth'
import { subscribeEmailToCourse } from '@/server/helpers/course-subscription'
import { error } from '@/server/helpers/error'

async function handleCourseSubscribe(
  request: Request,
  { userId, params }: { userId?: string; params: { courseId: string } },
) {
  const { email, daysInterval = 7 } = await request.json()

  // 1. Create course subscription, if it doesn't exist
  try {
    subscribeEmailToCourse({
      userId: userId ?? null,
      courseId: params.courseId,
      email,
      daysInterval,
    })
  } catch (err: any) {
    console.error(err)
    return error('Error creating subscription')
  }

  // 2. Enroll user in course if they are logged in
  if (userId) {
    await enrollInCourse({
      userId,
      courseId: params.courseId,
    })
  }

  return NextResponse.json({
    success: true,
  })
}

export const POST = withUnenforcedAuth(handleCourseSubscribe)
