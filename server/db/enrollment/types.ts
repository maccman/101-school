import type { UserCourse as DbUserCourse } from '../schema'
import type { Selectable } from 'kysely'

export type CourseEnrollment = Selectable<DbUserCourse>
