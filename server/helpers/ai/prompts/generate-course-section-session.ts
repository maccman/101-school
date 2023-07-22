import { assertString } from '@/lib/assert'
import { fetchCompletion } from '@/server/lib/open-ai'
import { ChatMessage } from '@/server/lib/open-ai/types'

import { generateCourseSectionPrompt } from './generate-course-section'

interface Params {
  courseDescription: string
  courseBody: string
  sectionBody: string
  sectionCount: number
  sessionCount: number
}

interface Options {
  weekCount?: number
  targeting?: string
}

export async function generateCourseSectionSession(
  params: Params,
  options: Options = {},
) {
  const message = await fetchCompletion({
    messages: generateCourseSectionSessionPrompt(params, options),
  })
  assertString(message.content)
  return message.content
}

function generateCourseSectionSessionPrompt(
  { courseDescription, courseBody, sectionCount, sectionBody, sessionCount }: Params,
  options: Options = {},
): ChatMessage[] {
  return [
    ...generateCourseSectionPrompt(
      { courseDescription, courseBody, sectionCount },
      options,
    ),
    {
      role: 'assistant',
      content: sectionBody,
    },
    {
      role: 'user',
      content: `Now teach module ${sectionCount} unit ${sessionCount} of the course. Write a clear and comprehensive article covering all the information in the unit.`,
    },
  ]
}
