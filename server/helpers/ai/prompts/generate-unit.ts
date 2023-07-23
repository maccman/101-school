import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { ChatMessage } from '@/server/lib/open-ai/types'

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
}

export async function generateUnit(params: Params, options: Options = {}) {
  const message = await fetchCompletion({
    messages: generatePrompt(params, options),
  })
  assertString(message.content)
  return message.content
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
