import { db } from '../db'
import { UnitImage } from '../schema'

export async function createUnit(attrs: {
  moduleId: string
  number: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('course_module_units')
    .values(attrs)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function setUnit(attrs: {
  moduleId: string
  number: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('course_module_units')
    .values(attrs)
    .onConflict((oc) => oc.columns(['moduleId', 'number']).doUpdateSet(attrs))
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function updateUnitImages(
  unitId: string,
  attrs: { images: UnitImage[]; wikipediaUrls: string[] },
) {
  await db
    .updateTable('course_module_units')
    .set(attrs)
    .where('id', '=', unitId)
    .execute()
}
