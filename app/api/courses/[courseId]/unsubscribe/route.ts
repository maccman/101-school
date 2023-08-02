import { NextResponse } from 'next/server'

import { getCourseSubscriptionByCourseEmail } from '@/server/db/course_subscriptions/getters'
import { deleteCourseSubscription } from '@/server/db/course_subscriptions/setters'
import { error } from '@/server/helpers/error'
import { inngest } from '@/server/jobs/client'

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const { email } = await request.json()

  if (!email) {
    return error('Email is required')
  }

  const courseSubscription = await getCourseSubscriptionByCourseEmail({
    courseId: params.courseId,
    email,
  })

  if (!courseSubscription) {
    return error('Subscription not found')
  }

  await inngest.send({
    name: 'course/unsubscribe',
    data: {
      courseSubscriptionId: courseSubscription.id,
    },
  })

  await deleteCourseSubscription(courseSubscription.id)

  return NextResponse.json({
    success: true,
  })
}
