import { JSONSchema7 } from 'json-schema'

export type SupportedModels = 'claude-3-opus-20240229'

export interface MessageContent {
  type: 'text' | 'image'
  text?: string
  source?: {
    type: 'base64'
    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    data: string
  }
}

export interface Message {
  role: 'user' | 'assistant'
  content: string | MessageContent[]
}

export interface UsageInfo {
  input_tokens: number
  output_tokens: number
}

export interface MessageResponse {
  id: string
  type: 'message'
  role: 'assistant'
  content: MessageContent[]
  model: string
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence'
  stop_sequence: string | null
  usage: UsageInfo
}

export interface ToolParameter {
  name: string
  description: string
  type: 'string' | 'int' | 'bool'
}

export interface Tool {
  tool_name: string
  description: string
  parameters: ToolParameter[]
}

export interface FunctionCall {
  tool_name: string
  parameters?: ToolParameter[]
}

export interface FunctionCallResult {
  tool_name: string
  stdout?: string
  error?: string
}
