import { z } from 'zod'

import { getPredictionForToolResult } from '@/server/lib/anthropic/functions'
import { ChatMessage } from '@/server/lib/anthropic/types'

const schema = z.object({
  wikipediaLinks: z.array(
    z.object({
      url: z.string().url().describe('The link URL'),
    }),
  ),
})

export async function generateWikipediaUrls(body: string): Promise<string[]> {
  const result = await getPredictionForToolResult({
    messages: generatePrompt(body),
    schema,
  })

  return result.wikipediaLinks.map((link) => link.url)
}

function generatePrompt(body: string): ChatMessage[] {
  return [
    {
      role: 'user',
      content:
        `You are an advanced and accurate search bot that can find relevant Wikipedia links for any body of text',

        List up to five relevant Wikipedia links for this body of text. Put the most relevant links first:

      ${body}
  `.trim(),
    },
  ]
}
