import { assert, assertString } from '@/lib/assert'
import { generateCoursePrompt } from '@/server/helpers/ai/prompts/generate-course'
import { withAuth } from '@/server/helpers/auth'

import { AnthropicPredictDecoderStream } from './helpers/predict-decoder-stream'
import { SSEDecoderStream } from './helpers/sse-decoder-stream'
import { AnthropicSSEJSONDecoderStream } from './helpers/sse-json-decoder-stream'
import { TextDecoderStream } from './helpers/text-decoder-stream'
import { PredictResponse } from './helpers/types'
import { getStreamingPredictedMessages } from '@/server/lib/anthropic/completion'

export const runtime = 'edge'

async function generateOutline(req: Request) {
  const { description, weekCount = 13, language = 'English' } = await req.json()

  assertString(description, 'description must be a string')

  const responseMessages = generateCoursePrompt(description, { weekCount, language })

  const response = await getStreamingPredictedMessages({
    messages: responseMessages,
  })

  if (!response.ok) {
    throw new Error('Opus API error: ' + (await response.text()))
  }

  assert(response.body, 'response.body must be defined')

  const stream = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new SSEDecoderStream())
    .pipeThrough(new AnthropicSSEJSONDecoderStream<PredictResponse>())
    .pipeThrough(new AnthropicPredictDecoderStream())
    .pipeThrough(new TextEncoderStream())

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}

export const POST = withAuth(generateOutline)
