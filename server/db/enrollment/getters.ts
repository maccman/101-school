import { db } from '../db'

export async function getCourseEnrollment({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  const record = await db
    .selectFrom('user_courses')
    .selectAll()
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .executeTakeFirst()

  return record ?? null
}
