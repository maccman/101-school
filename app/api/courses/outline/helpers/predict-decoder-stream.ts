import { PredictResponse } from './types'

export class PredictDecoderStream extends TransformStream {
  constructor() {
    super({
      transform: (chunk: PredictResponse, controller) => {
        const firstChoice = (chunk.choices ?? [])[0]
        const text = firstChoice?.delta?.content ?? ''

        if (text) {
          controller.enqueue(text)
        }
      },
    })
  }
}
