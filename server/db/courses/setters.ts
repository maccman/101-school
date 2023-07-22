import { db } from '../db'
import { CourseParsedBody } from '../schema'

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

export async function updateCourse(
  id: string,
  attrs: {
    title?: string
    description?: string
    body?: string
    parsedBody?: CourseParsedBody
  },
) {
  await db.updateTable('courses').set(attrs).where('id', '=', id).execute()
}
