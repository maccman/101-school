import type { ColumnType } from 'kysely'

// JSON types:

export interface UnitImage {
  source: string
  description: string
}

export interface CourseParsedBody {
  outline: string
  targeting: string
  modules: CourseParsedModuleSection[]
  recommendedReading: CourseParsedBodyRecommendedReading[]
}

export interface CourseParsedModuleSection {
  week: number
  title: string
  units: CourseParsedBodySectionUnit[]
}

export interface CourseParsedBodySectionUnit {
  number: number
  title: string
}

export interface CourseParsedBodyRecommendedReading {
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

export interface Section {
  id: Generated<string>
  week: number
  title: string
  body: string
  courseId: string
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface Unit {
  id: Generated<string>
  title: string
  body: string
  sectionId: string
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
  sections: Section
  units: Unit
  users: User
}
