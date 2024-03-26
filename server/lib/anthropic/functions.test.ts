import { z } from 'zod'

import {
  extractFunctionCalls,
  fetchFunctionCompletion,
  fetchWithTools,
} from './functions'
import { ChatMessage, Tool } from './types'

describe('extractFunctionCalls', () => {
  it('should extract function calls', () => {
    const result = extractFunctionCalls(
      'Here is how we can add 2 and 2:\n' +
        '\n' +
        '<function_calls>\n' +
        '<invoke>\n' +
        '<tool_name>calculator</tool_name>\n' +
        '<parameters>\n' +
        '<expression>2 + 2</expression>\n' +
        '</parameters>\n' +
        '</invoke>\n',
    )

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "parameters": {
            "expression": "2 + 2",
          },
          "tool_name": "calculator",
        },
      ]
    `)
  })

  it('should extract multiple function calls', () => {
    const result = extractFunctionCalls(
      'Here is how we can add 2 and 2:\n' +
        '\n' +
        '<function_calls>\n' +
        '<invoke>\n' +
        '<tool_name>calculator</tool_name>\n' +
        '<parameters>\n' +
        '<expression>2 + 2</expression>\n' +
        '</parameters>\n' +
        '</invoke>\n' +
        '<invoke>\n' +
        '<tool_name>calculator</tool_name>\n' +
        '<parameters>\n' +
        '<expression>3 + 3</expression>\n' +
        '</parameters>\n' +
        '</invoke>\n',
    )

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "parameters": {
            "expression": "2 + 2",
          },
          "tool_name": "calculator",
        },
        {
          "parameters": {
            "expression": "3 + 3",
          },
          "tool_name": "calculator",
        },
      ]
    `)
  })
})

describe('fetchWithTools', () => {
  it('returns a valid response', async () => {
    const tools: Tool[] = [
      {
        tool_name: 'calculator',
        description: 'Calculator for basic arithmetic',
        parameters: [
          { name: 'operand1', type: 'int', description: 'First operand' },
          { name: 'operand2', type: 'int', description: 'Second operand' },
          { name: 'operator', type: 'string', description: 'Arithmetic operator' },
        ],
      },
    ]

    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: 'Calculate 2 + 2',
      },
    ]

    const response = await fetchWithTools({ tools, messages })

    expect(response).toBeDefined()

    expect(response.content).toHaveLength(1)
    expect(response.content[0].type).toBe('text')
    expect(typeof response.content[0].text).toBe('string')
    expect(response.content[0].text).toContain('<function_calls>')
  })
})

test('fetchFunctionCompletion calls fetchCompletion with the correct arguments and returns the parsed parameters', async () => {
  const schema = z.object({
    a: z.number(),
    b: z.number(),
  })

  const result = await fetchFunctionCompletion({
    toolName: 'calculate',
    toolDescription: 'Adds two numbers',
    schema,
    messages: [
      {
        role: 'user',
        content: 'Calculate 1 + 2',
      },
    ],
  })

  expect(result.parameters).toEqual({
    a: 1,
    b: 2,
  })
})
