import { JSONSchema7 } from 'json-schema'

export type SupportedModels =
  | 'claude-3-opus-20240229'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-haiku-20240307'

export interface ChatMessageContentText {
  type: 'text'
  text: string
}

export interface ChatMessageContentImage {
  type: 'image'
  source: {
    type: 'base64'
    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    data: string
  }
}

export interface ChatMessageContentToolUse {
  type: 'tool_use'
  id: string
  name: string
  input: unknown
}

export type ChatMessageContent =
  | ChatMessageContentText
  | ChatMessageContentImage
  | ChatMessageContentToolUse

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string | ChatMessageContent[]
}

export interface UsageInfo {
  input_tokens: number
  output_tokens: number
}

export interface MessageResponse {
  id: string
  type: 'message'
  role: 'assistant'
  content: ChatMessageContent[]
  model: string
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence'
  stop_sequence: string | null
  usage: UsageInfo
}

export interface Tool {
  name: string
  description: string
  input_schema: JSONSchema7
}

export interface FunctionCall {
  tool_name: string
  parameters?: {
    [key: string]: string
  }
}

export interface FunctionCallResult {
  tool_name: string
  stdout?: string
  error?: string
}
