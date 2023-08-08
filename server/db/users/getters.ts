import { db } from '../edge-db'

export async function getUser(userId: string) {
  const record = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst()

  return record ?? null
}

export async function getUsers() {
  const records = await db
    .selectFrom('users')
    .selectAll()
    .orderBy('createdAt', 'asc')
    .execute()

  return records
}
