import { z } from 'zod'

import { getPredictionForToolResult } from '@/server/lib/anthropic/functions'
import { ChatMessage } from '@/server/lib/anthropic/types'

const schema = z.object({
  cip_code: z.coerce.string().describe("The course's CIP code"),
  cip_title: z.string().describe("The course's CIP title"),
})

export async function parseCourseCip(description: string) {
  const result = await getPredictionForToolResult({
    messages: getChatMessages(description),
    schema,
  })

  return {
    cipCode: result.cip_code,
    cipTitle: result.cip_title,
  }
}

function getChatMessages(description: string): ChatMessage[] {
  return [
    {
      role: 'user',
      content: `You are a helpful and accurate assistant.
      Parse the Classification of Instructional Programs (CIP) of the university course described below. If you don't know make your best guess.
    
      Course description: ${description}
  `.trim(),
    },
  ]
}
