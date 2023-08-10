import { Selectable } from 'kysely'

import type { getCourseUnitsMap } from './getters'
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
export type CourseUnits = PromiseType<ReturnType<typeof getCourseUnitsMap>>
export type CourseWithImage = Course & { image: UnitImage | null }

export type CourseSansContent = Omit<Course, 'content' | 'parsedContent'>

// Courses with their contents are quite large, so we have a separate type for
// stripped down courses that don't include the content.
export const COURSE_SANS_CONTENT_KEYS = [
  'courses.id',
  'courses.slug',
  'courses.title',
  'courses.description',
  'courses.cipCode',
  'courses.cipTitle',
  'courses.ddcCode',
  'courses.ddcTitle',
  'courses.language',
  'courses.targeting',
  'courses.weekCount',
  'courses.generatedAt',
  'courses.featuredAt',
  'courses.ownerId',
  'courses.createdAt',
  'courses.updatedAt',
] as const
