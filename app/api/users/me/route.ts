import { NextResponse } from 'next/server'

import { setUser } from '@/server/db/users/setters'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

async function updateCurrentUser(request: Request, { userId }: { userId: string }) {
  const body = await request.json()

  const name = body.name

  if (!name) {
    return error('Name is required')
  }

  await setUser(userId, { name })

  return NextResponse.json({ success: true })
}

export const PUT = withAuth(updateCurrentUser)
