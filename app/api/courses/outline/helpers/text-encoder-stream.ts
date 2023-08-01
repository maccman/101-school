// Shim taken from:
// https://developer.mozilla.org/en-US/docs/Web/API/TransformStream

const tes: any = {
  start() {
    this.encoder = new TextEncoder()
  },
  transform(chunk: any, controller: any) {
    controller.enqueue(this.encoder.encode(chunk))
  },
}

const _jstes_wm = new WeakMap() /* info holder */

export class TextEncoderStream extends TransformStream {
  constructor() {
    const transform = { ...tes }

    super(transform)
    _jstes_wm.set(this, transform)
  }

  get encoding() {
    return _jstes_wm.get(this).encoder.encoding
  }
}
