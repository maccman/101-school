import type { ColumnType } from 'kysely'

// JSON types:

export interface UnitImage {
  source: string
  description: string | null
}

export interface CourseParsedContent {
  outline: string
  headline: string
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

export interface UnitChatMessage {
  id?: string
  content?: string
  role: string
  createdAt?: string
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
  slug: string
  title: string
  description: string
  content: string
  parsedContent: Generated<CourseParsedContent>
  cipCode: string | null
  cipTitle: string | null
  ddcCode: string | null
  ddcTitle: string | null
  stripePaymentIntentId: string | null
  generatedAt: Timestamp | null
  featuredAt: Timestamp | null
  ownerId: string
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseModule {
  id: Generated<string>
  number: number
  title: string
  content: string
  courseId: string
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseModuleUnit {
  id: Generated<string>
  number: number
  title: string
  content: string
  moduleId: string
  wikipediaUrls: Generated<string[]>
  image: Generated<UnitImage | null>
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseModuleUnitNext {
  id: Generated<string>
  title: string
  courseId: string
  moduleId: string
  nextId: Generated<string>
  nextModuleId: Generated<string>
  nextCourseId: Generated<string>
  nextTitle: string
}

export interface User {
  id: Generated<string>
  emails: Generated<string[]>
  lastSignInAt: Timestamp | null
  name: string | null
  stripeCustomerId: string | null
  createdAt: Generated<Timestamp>
  updatedAt: Generated<Timestamp>
}

export interface CourseImage {
  courseId: string
  image: UnitImage
}

export interface CourseEnrollment {
  id: Generated<string>
  userId: string
  courseId: string
  enrolledAt: Generated<Timestamp>
  completedUnitIds: Generated<string[]>
  unitCount: number
}

export interface CourseSubscription {
  id: Generated<string>
  userId: string | null
  courseId: string
  daysInterval: number
  email: string
  createdAt: Generated<Timestamp>
}

export interface UnitChat {
  userId: string
  unitId: string
  messages: UnitChatMessage[]
  createdAt: Generated<Timestamp>
}

export interface DB {
  courses: Course
  course_modules: CourseModule
  course_module_units: CourseModuleUnit
  course_module_units_next: CourseModuleUnitNext
  users: User
  course_images: CourseImage
  course_enrollments: CourseEnrollment
  course_subscriptions: CourseSubscription
  unit_chats: UnitChat
}
