import { db } from '../db'

export async function createSection(attrs: {
  courseId: string
  week: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('sections')
    .values(attrs)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}
