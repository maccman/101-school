import { fetchCompletion } from './completion'
import { Message } from './types'

describe('fetchCompletion', () => {
  it('should fetch completion', async () => {


    const messages: Message[] = [
      {
        role: 'user',
        content: 'hello',
      },
    ]

    const result = await fetchCompletion({
      messages,
      temperature: 0.5,
      maxTokens: 1024,
    })

    expect(result).toMatchObject({
      content: [
        {
          text: "Hello! How can I assist you today?",
          type: "text",
        },
      ],
      id: expect.any(String),
      model: "claude-3-opus-20240229",
      role: "assistant",
      stop_reason: "end_turn",
      stop_sequence: null,
      type: "message",
      usage: {
        input_tokens: 8,
        output_tokens: 12,
      },
    })
  })
})
