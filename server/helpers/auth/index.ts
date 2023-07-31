import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { getEmailsFromSessionToken, safeGetUserIdFromSessionToken } from './session'
import { getToken } from './token'
import { error } from '../error'

export function uncachedAuth() {
  const headersList = headers()
  const [authType, token] = getToken(headersList)

  if (!token) {
    return null
  }

  return getUserId(authType, token)
}

export const auth = cache(uncachedAuth)

export function authRedirect(redirectBack: string = ''): never {
  redirect(`/auth${redirectBack ? `?redirect=${redirectBack}` : ''}`)
}

/**
 * Authenticates a user and redirects them to a specified URL if not authenticated.
 * @param {string} redirectBack - The relative path to redirect back to after authentication (optional).
 * @returns {Promise<string>} A promise that resolves to the authenticated user's ID.
 */
export async function authOrRedirect(redirectBack: string = ''): Promise<string> {
  const userId = await auth()

  if (!userId) {
    authRedirect(redirectBack)
  }

  return userId
}

export async function getSessionEmails(): Promise<string[] | null> {
  const headersList = headers()
  const [authType, token] = getToken(headersList)

  if (authType != 'session') {
    return null
  }

  if (!token) {
    return null
  }

  return getEmailsFromSessionToken(token)
}

export function withAuth<U extends { userId: string }>(
  callback: (request: Request, args: U) => Promise<Response>,
) {
  return async (request: Request, args: U) => {
    const [authType, token] = getToken(request.headers)

    if (!token) {
      return error('Authentication required', 'invalid_request', 401)
    }

    const userId = await getUserId(authType, token)

    if (!userId) {
      return error('Invalid token', 'invalid_token', 401)
    }

    const argsWithUserId: U = { ...args, userId } as U & { userId: string }

    return callback(request, argsWithUserId)
  }
}

async function getUserId(
  authType: 'api' | 'session' | null,
  token: string,
): Promise<string | null> {
  switch (authType) {
    case 'session':
      return safeGetUserIdFromSessionToken(token)
    default:
      throw new Error('Invalid token')
  }
}
