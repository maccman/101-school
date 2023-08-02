import { db } from '../db'

export async function getCourseSubscription(courseId: string) {
  const record = await db
    .selectFrom('course_subscriptions')
    .where('id', '=', courseId)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getCourseSubscriptionByCourseEmail({
  courseId,
  email,
}: {
  courseId: string
  email: string
}) {
  const record = await db
    .selectFrom('course_subscriptions')
    .where('courseId', '=', courseId)
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}
