import { AnthropicStream, Message, StreamingTextResponse } from 'ai'
import Anthropic from '@anthropic-ai/sdk'

import { upsertUnitChat } from '@/server/db/unit_chats/setters'
import { withAuth } from '@/server/helpers/auth'
import { UnitChatMessage } from '@/server/db/schema'
import {
  chatMessageToUnitMessage,
  getSystemPrompt,
  messagesToAnthropicMessage,
} from './utils'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'edge'

async function createChat(req: Request, { userId }: { userId: string }) {
  const { messages: messagesParam, unitId } = (await req.json()) as {
    messages: Message[]
    unitId: string
  }

  const systemPrompt = getSystemPrompt(messagesParam)

  const anthopicMessages = messagesToAnthropicMessage(messagesParam)

  const response = await anthropic.messages.create({
    system: systemPrompt,
    messages: anthopicMessages,
    model: 'claude-3-opus-20240229',
    stream: true,
    max_tokens: 4096,
  })

  const stream = AnthropicStream(response, {
    onCompletion: async (incomingMessageContent) => {
      const existingMessages: UnitChatMessage[] = messagesParam.map(
        chatMessageToUnitMessage,
      )

      const newMessage: UnitChatMessage = {
        content: incomingMessageContent,
        role: 'assistant',
        createdAt: new Date().toISOString(),
      }

      await upsertUnitChat({
        unitId,
        userId,
        messages: [...existingMessages, newMessage],
      })
    },
  })
  return new StreamingTextResponse(stream)
}

export const POST = withAuth(createChat)
