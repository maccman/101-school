import React from 'react'

import { createEmail } from '@/lib/resend'
import HelloWorldEmail from '@/server/emails/hello-world'
import { renderAsync } from '@/server/helpers/react-email'

export const runtime = 'edge'

export async function POST(_request: Request) {
  const html = await renderAsync(React.createElement(HelloWorldEmail))

  const text = await renderAsync(HelloWorldEmail(), {
    plainText: true,
  })

  await createEmail({
    html,
    text,
    subject: 'Hello world',
    to: 'alex@alexmaccaw.com',
    from: 'noreply@101.school',
  })

  return new Response('Hello world!')
}
