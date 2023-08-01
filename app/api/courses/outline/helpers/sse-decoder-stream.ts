/* eslint-disable no-constant-condition */
export class SSEDecoderStream extends TransformStream {
  constructor() {
    const delimiter = '\n\n'

    let buffer = ''

    super({
      transform: (chunk: string, controller) => {
        // Server sent events come in with a colon separating the type from the data
        // and two newlines separating the data from the next event. Sometimes they are
        // partial, so we need to buffer them

        buffer += chunk

        while (true) {
          const index = buffer.indexOf(delimiter)

          if (index === -1) {
            break
          }

          // Read chunk until \n\n
          const event = buffer.slice(0, index)
          controller.enqueue(event)

          // Reset buffer for the next event
          buffer = buffer.slice(index + delimiter.length)
        }
      },
    })
  }
}
