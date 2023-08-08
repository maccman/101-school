import { z } from 'zod'

import { assertString } from '@/plugins/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { buildChatFunction, parseChatFunctionArgs } from '@/server/lib/open-ai/functions'
import { ChatMessage } from '@/server/lib/open-ai/types'

const schema = z.object({
  cip_code: z.string().describe("The course's CIP code"),
  cip_title: z.string().describe("The course's CIP title"),
})

export async function parseCourseCip(description: string) {
  const result = await fetchCompletion({
    messages: getChatMessages(description),
    functions: getChatFunctions(),
  })

  // Sometimes GPT-4 just returns the result as a string
  const resultJson = result.function_call?.arguments || result.content

  assertString(resultJson, 'Expected result to be a string')

  const resultParsed = parseChatFunctionArgs(resultJson, schema)

  return {
    cipCode: resultParsed.cip_code,
    cipTitle: resultParsed.cip_title,
  }
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
      Parse the Classification of Instructional Programs (CIP) of the university course described below. If you don't know make your best guess.
    
      ${description}
  `.trim(),
    },
  ]
}

function getChatFunctions() {
  return [
    buildChatFunction({
      name: 'onResult',
      description: 'The function to call with the result',
      schema,
    }),
  ]
}
