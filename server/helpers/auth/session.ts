import { createRemoteJWKSet, jwtVerify } from 'jose'

import { assertString, assert } from '@/lib/assert'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

interface HankoEmailResponse {
  id: string
  address: string
  is_verified: boolean
  is_primary: boolean
}

const JWKS = createRemoteJWKSet(new URL(`${hankoApiUrl}/.well-known/jwks.json`), {
  cooldownDuration: 1000 * 60 * 60 * 24, // 24 hours
  cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
})

export async function getUserIdFromSessionToken(token: string) {
  const { payload, protectedHeader } = await jwtVerify(token, JWKS)

  assert(protectedHeader.alg === 'RS256', 'alg is not RS256')

  const userId = payload.sub

  assertString(userId, 'userId is not a string')

  return userId
}

export async function safeGetUserIdFromSessionToken(token: string) {
  try {
    return await getUserIdFromSessionToken(token)
  } catch (error) {
    return null
  }
}

export async function getEmailsFromSessionToken(token: string): Promise<null | string[]> {
  const request = await fetch(`${hankoApiUrl}/emails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 120,
    },
  })

  if (!request.ok) {
    console.error(
      'Failed to fetch emails from Hanko API:',
      request.statusText,
      await request.text(),
    )
    return null
  }

  const emails = (await request.json()) as HankoEmailResponse[]

  // Sort emails and make sure primary is first
  emails.sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : 0))

  return emails.map((email) => email.address)
}
