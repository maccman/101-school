import { Message } from 'ai'

import { assert } from '@/lib/assert'
import { enumFromString } from '@/lib/enum'
import { UnitChatMessage } from '@/server/db/unit_chats/types'
import { nanoid } from '@/server/lib/id'

enum MessageRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
  function = 'function',
}

export function unitMessageToChatMessage(message: UnitChatMessage): Message {
  const role = enumFromString(MessageRole, message.role)
  assert(role, `Invalid message role: ${message.role}`)

  return {
    id: message.id ?? nanoid(),
    content: message.content ?? '',
    role,
    createdAt: message.createdAt ? new Date(message.createdAt) : undefined,
  }
}
