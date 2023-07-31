import { z } from 'zod'

import { assert } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { buildChatFunction, parseChatFunctionArgs } from '@/server/lib/open-ai/functions'
import { ChatMessage } from '@/server/lib/open-ai/types'

const schema = z.object({
  outline: z.string().describe('The course outline and objectives'),
  targeting: z.string().describe('The target audience'),
  headline: z.string().describe('A short one-liner description of the course'),
  modules: z.array(
    z.object({
      week: z.number().describe("The section's week number"),
      title: z.string().describe("The section's title"),
      units: z.array(
        z.object({
          number: z.number().describe("The unit's number"),
          title: z.string().describe('The lecture title'),
        }),
      ),
    }),
  ),
  recommendedReading: z.array(
    z.object({
      title: z.string().describe('The recommended reading title'),
    }),
  ),
})

type Parsed = z.infer<typeof schema>

export async function parseCourse(courseBody: string): Promise<Parsed> {
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
      content:
        'You are a parsing bot. You are given a course description and you have to parse it into a course outline.',
    },
    {
      role: 'user',
      content: `
      Here's a course description:
    
      ${description}

      Parse it into sections.
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
