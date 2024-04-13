import { z } from 'zod'

import { getPredictionForTool, getPredictionForToolResult } from './functions'
import { ChatMessage } from './types'

describe('getPredictionForTool', () => {
  it(
    'returns a valid response',
    async () => {
      const schema = z.object({
        expression: z.string().describe('The arithmetic expression to evaluate'),
      })

      const response = await getPredictionForTool({
        toolName: 'calculator',
        toolDescription: 'Calculator for basic arithmetic',
        schema,
        messages: [
          {
            role: 'user',
            content: 'Calculate 2 + 2',
          },
        ],
      })

      expect(response).toBeDefined()
      expect(response.expression).toEqual('2 + 2')
    },
    { timeout: 10000 },
  )
})

describe('getPredictionForToolResult', () => {
  it(
    'should return parsed result when valid schema and messages are provided',
    async () => {
      // Define a test schema
      const testSchema = z.object({
        name: z.string(),
        age: z.number(),
      })

      // Define test messages
      const testMessages: ChatMessage[] = [
        {
          role: 'user',
          content: 'Users name is John Doe. User is 30.',
        },
      ]

      // Call the function with test schema and messages
      const result = await getPredictionForToolResult({
        messages: testMessages,
        schema: testSchema,
      })

      // Assert the result matches the expected schema
      expect(result).toEqual({
        name: 'John Doe',
        age: 30,
      })
    },
    { timeout: 10000 },
  )
})
