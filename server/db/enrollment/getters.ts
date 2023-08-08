import { db } from '../edge-db'

export async function getCourseEnrollment({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  const record = await db
    .selectFrom('course_enrollments')
    .selectAll()
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .executeTakeFirst()

  return record ?? null
}
