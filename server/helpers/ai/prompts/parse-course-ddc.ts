import { z } from 'zod'

import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { buildChatFunction, parseChatFunctionArgs } from '@/server/lib/open-ai/functions'
import { ChatMessage } from '@/server/lib/open-ai/types'

const schema = z.object({
  ddc_code: z
    .string()
    .describe("The course's Dewey Decimal Classification code (.e.g. 003)"),
  ddc_title: z
    .string()
    .describe("The course's Dewey Decimal Classification title (.e.g. Systems)"),
})

export async function parseCourseDeweyDecimalClass(description: string) {
  const result = await fetchCompletion({
    messages: getChatMessages(description),
    functions: getChatFunctions(),
  })

  // Sometimes GPT-4 just returns the result as a string
  const resultJson = result.function_call?.arguments || result.content

  assertString(resultJson, 'Expected result to be a string')

  const resultParsed = parseChatFunctionArgs(resultJson, schema)

  return {
    ddcCode: resultParsed.ddc_code,
    ddcTitle: resultParsed.ddc_title,
  }
}

function getChatMessages(description: string): ChatMessage[] {
  return [
    {
      role: 'system',
      // content: 'You are a helpful and accurate parsing bot. You parse and process data.',
      content: 'You are a helpful and accurate assistant.',
    },
    {
      role: 'user',
      content: `
      Parse the Dewey Decimal class (DDC) of the university course described below. If you don't know make your best guess.
    
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
