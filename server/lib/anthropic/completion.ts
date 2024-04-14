import { fetchApi, fetchApiJson } from './client'
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
  stream?: boolean
}

const DEFAULT_MODEL = 'claude-3-opus-20240229'

export async function getPredictedMessages({
  messages,
  model = DEFAULT_MODEL,
  temperature = 0,
  maxTokens = 4096,
  stopSequences = [],
  systemPrompt,
  apiKey,
  tools,
  stream,
}: CompletionOptions): Promise<MessageResponse> {
  return fetchApiJson<MessageResponse>(`/v1/messages`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      max_tokens: maxTokens,
      stop_sequences: stopSequences,
      system: systemPrompt,
      tools,
      stream,
    },
    apiKey,
  })
}

export async function getStreamingPredictedMessages({
  messages,
  model = DEFAULT_MODEL,
  temperature = 0,
  maxTokens = 4096,
  stopSequences = [],
  systemPrompt,
  apiKey,
  tools,
}: CompletionOptions) {
  return fetchApi(`/v1/messages`, {
    method: 'POST',
    body: {
      model,
      temperature,
      messages,
      max_tokens: maxTokens,
      stop_sequences: stopSequences,
      system: systemPrompt,
      tools,
      stream: true,
    },
    apiKey,
  })
}

export async function getPrediction({
  messages,
  model = DEFAULT_MODEL,
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
