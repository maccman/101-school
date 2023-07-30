import { Separator } from '@/components/ui/separator'
import { assert } from '@/lib/assert'
import { getUserById } from '@/server/db/users/getters'
import { authOrRedirect } from '@/server/helpers/auth'

import { AccountForm } from './components/account-form'
import { AccountProfile } from './components/account-profile-dynamic'

export default async function Account() {
  const userId = await authOrRedirect()
  const user = await getUserById(userId)
  assert(user, 'User not found')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator />

      <AccountForm userName={user.name} />

      <AccountProfile />
    </div>
  )
}
