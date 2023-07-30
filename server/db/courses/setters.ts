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

export async function enrollInCourse({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  await db
    .insertInto('user_courses')
    .values({ userId, courseId })
    .onConflict((oc) => oc.doNothing())
    .execute()
}

export async function unenrollFromCourse({
  userId,
  courseId,
}: {
  userId: string
  courseId: string
}) {
  await db
    .deleteFrom('user_courses')
    .where('userId', '=', userId)
    .where('courseId', '=', courseId)
    .execute()
}
