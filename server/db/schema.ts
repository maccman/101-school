import type { ColumnType } from 'kysely'

// JSON types:

export interface UnitImage {
  source: string
  description: string
}

export interface CourseParsedBody {
  outline: string
  targeting: string
  modules: CourseParsedModule[]
  recommendedReading: CourseParsedRecommendedReading[]
}

export interface CourseParsedModule {
  week: number
  title: string
  units: CourseParsedUnit[]
}

export interface CourseParsedUnit {
  number: number
  title: string
}

export interface CourseParsedRecommendedReading {
  title: string
}

// Semi-generated types:

// Update process
// - Copy across schema-generated.ts
// - Update table names to be singular
// - Update JSON types to be interface

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export type Json = ColumnType<JsonValue, string, string>

export type JsonArray = JsonValue[]

export type JsonObject = {
  [K in string]?: JsonValue
}

export type JsonPrimitive = boolean | null | number | string

export type JsonValue = JsonArray | JsonObject | JsonPrimitive

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Course {
  id: Generated<string>
  title: string
  description: string
  body: string
  parsedBody: Generated<CourseParsedBody>
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseModule {
  id: Generated<string>
  week: number
  title: string
  body: string
  courseId: string
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseModuleUnit {
  id: Generated<string>
  number: number
  title: string
  body: string
  moduleId: string
  wikipediaUrls: Generated<string[]>
  images: Generated<UnitImage[]>
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface User {
  id: Generated<string>
  emails: Generated<string[]>
  lastSignInAt: Timestamp | null
}

export interface DB {
  courses: Course
  course_modules: CourseModule
  course_module_units: CourseModuleUnit
  users: User
}
