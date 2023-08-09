import { Insertable } from 'kysely'

import { db } from '../edge-db'
import { UnitChat } from '../schema'

export function upsertUnitChat(values: Insertable<UnitChat>) {
  return db
    .insertInto('unit_chats')
    .values(values)
    .onConflict((oc) => oc.columns(['unitId', 'userId']).doUpdateSet(values))
    .execute()
}
