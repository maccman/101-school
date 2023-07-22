import { db } from '../db'

export async function createCourse(attrs: {
  title: string
  description: string
  body: string
}) {
  const { id } = await db
    .insertInto('courses')
    .values(attrs)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}
