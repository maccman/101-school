import { PredictResponse } from './types'

export class AnthropicPredictDecoderStream extends TransformStream {
  constructor() {
    super({
      transform: (chunk: PredictResponse, controller) => {
        if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
          controller.enqueue(chunk.delta.text)
          return
        }

        if (chunk.type === 'message_stop') {
          controller.terminate()
          return
        }
      },
    })
  }
}
