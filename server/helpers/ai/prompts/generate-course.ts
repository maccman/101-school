import { getPrediction } from '@/server/lib/anthropic/completion'
import { ChatMessage } from '@/server/lib/anthropic/types'

interface Options {
  weekCount?: number
  targeting?: string
  language?: string
}

export async function generateCourse(
  description: string,
  options: Options = {},
): Promise<string> {
  return getPrediction({
    messages: generateCoursePrompt(description, options),
    temperature: 0.1,
  })
}

export function generateCoursePrompt(
  description: string,
  {
    weekCount = 13,
    targeting = 'adults late in their career',
    language = 'English',
  }: Options = {},
): ChatMessage[] {
  return [
    {
      role: 'user',
      content: `
      You are a university course generator. You are given a description of a course and you have to generate a course outline. Format output as Markdown.

      Design a university course outline:
      
      - Subject matter: ${description}
      - Target audience: ${targeting}
      - Number of weeks: ${weekCount}
      - Outline and course language: ${language}

      Each week will cover one module.
      Each module will be split into three to four units.
      The course is entirely virtual and online.
      There will be no exams so do not include those in the outline.

      Put a recommended reading list at the end of the outline.
    `.trim(),
    },
  ]
}
