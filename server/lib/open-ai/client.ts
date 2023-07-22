import { assertString } from '../../../lib/assert'

const OPENAI_ENDPOINT = 'https://api.openai.com/v1'

export async function fetchApi<T>(
  path: string,
  {
    method,
    body,
    apiKey = getApiKey(),
  }: {
    method?: 'GET' | 'POST'
    body?: Record<string, unknown>
    apiKey?: string
  },
): Promise<T> {
  assertString(apiKey, 'No OpenAPI API Key provided')

  console.log(`${method} ${path} --> \n${JSON.stringify(body, null, 2)}`)

  const response = await fetch(`${OPENAI_ENDPOINT}${path}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(
      `OpenAI API responded with ${response.status}: ${await response.text()}}`,
    )
  }

  const json = await response.json()

  console.log(`${method} ${path} <-- \n${JSON.stringify(json, null, 2)}`)

  return json as T
}

function getApiKey(): string | undefined {
  if (typeof process !== 'undefined') {
    return process.env?.OPENAI_API_KEY
  }
}
