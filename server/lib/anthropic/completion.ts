import { fetchApi } from './client'
import { ChatMessage, MessageResponse, SupportedModels, Tool } from './types'

export interface CompletionOptions {
  messages: ChatMessage[]
  model?: SupportedModels
  temperature?: number
  apiKey?: string
  maxTokens?: number
  stopSequences?: string[]
  systemPrompt?: string
  tools?: Tool[]
}

export async function getPredictedMessages({
  messages,
  model = 'claude-3-opus-20240229',
  temperature = 0,
  maxTokens = 4096,
  stopSequences = [],
  systemPrompt,
  apiKey,
  tools,
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
      tools,
    },
    apiKey,
  })

  return response
}

export async function getPrediction({
  messages,
  model = 'claude-3-opus-20240229',
  temperature = 0,
  maxTokens = 4096,
  stopSequences = [],
  systemPrompt,
  apiKey,
}: CompletionOptions): Promise<string> {
  const response = await getPredictedMessages({
    messages,
    model,
    temperature,
    maxTokens,
    stopSequences,
    systemPrompt,
    apiKey,
  })

  const [firstMessage] = response.content

  if (!firstMessage) {
    throw new Error('Expected first message')
  }

  if (firstMessage.type !== 'text') {
    throw new Error('Expected first message to be text')
  }

  if (!firstMessage.text) {
    throw new Error('Expected first message to have text')
  }

  return firstMessage.text
}
