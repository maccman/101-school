import { db } from '../db'

export async function getUnit(unitId: string) {
  const record = await db
    .selectFrom('course_module_units')
    .where('id', '=', unitId)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitByNumber(moduleId: string, number: number) {
  const record = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .where('number', '=', number)
    .selectAll()
    .executeTakeFirst()

  return record ?? null
}

export async function getUnitsByModule(moduleId: string) {
  const records = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .selectAll()
    .execute()

  return records
}
