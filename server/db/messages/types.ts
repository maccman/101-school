import { Selectable } from 'kysely'

import { UnitMessage as DbUnitMessage } from '../schema'

export type UnitMessage = Selectable<DbUnitMessage>
