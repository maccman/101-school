import { db } from '../db'

export async function createModule(attrs: {
  courseId: string
  week: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('course_modules')
    .values(attrs)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function setModule(attrs: {
  courseId: string
  week: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('course_modules')
    .values(attrs)
    .onConflict((oc) => oc.columns(['courseId', 'week']).doUpdateSet(attrs))
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}
