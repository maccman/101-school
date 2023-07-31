import type { CourseEnrollment as DbUserCourse } from '../schema'
import type { Selectable } from 'kysely'

export type CourseEnrollment = Selectable<DbUserCourse>
