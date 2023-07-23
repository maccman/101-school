import { db } from '../db'

export async function getUnitsForModule(moduleId: string) {
  const records = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .selectAll()
    .execute()

  return records
}

export async function getUnit(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .where('id', '=', unitId)
    .selectAll()
    .executeTakeFirst()

  return record
}
