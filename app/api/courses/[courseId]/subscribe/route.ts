import { NextResponse } from 'next/server'

import { createCourseSubscription } from '@/server/db/course_subscriptions/setters'
import { withUnenforcedAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

export async function handleCourseSubscribe(
  request: Request,
  { userId, params }: { userId?: string; params: { courseId: string } },
) {
  const { email, daysInterval = 7 } = await request.json()

  try {
    await createCourseSubscription({
      userId: userId ?? null,
      courseId: params.courseId,
      email,
      daysInterval,
    })
  } catch (err) {
    console.error(err)
    return error('Error creating subscription')
  }

  return NextResponse.json({
    success: true,
  })
}

export const POST = withUnenforcedAuth(handleCourseSubscribe)
