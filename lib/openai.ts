import {assertString} from '@/lib/assert'

export type SupportedModels = 'gpt-3.5-turbo' | 'gpt-4'

export interface ChatCompletionResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export interface ChatCompletionMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatCompletionOptions {
  messages: ChatCompletionMessage[]
  temperature?: number
  model?: SupportedModels
  stop?: string[] | null
  apiKey?: string
}

export async function createChatCompletion({
  messages,
  model = 'gpt-4',
  temperature = 0.5,
  stop = null,
  apiKey = process.env.OPENAI_API_KEY!,
}: ChatCompletionOptions) {
  assertString(apiKey, 'apiKey must be provided')

  console.log('Creating chat completion', {
    messages,
  })

  const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      messages,
      stop,
    }),
  })

  if (!response.ok) {
    console.error(
      'Error creating chat completion',
      response.status,
      await response.text(),
    )
    throw new Error('Error creating chat completion')
  }

  const json = (await response.json()) as ChatCompletionResponse

  return json.choices[0]?.message?.content
}
