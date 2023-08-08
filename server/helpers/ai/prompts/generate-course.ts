import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { ChatMessage } from '@/server/lib/open-ai/types'

interface Options {
  weekCount?: number
  targeting?: string
}

export async function generateCourse(
  description: string,
  options: Options = {},
): Promise<string> {
  const message = await fetchCompletion({
    messages: generateCoursePrompt(description, options),
    temperature: 0.1,
  })
  assertString(message.content)
  return message.content
}

export function generateCoursePrompt(
  description: string,
  { weekCount = 13, targeting = 'adults late in their career' }: Options = {},
): ChatMessage[] {
  return [
    {
      role: 'system',
      content:
        'You are a university course generator. You are given a description of a course and you have to generate a course outline. Format output as Markdown.',
    },
    {
      role: 'user',
      content: `
      Design a university course outline:
      
      - Subject matter: ${description}
      - Target audience: ${targeting}
      - Number of weeks: ${weekCount}

      Each week will cover one module.
      Each module will be split into three to four units.
      The course is entirely virtual and online.
      There will be no exams so do not include those in the outline.

      Put a recommended reading list at the end of the outline.
  `,
    },
  ]
}
