import { Insertable } from 'kysely'

import { db } from '../db'
import { User } from '../schema'

export async function setUserAuth({
  id,
  emails,
  signInDate,
}: {
  id: string
  emails: string[]
  signInDate: Date
}) {
  // Insert or update the user's emails and last sign in time
  await db
    .insertInto('users')
    .values({
      id: id,
      emails: emails,
      lastSignInAt: signInDate,
    })
    .onConflict((oc) =>
      oc.column('id').doUpdateSet({
        emails: emails,
        lastSignInAt: signInDate,
      }),
    )
    .execute()
}

export async function setUser(userId: string, values: Insertable<User>) {
  await db
    .updateTable('users')
    .set(values)
    .where('id', '=', userId)
    .executeTakeFirstOrThrow()
}
