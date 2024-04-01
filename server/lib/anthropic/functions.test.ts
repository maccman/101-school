import { z } from 'zod'

import {
  extractFunctionCalls,
  fetchFunctionCompletion,
  fetchWithTools,
  zodToFunctionParameters,
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

  it('should extract function call from example', () => {
    const example =
      'Let me see if I can determine the most likely CIP code for this computer science fundamentals course:\n<function_calls>\n<invoke>\n<tool_name>onResult</tool_name>\n<parameters>\n<cip_code>11.0701</cip_code>\n<cip_title>Computer Science</cip_title>\n</parameters>\n</invoke>\n'

    const result = extractFunctionCalls(example)

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "parameters": {
            "cip_code": 11.0701,
            "cip_title": "Computer Science",
          },
          "tool_name": "onResult",
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

describe('zodToFunctionParameters', () => {
  it('should convert Zod schema to function parameters', () => {
    const schema = z.object({
      name: z.string().describe('The name of the user'),
      age: z.number().describe('The age of the user'),
      isAdmin: z.boolean().describe('Whether the user is an admin'),
    })

    const parameters = zodToFunctionParameters(schema)

    expect(parameters).toEqual([
      {
        name: 'name',
        description: 'The name of the user',
        type: 'string',
      },
      {
        name: 'age',
        description: 'The age of the user',
        type: 'int',
      },
      {
        name: 'isAdmin',
        description: 'Whether the user is an admin',
        type: 'bool',
      },
    ])
  })

  it('should handle optional descriptions', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })

    const parameters = zodToFunctionParameters(schema)

    expect(parameters).toEqual([
      {
        name: 'name',
        description: '',
        type: 'string',
      },
      {
        name: 'age',
        description: '',
        type: 'int',
      },
    ])
  })

  it('should throw an error for unsupported Zod types', () => {
    const schema = z.object({
      date: z.date(),
    })

    expect(() => zodToFunctionParameters(schema)).toThrowError(
      'Unsupported Zod type: ZodDate',
    )
  })
})
