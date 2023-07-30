import { Insertable, sql } from 'kysely'

import { db } from '../db'
import { CourseModuleUnit, UnitImage } from '../schema'

export async function createUnit(values: Insertable<CourseModuleUnit>) {
  const { id } = await db
    .insertInto('course_module_units')
    .values(values)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function setUnit(values: Insertable<CourseModuleUnit>) {
  const { id } = await db
    .insertInto('course_module_units')
    .values(values)
    .onConflict((oc) => oc.columns(['moduleId', 'number']).doUpdateSet(values))
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function setUnitImages(
  unitId: string,
  values: { images: UnitImage[]; wikipediaUrls: string[] },
) {
  await db
    .updateTable('course_module_units')
    .set(values)
    .where('id', '=', unitId)
    .execute()
}

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
    .set({ completedUnitIds: sql`'array_append(completed_unit_ids, ${unitId})'` })
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .execute()
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
      completedUnitIds: sql`'array_remove(completed_unit_ids, ${unitId})'`,
    })
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .execute()
}
