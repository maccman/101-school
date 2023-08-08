import { Message } from 'ai'

import { assert } from '@/plugins/assert'
import { enumFromString } from '@/plugins/enum'
import { UnitMessage } from '@/server/db/messages/types'

enum MessageRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
  function = 'function',
}

export function unitMessageToChatMessage(message: UnitMessage): Message {
  const role = enumFromString(MessageRole, message.role)
  assert(role, `Invalid message role: ${message.role}`)

  return {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
    role,
  }
}
