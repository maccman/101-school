import { fetchApi } from './client'
import { ChatMessage, MessageResponse, SupportedModels } from './types'

export interface CompletionOptions {
  messages: ChatMessage[]
  model?: SupportedModels
  temperature?: number
  apiKey?: string
  maxTokens?: number
  stopSequences?: string[]
  systemPrompt?: string
}

export async function fetchCompletion({
  messages,
  model = 'claude-3-opus-20240229',
  temperature = 0.5,
  maxTokens = 1024,
  stopSequences = [],
  systemPrompt,
  apiKey,
}: CompletionOptions): Promise<MessageResponse> {
  const response = await fetchApi<MessageResponse>(`/v1/messages`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      max_tokens: maxTokens,
      stop_sequences: stopSequences,
      system: systemPrompt,
    },
    apiKey,
  })

  return response
}
