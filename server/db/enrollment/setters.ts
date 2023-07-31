import { sql } from 'kysely'

import { db } from '../db'

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
    .updateTable('user_courses')
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
    .updateTable('user_courses')
    .set({
      completedUnitIds: sql`array_remove(completed_unit_ids, ${unitId})`,
    })
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .executeTakeFirstOrThrow()
}
