import { z } from 'zod'

import { assert } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { buildChatFunction, parseChatFunctionArgs } from '@/server/lib/open-ai/functions'
import { ChatMessage } from '@/server/lib/open-ai/types'

const schema = z.object({
  wikipediaLinks: z.array(
    z.object({
      url: z.string().url().describe('The link URL'),
    }),
  ),
})

export async function generateWikipediaUrls(body: string): Promise<string[]> {
  const result = await fetchCompletion({
    messages: generatePrompt(body),
    functions: getChatFunctions(),
  })

  assert(result.function_call, 'No function call found')

  const parsed = parseChatFunctionArgs(result.function_call.arguments, schema)

  return parsed.wikipediaLinks.map((link) => link.url)
}

function generatePrompt(body: string): ChatMessage[] {
  return [
    {
      role: 'system',
      content:
        'You are an advanced and accurate search bot that can find relevant Wikipedia links for any body of text',
    },
    {
      role: 'user',
      content: `
      List up to five relevant Wikipedia links for this body of text. Put the most relevant links first:

      ${body}
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
