import { Insertable } from 'kysely'

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
