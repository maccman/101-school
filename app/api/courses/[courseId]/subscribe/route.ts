import { NextResponse } from 'next/server'

import { createCourseSubscription } from '@/server/db/course_subscriptions/setters'
import { withUnenforcedAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'
import { inngest } from '@/server/jobs/client'

async function handleCourseSubscribe(
  request: Request,
  { userId, params }: { userId?: string; params: { courseId: string } },
) {
  const { email, daysInterval = 7 } = await request.json()

  let courseSubscriptionId: string | undefined

  try {
    courseSubscriptionId = await createCourseSubscription({
      userId: userId ?? null,
      courseId: params.courseId,
      email,
      daysInterval,
    })
  } catch (err: any) {
    if (err.message.includes('duplicate')) {
      return error('You are already subscribed to this course')
    }

    console.error(err)
    return error('Error creating subscription')
  }

  await inngest.send({
    id: `course-subscribe-${courseSubscriptionId}`,
    name: 'course/subscribe',
    data: {
      courseSubscriptionId,
    },
  })

  return NextResponse.json({
    success: true,
  })
}

export const POST = withUnenforcedAuth(handleCourseSubscribe)
