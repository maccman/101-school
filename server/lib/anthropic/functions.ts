import { last } from 'lodash'
import { z } from 'zod'

import { CompletionOptions, getPredictedMessages } from './completion'
import { ChatMessage, Tool } from './types'
import { zodToFunctionParameters } from '../zod-fns'

export function buildTool<T>({
  name,
  description,
  schema,
}: {
  name: string
  description: string
  schema: z.ZodSchema<T>
}): Tool {
  return {
    name,
    description,
    input_schema: schema
      ? zodToFunctionParameters(schema)
      : {
          type: 'object',
          properties: {},
        },
  }
}

export async function getPredictionForTool<T>({
  toolName,
  toolDescription,
  schema,
  ...completionOptions
}: {
  toolName: string
  toolDescription: string
  schema: z.ZodSchema<T>
} & CompletionOptions): Promise<z.infer<typeof schema>> {
  const tools: Tool[] = [
    buildTool({
      name: toolName,
      description: toolDescription,
      schema,
    }),
  ]

  const response = await getPredictedMessages({ tools, ...completionOptions })

  const message = last(response.content)

  if (message?.type !== 'tool_use') {
    throw new Error('Expected a tool use message')
  }

  if (message.name !== toolName) {
    throw new Error(`Expected tool name to be ${toolName}, got ${message.name}`)
  }

  return schema.parse(message.input)
}

/*
 * Fetch completion for a single tool (onResult) and return the parsed parameters
 */
export async function getPredictionForToolResult<T>({
  messages,
  schema,
}: {
  messages: ChatMessage[]
  schema: z.ZodSchema<T>
}) {
  return await getPredictionForTool({
    toolName: 'onResult',
    toolDescription: 'The function to call when the result is ready',
    schema,
    messages,
  })
}
