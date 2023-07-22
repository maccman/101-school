import { z } from 'zod'

import { ChatFunction } from './types'
import { zodToFunctionParameters } from '../zod-fns'

export function buildChatFunction({
  name,
  description,
  schema,
}: {
  name: string
  description: string
  schema: z.AnyZodObject
}): ChatFunction {
  return {
    name,
    description,
    parameters: schema
      ? zodToFunctionParameters(schema)
      : {
          type: 'object',
          properties: {},
        },
  }
}

export function parseChatFunctionArgs<T extends z.AnyZodObject>(
  args: string,
  schema: T,
): z.infer<T> {
  const parsed = JSON.parse(args)
  return schema.parse(parsed)
}
