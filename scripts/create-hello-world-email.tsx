import { render } from '@react-email/render'

import { createEmail } from '@/lib/resend'
import HelloWorldEmail from '@/server/emails/hello-world'

async function main() {
  const html = render(<HelloWorldEmail />, {
    pretty: true,
  })

  const text = render(<HelloWorldEmail />, {
    plainText: true,
  })

  await createEmail({
    html,
    text,
    subject: 'Hello world',
    to: 'alex@alexmaccaw.com',
    from: 'noreply@101.school',
  })
}

main()
