import { OpenAIStream, StreamingTextResponse } from 'ai'
import { omit } from 'lodash'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai-edge'

import { upsertUnitChat } from '@/server/db/unit_chats/setters'
import { withAuth } from '@/server/helpers/auth'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

async function createChat(req: Request, { userId }: { userId: string }) {
  const { messages, unitId } = (await req.json()) as {
    messages: ChatCompletionRequestMessage[]
    unitId: string
  }

  // OpenAI doesn't want these fields
  const strippedMessages = messages.map((message) => omit(message, 'id', 'createdAt'))

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: strippedMessages,
  })

  const stream = OpenAIStream(response, {
    onCompletion: async (incomingMessageContent) => {
      const newMessage: ChatCompletionRequestMessage = {
        content: incomingMessageContent,
        role: 'assistant',
      }

      await upsertUnitChat({
        unitId,
        userId,
        messages: [...messages, newMessage],
      })
    },
  })
  return new StreamingTextResponse(stream)
}

export const POST = withAuth(createChat)
