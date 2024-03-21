import { extractFunctionCalls, fetchFunctionCalls } from './functions'

describe('fetchFunctionCalls', () => {
  it('should fetch function calls', async () => {
    const result = await fetchFunctionCalls({
      tools: [
        {
          tool_name: 'calculator',
          parameters: [
            {
              name: 'expression',
              description: 'The expression to evaluate',
              type: 'string',
            },
          ],
          description: 'Evaluate a mathematical expression',
        },
      ],
      messages: [
        {
          role: 'user',
          content: 'Add 2 and 2',
        },
      ],
      temperature: 0.5,
      maxTokens: 1024,
    })

    expect(result).toEqual(
      expect.objectContaining({
        functionCalls: [
          {
            parameters: {
              expression: '2 + 2',
            },
            tool_name: 'calculator',
          },
        ],
        response: expect.objectContaining({
          content: expect.arrayContaining([
            expect.objectContaining({
              text: expect.any(String),
              type: 'text',
            }),
          ]),
          model: 'claude-3-opus-20240229',
          role: 'assistant',
          stop_reason: 'stop_sequence',
          stop_sequence: '</function_calls>',
          type: 'message',
          usage: expect.objectContaining({
            input_tokens: expect.any(Number),
            output_tokens: expect.any(Number),
          }),
        }),
      }),
    )
  })
})

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
