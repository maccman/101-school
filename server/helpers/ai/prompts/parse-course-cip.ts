import { z } from 'zod'

import { assert } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { buildChatFunction, parseChatFunctionArgs } from '@/server/lib/open-ai/functions'
import { ChatMessage } from '@/server/lib/open-ai/types'

const schema = z.object({
  cipCode: z.string().describe("The course's CIP code"),
  cipTitle: z.string().describe("The course's CIP title"),
})

type Parsed = z.infer<typeof schema>

export async function parseCourseCipCode(courseBody: string): Promise<Parsed> {
  const result = await fetchCompletion({
    messages: getChatMessages(courseBody),
    functions: getChatFunctions(),
  })

  assert(result.function_call, 'No function call found')

  return parseChatFunctionArgs(result.function_call.arguments, schema)
}

function getChatMessages(description: string): ChatMessage[] {
  return [
    {
      role: 'system',
      content: 'You are a helpful and accurate assistant.',
    },
    {
      role: 'user',
      content: `
      What is the Classification of Instructional Programs (CIP) of the university course described below?
    
      ${description}
  `.trim(),
    },
  ]
}

function getChatFunctions() {
  return [
    buildChatFunction({
      name: 'onResult',
      description: 'The function to call when the result is ready',
      schema,
    }),
  ]
}
