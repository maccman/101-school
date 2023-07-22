import type { ColumnType } from 'kysely'

export interface UnitImage {
  source: string
  description: string
}

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
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface Module {
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
  modules: Module
  units: Unit
  users: User
}
