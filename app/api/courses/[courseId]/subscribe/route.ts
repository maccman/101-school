import { NextResponse } from 'next/server'

import { createCourseSubscription } from '@/server/db/course_subscriptions/setters'
import { enrollInCourse } from '@/server/db/enrollment/setters'
import { withUnenforcedAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'
import { inngest } from '@/server/jobs/client'

async function handleCourseSubscribe(
  request: Request,
  { userId, params }: { userId?: string; params: { courseId: string } },
) {
  const { email, daysInterval = 7 } = await request.json()

  // 1. Enroll user in course if they are logged in
  if (userId) {
    await enrollInCourse({
      userId,
      courseId: params.courseId,
    })
  }

  let courseSubscriptionId: string | undefined

  // 2. Create course subscription, if it doesn't exist
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

  // 3. Send course subscription to Inngest
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
