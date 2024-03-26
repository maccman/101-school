import { z } from 'zod'

import { fetchSingleFunctionCompletion } from '@/server/lib/anthropic/functions'
import { ChatMessage } from '@/server/lib/anthropic/types'

const schema = z.object({
  ddc_code: z
    .string()
    .describe("The course's Dewey Decimal Classification code (.e.g. 003)"),
  ddc_title: z
    .string()
    .describe("The course's Dewey Decimal Classification title (.e.g. Systems)"),
})

export async function parseCourseDeweyDecimalClass(description: string) {
  const result = await fetchSingleFunctionCompletion({
    messages: getChatMessages(description),
    schema,
  })

  return {
    ddcCode: result.ddc_code,
    ddcTitle: result.ddc_title,
  }
}

function getChatMessages(description: string): ChatMessage[] {
  return [
    {
      role: 'user',
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
