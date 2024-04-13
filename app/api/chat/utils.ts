import { Message } from 'ai'
import { UnitChatMessage } from '@/server/db/schema'
import { MessageParam } from '@anthropic-ai/sdk/resources'

export function chatMessageToUnitMessage(message: Message): UnitChatMessage {
  return {
    id: message.id,
    content: message.content ?? '',
    role: message.role ?? 'assistant',
    createdAt: message.createdAt
      ? message.createdAt.toISOString()
      : new Date().toISOString(),
  }
}

export function messagesToAnthropicMessage(messages: Message[]): MessageParam[] {
  const result: MessageParam[] = []
  let seenUser = false

  for (const message of messages) {
    if (message.role === 'user') {
      seenUser = true
    }

    // First message must have the `role` of the user
    if (!seenUser) {
      continue
    }

    if (message.role === 'assistant' || message.role === 'user') {
      result.push({
        role: message.role,
        content: message.content,
      })
    }
  }

  return result
}

export function getSystemPrompt(messages: Message[]): string {
  return messages
    .filter((message) => message.role === 'system')
    .map((message) => message.content)
    .join('\n')
}
