import { Selectable } from 'kysely'

import type { getCourseUnits } from './getters'
import type { Course as DbCourse, UnitImage } from '../schema'

type PromiseType<T> = T extends Promise<infer U> ? U : never

export interface CourseModule {
  id: string
  number: number
  title: string
  units: {
    id: string
    number: number
    title: string
  }[]
}

export type Course = Selectable<DbCourse>
export type CourseUnits = PromiseType<ReturnType<typeof getCourseUnits>>
export type CourseWithImage = Course & { image: UnitImage | null }
