import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { ChatMessage } from '@/server/lib/open-ai/types'

import { generateCoursePrompt } from './generate-course'

interface Params {
  courseDescription: string
  courseBody: string
  sectionCount: number
}

interface Options {
  weekCount?: number
  targeting?: string
}

export async function generateCourseSection(params: Params, options: Options = {}) {
  const message = await fetchCompletion({
    messages: generateCourseSectionPrompt(params, options),
  })
  assertString(message.content)
  return message.content
}

export function generateCourseSectionPrompt(
  { courseDescription, courseBody, sectionCount }: Params,
  options: Options = {},
): ChatMessage[] {
  return [
    ...generateCoursePrompt(courseDescription, options),
    {
      role: 'assistant',
      content: courseBody,
    },
    {
      role: 'user',
      content: `Now teach module ${sectionCount} of the course.`,
    },
  ]
}
