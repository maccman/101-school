import { db } from '../db'

export async function getUnitsByModule(moduleId: string) {
  const records = await db
    .selectFrom('course_module_units')
    .where('moduleId', '=', moduleId)
    .selectAll()
    .execute()

  return records
}
