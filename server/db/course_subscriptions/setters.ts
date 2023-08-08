import { Insertable } from 'kysely'

import { db } from '../edge-db'
import { CourseSubscription } from '../schema'

export async function createCourseSubscription(values: Insertable<CourseSubscription>) {
  const { id } = await db
    .insertInto('course_subscriptions')
    .values(values)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function deleteCourseSubscription(courseSubscriptionId: string) {
  await db
    .deleteFrom('course_subscriptions')
    .where('id', '=', courseSubscriptionId)
    .execute()
}
