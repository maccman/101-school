import { getPrediction } from '@/server/lib/anthropic/completion'
import { ChatMessage } from '@/server/lib/anthropic/types'

import { generateCoursePrompt } from './generate-course'

interface Params {
  courseDescription: string
  courseBody: string
  moduleNumber: number
}

interface Options {
  weekCount?: number
  targeting?: string
  language?: string
}

export function generateModule(params: Params, options: Options = {}) {
  return getPrediction({
    messages: generateModulePrompt(params, options),
  })
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
      content: `Now expand on module ${moduleNumber} of the course. Write a clear and comprehensive overview list of the information covered in the module.`,
    },
  ]
}
