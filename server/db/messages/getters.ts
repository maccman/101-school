import { db } from '../db'

export function getUnitMessages(unitId: string) {
  return db
    .selectFrom('unit_messages')
    .where('unitId', '=', unitId)
    .orderBy('createdAt', 'asc')
    .selectAll()
    .execute()
}
