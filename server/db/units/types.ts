import { Selectable } from 'kysely'

import type { CourseModuleUnit as DbCourseModuleUnit } from '../schema'

export type CourseModuleUnit = Selectable<DbCourseModuleUnit>
