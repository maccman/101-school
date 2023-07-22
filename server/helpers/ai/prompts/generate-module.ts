import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { ChatMessage } from '@/server/lib/open-ai/types'

import { generateCoursePrompt } from './generate-course'

interface Params {
  courseDescription: string
  courseBody: string
  moduleNumber: number
}

interface Options {
  weekCount?: number
  targeting?: string
}

export async function generateModule(params: Params, options: Options = {}) {
  const message = await fetchCompletion({
    messages: generateModulePrompt(params, options),
  })
  assertString(message.content)
  return message.content
}

export function generateModulePrompt(
  { courseDescription, courseBody, moduleNumber }: Params,
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
      content: `Now teach module ${moduleNumber} of the course.`,
    },
  ]
}
