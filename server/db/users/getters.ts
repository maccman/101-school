import { db } from '../db'

export async function getUserById(userId: string) {
  const record = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst()

  return record ?? null
}
