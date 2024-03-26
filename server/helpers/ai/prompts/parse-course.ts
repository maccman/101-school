import { z } from 'zod'

import { fetchSingleFunctionCompletion } from '@/server/lib/anthropic/functions'
import { ChatMessage } from '@/server/lib/anthropic/types'

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
          number: z
            .number()
            .describe("The unit's number as a whole integer (1, 2, 3, etc)"),
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

interface ParseCourseOptions {
  language?: string
}

export async function parseCourse(
  courseBody: string,
  options: ParseCourseOptions = {},
): Promise<Parsed> {
  const result = await fetchSingleFunctionCompletion({
    messages: getChatMessages(courseBody, options),
    schema,
  })

  return result
}

function getChatMessages(
  description: string,
  { language = 'English' }: ParseCourseOptions,
): ChatMessage[] {
  return [
    {
      role: 'user',
      content:
        'You are a parsing bot. You are given a course description and you have to parse it into a course outline.',
    },
    {
      role: 'user',
      content: `
      Here's a course description:
    
      ${description}

      Parse it into sections. Use the ${language} language.
  `.trim(),
    },
  ]
}
