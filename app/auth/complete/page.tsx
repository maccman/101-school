'use server'

import { redirect } from 'next/navigation'

import { setUserAuth } from '@/server/db/users/setters'
import { getSessionEmails, authOrRedirect } from '@/server/helpers/auth'
import { baseUrl } from '@/server/helpers/base-url'

export default async function AuthCompletePage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  const userId = await authOrRedirect()
  const emails = (await getSessionEmails()) ?? []

  await setUserAuth({
    id: userId,
    signInDate: new Date(),
    emails,
  })

  // If redirect is valid and scoped to baseUrl, redirect to it
  if (searchParams.redirect && searchParams.redirect.startsWith(baseUrl)) {
    return redirect(searchParams.redirect)
  }

  redirect('/account')
}
