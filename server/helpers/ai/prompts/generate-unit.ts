import { getPrediction } from '@/server/lib/anthropic/completion'
import { ChatMessage } from '@/server/lib/anthropic/types'

import { generateModulePrompt } from './generate-module'

interface Params {
  courseDescription: string
  courseBody: string
  moduleBody: string
  moduleNumber: number
  unitNumber: number
}

interface Options {
  weekCount?: number
  targeting?: string
  language?: string
}

export function generateUnit(params: Params, options: Options = {}) {
  return getPrediction({
    messages: generatePrompt(params, options),
  })
}

function generatePrompt(
  { courseDescription, courseBody, moduleNumber, moduleBody, unitNumber }: Params,
  options: Options = {},
): ChatMessage[] {
  return [
    ...generateModulePrompt({ courseDescription, courseBody, moduleNumber }, options),
    {
      role: 'assistant',
      content: moduleBody,
    },
    {
      role: 'user',
      content: `Now generate module ${moduleNumber} unit ${unitNumber} of the course. Write a clear and comprehensive article covering all the information in the unit. Omit the module and unit numbers from the title.`,
    },
  ]
}
