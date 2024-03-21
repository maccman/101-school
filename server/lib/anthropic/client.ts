import { assertString } from '../../../lib/assert'

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com'

type AnthropicVersions = '2023-01-01' | '2023-06-01'

export async function fetchApi<T>(
  path: string,
  {
    method,
    body,
    apiKey = getApiKey(),
    version = '2023-06-01',
  }: {
    method?: 'GET' | 'POST'
    body?: Record<string, unknown>
    apiKey?: string
    version?: AnthropicVersions
  },
): Promise<T> {
  assertString(apiKey, 'No Anthropic API Key provided')

  const response = await fetch(`${ANTHROPIC_ENDPOINT}${path}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': version,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(
      `Anthropic API responded with ${response.status}: ${await response.text()}}`,
    )
  }

  const json = await response.json()

  return json as T
}

function getApiKey(): string | undefined {
  if (typeof process !== 'undefined') {
    return process.env?.ANTHROPIC_API_KEY
  }
}
