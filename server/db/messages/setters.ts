import { Insertable } from 'kysely'

import { db } from '../db'
import { UnitMessage } from '../schema'

export function createUnitMessage(values: Insertable<UnitMessage>) {
  return db.insertInto('unit_messages').values(values).execute()
}
