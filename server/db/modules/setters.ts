import { Insertable } from 'kysely'

import { db } from '../edge-db'
import { CourseModule } from '../schema'

export async function createModule(values: Insertable<CourseModule>) {
  const { id } = await db
    .insertInto('course_modules')
    .values(values)
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}

export async function setModule(values: Insertable<CourseModule>) {
  const { id } = await db
    .insertInto('course_modules')
    .values(values)
    .onConflict((oc) => oc.columns(['courseId', 'number']).doUpdateSet(values))
    .returning('id')
    .executeTakeFirstOrThrow()

  return id
}
