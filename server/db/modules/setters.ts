import { db } from '../db'

export async function createModule(attrs: {
  courseId: string
  week: number
  title: string
  body: string
}) {
  const { id } = await db
    .insertInto('modules')
    .values(attrs)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}
