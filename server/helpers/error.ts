import { NextResponse } from 'next/server'

export function error(message: string, type = 'invalid_request', status = 400) {
  return NextResponse.json(
    {
      error: { message, type },
    },
    {
      status,
    },
  )
}

export function notFound() {
  return error('Not found', 'not_found', 404)
}
