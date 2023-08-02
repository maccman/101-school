type Tag = { name: string; value: string }

interface Attachment {
  content?: string | Buffer
  filename?: string | false | undefined
  path?: string
}

interface CreateEmail {
  attachments?: Attachment[]
  bcc?: string | string[]
  cc?: string | string[]
  from: string
  headers?: Record<string, string>
  html: string
  text?: string
  reply_to?: string | string[]
  subject: string
  tags?: Tag[]
  to: string | string[]
}

interface CreateEmailOptions {
  apiKey?: string
}

interface CreateEmailResponse {
  id: string
}

class ResendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResendError'
  }
}

const defaultApiKey = process.env.RESEND_API_KEY

export async function createEmail(
  params: CreateEmail,
  { apiKey }: CreateEmailOptions = {
    apiKey: defaultApiKey,
  },
): Promise<CreateEmailResponse> {
  if (!apiKey) {
    throw new ResendError('createEmail failed: apiKey is required')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new ResendError(`createEmail failed: ${await response.text()}`)
  }

  return await response.json()
}
