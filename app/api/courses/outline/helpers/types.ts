import { ChatMessageContent } from '@/server/lib/anthropic/types'

export type PredictResponse =
  | {
      type: 'message_start'
      message: {
        id: string
        type: 'message'
        role: 'assistant'
        content: string | ChatMessageContent[]
        model: string
        stop_reason: string | null
        stop_sequence: string | null
        usage: {
          input_tokens: number
          output_tokens: number
        }
      }
    }
  | {
      type: 'content_block_start'
      index: number
      content_block: {
        type: 'text'
        text: string
      }
    }
  | {
      type: 'ping'
    }
  | {
      type: 'content_block_delta'
      index: number
      delta: {
        type: 'text_delta'
        text: string
      }
    }
  | {
      type: 'content_block_stop'
      index: number
    }
  | {
      type: 'message_delta'
      delta: {
        stop_reason: string
        stop_sequence: null
      }
      usage: {
        output_tokens: number
      }
    }
  | {
      type: 'message_stop'
    }
