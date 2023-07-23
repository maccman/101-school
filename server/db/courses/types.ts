import { Selectable } from 'kysely'

import type { getCourseUnits } from './getters'
import type { Course as DbCourse } from '../schema'

type PromiseType<T> = T extends Promise<infer U> ? U : never

export type Course = Selectable<DbCourse>
export type CourseUnits = PromiseType<ReturnType<typeof getCourseUnits>>
