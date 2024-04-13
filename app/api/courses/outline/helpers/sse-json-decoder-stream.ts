export class AnthropicSSEJSONDecoderStream<T> extends TransformStream {
  constructor() {
    super({
      transform: (chunk: string, controller) => {
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line === '') {
            continue
          }

          const colonIndex = line.indexOf(':')
          const key = line.slice(0, colonIndex)
          const value = line.slice(colonIndex + 1).trim()

          if (key === 'event') {
            // We ignore events
            continue
          }

          if (key === 'data') {
            try {
              const json = JSON.parse(value) as T
              controller.enqueue(json)
              continue
            } catch (error) {
              throw new Error('Error parsing JSON: ' + value + ' ' + error)
            }
          }

          console.warn('Unknown key:', { key, value })
        }
      },
    })
  }
}
