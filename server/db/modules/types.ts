import { Selectable } from 'kysely'

import type { CourseModule as DbCourseModule } from '../schema'

export type CourseModule = Selectable<DbCourseModule>
