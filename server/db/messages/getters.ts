import { db } from '../edge-db'

export function getUnitMessages({ unitId, userId }: { unitId: string; userId: string }) {
  return db
    .selectFrom('unit_messages')
    .where('unitId', '=', unitId)
    .where('userId', '=', userId)
    .orderBy('createdAt', 'asc')
    .selectAll()
    .execute()
}
