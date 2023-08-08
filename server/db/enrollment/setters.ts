import { sql } from 'kysely'

import { db } from '../edge-db'
import { getUnitCountForCourse } from '../units/getters'

export async function markUnitAsComplete({
  userId,
  courseId,
  unitId,
}: {
  userId: string
  courseId: string
  unitId: string
}) {
  await db
    .updateTable('course_enrollments')
    .set({ completedUnitIds: sql`array_append(completed_unit_ids, ${unitId})` })
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .executeTakeFirstOrThrow()
}

export async function markUnitAsIncomplete({
  userId,
  courseId,
  unitId,
}: {
  userId: string
  courseId: string
  unitId: string
}) {
  await db
    .updateTable('course_enrollments')
    .set({
      completedUnitIds: sql`array_remove(completed_unit_ids, ${unitId})`,
    })
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .executeTakeFirstOrThrow()
}

export async function enrollInCourse({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  const unitCount = await getUnitCountForCourse(courseId)

  await db
    .insertInto('course_enrollments')
    .values({ userId, courseId, unitCount })
    .onConflict((oc) => oc.doNothing())
    .execute()
}

export async function unenrollFromCourse({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  await db
    .deleteFrom('course_enrollments')
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .execute()
}
