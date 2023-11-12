import { fetchApi } from './client'
import {
  ChatFunction,
  ChatMessage,
  ChatResponse,
  OpenAIChatCompletion,
  SupportedModels,
} from './types'
import { assert } from '../../../lib/assert'

interface Options {
  messages: ChatMessage[]
  model?: SupportedModels
  temperature?: number
  apiKey?: string
  functions?: ChatFunction[]
  functionCall?: string
}

export async function fetchCompletion({
  messages,
  functions,
  functionCall,
  apiKey,
  model = 'gpt-4-1106-preview',
  temperature = 0,
}: Options): Promise<ChatResponse> {
  const response = await fetchApi<OpenAIChatCompletion>(`/chat/completions`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      functions,
      function_call: functionCall ? { name: functionCall } : undefined,
    },
    apiKey,
  })

  assert(response.choices.length === 1, 'Expected response.choices to be 1')

  const [choice] = response.choices

  return choice.message
}
