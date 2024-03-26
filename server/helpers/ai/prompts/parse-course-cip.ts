import { z } from 'zod'

import { fetchSingleFunctionCompletion } from '@/server/lib/anthropic/functions'
import { ChatMessage } from '@/server/lib/anthropic/types'

const schema = z.object({
  cip_code: z.string().describe("The course's CIP code"),
  cip_title: z.string().describe("The course's CIP title"),
})

export async function parseCourseCip(description: string) {
  const result = await fetchSingleFunctionCompletion({
    messages: getChatMessages(description),
    schema,
  })

  // Sometimes GPT-4 just returns the result as a string

  return {
    cipCode: result.cip_code,
    cipTitle: result.cip_title,
  }
}

function getChatMessages(description: string): ChatMessage[] {
  return [
    {
      role: 'user',
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
