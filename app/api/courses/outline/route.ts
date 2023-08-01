import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { generateCoursePrompt } from '@/server/helpers/ai/prompts/generate-course'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

async function generateOutline(req: Request) {
  const { description } = await req.json()

  if (typeof description !== 'string') {
    return error('Invalid description')
  }

  const messages = generateCoursePrompt(description)

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

export const POST = withAuth(generateOutline)
