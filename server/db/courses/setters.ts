import { Insertable, Updateable } from 'kysely'

import { db } from '../db'
import { Course } from '../schema'

export async function createCourse(values: Insertable<Course>) {
  const { id } = await db
    .insertInto('courses')
    .values(values)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function updateCourse(id: string, values: Updateable<Course>) {
  await db.updateTable('courses').set(values).where('id', '=', id).execute()
}
