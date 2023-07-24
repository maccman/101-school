import { db } from '../db'

export const setUser = async ({
  id,
  emails,
  signInDate,
}: {
  id: string
  emails: string[]
  signInDate: Date
}) => {
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
