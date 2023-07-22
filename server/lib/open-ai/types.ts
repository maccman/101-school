import {JSONSchema7} from 'json-schema'

export type SupportedModels = 'gpt-4' | 'gpt-3.5-turbo'

type ChatRole = 'user' | 'system' | 'assistant'

type JsonString = string

export interface OpenAIChatCompletionMessage {
  role: ChatRole
  content: string
  function_call?: {
    name: string
    arguments: JsonString
  }
}

export interface OpenAIChatCompletionChoice {
  message: OpenAIChatCompletionMessage
  finish_reason: string
  index: number
}

export interface OpenAIChatCompletion {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: OpenAIChatCompletionChoice[]
}

export type ChatMessageRole = 'user' | 'system' | 'assistant' | 'function'

export interface ChatFunctionCall {
  name: string
  arguments: string
}

export interface ChatFunction {
  name: string
  description: string
  parameters: JSONSchema7
}

export interface ChatMessage {
  role: ChatMessageRole
  content?: string
  name?: string
  function_call?: ChatFunctionCall
}

export interface ChatRequest {
  messages: ChatMessage[]
  functions?: ChatFunction[]
  functionCall?: string
}

export type ChatResponse = ChatMessage
