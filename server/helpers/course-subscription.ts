import { getCourseSubscriptionByCourseEmail } from '../db/course_subscriptions/getters'
import {
  createCourseSubscription,
  deleteCourseSubscription,
} from '../db/course_subscriptions/setters'
import { inngest } from '../jobs/client'

export async function subscribeEmailToCourse({
  email,
  courseId,
  daysInterval = 7,
  userId,
}: {
  email: string
  courseId: string
  daysInterval?: number
  userId: string | null
}) {
  let courseSubscriptionId: string | undefined

  try {
    // Create course subscription, if it doesn't exist
    courseSubscriptionId = await createCourseSubscription({
      userId: userId ?? null,
      courseId,
      email,
      daysInterval,
    })
  } catch (err: any) {
    if (err.message.includes('duplicate')) {
      // Already subscribed
      return
    }

    throw err
  }

  // 3. Send course subscription to Inngest
  await inngest.send({
    id: `course-subscribe-${courseSubscriptionId}`,
    name: 'course/subscribe',
    data: {
      courseSubscriptionId,
    },
  })
}

export async function unsubscribeEmailFromCourse({
  email,
  courseId,
}: {
  email: string
  courseId: string
}) {
  const courseSubscription = await getCourseSubscriptionByCourseEmail({
    courseId,
    email,
  })

  if (courseSubscription) {
    await inngest.send({
      name: 'course/unsubscribe',
      data: {
        courseSubscriptionId: courseSubscription.id,
      },
    })

    await deleteCourseSubscription(courseSubscription.id)
  }
}
