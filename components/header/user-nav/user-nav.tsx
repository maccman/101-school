import { getUserById } from '@/server/db/users/getters'
import { auth } from '@/server/helpers/auth'

import { UserNavClient } from './user-nav-client'

export async function UserNav() {
  const userId = await auth()
  const user = userId ? await getUserById(userId) : null

  return (
    <UserNavClient
      userId={userId}
      userEmail={user?.emails?.[0] ?? null}
      userName={user?.name ?? null}
    />
  )
}
