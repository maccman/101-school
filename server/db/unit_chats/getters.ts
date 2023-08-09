import { db } from '../edge-db'

export function getUnitChat({ unitId, userId }: { unitId: string; userId: string }) {
  return db
    .selectFrom('unit_chats')
    .selectAll()
    .where('unitId', '=', unitId)
    .where('userId', '=', userId)
    .orderBy('createdAt', 'asc')
    .executeTakeFirst()
}
