export class SSEJSONDecoderStream<T> extends TransformStream {
  constructor() {
    super({
      transform: (chunk: string, controller) => {
        const colonIndex = chunk.indexOf(':')
        const type = chunk.slice(0, colonIndex)
        const data = chunk.slice(colonIndex + 1).trim()

        if (type !== 'data') {
          return
        }

        if (data === '[DONE]') {
          controller.terminate()
          return
        }

        try {
          const json = JSON.parse(data) as T
          controller.enqueue(json)
        } catch (error) {
          throw new Error('Error parsing JSON: ' + data + ' ' + error)
        }
      },
    })
  }
}
