// Shim taken from:
// https://developer.mozilla.org/en-US/docs/Web/API/TransformStream

const tds: any = {
  start() {
    this.decoder = new TextDecoder(this.encoding)
  },
  transform(chunk: any, controller: any) {
    controller.enqueue(this.decoder.decode(chunk, { stream: true }))
  },
}

const _jstds_wm = new WeakMap() /* info holder */

export class TextDecoderStream extends TransformStream {
  constructor(encoding = 'utf-8', { ...options } = {}) {
    const t = { ...tds, encoding, options }

    super(t)
    _jstds_wm.set(this, t)
  }

  get encoding() {
    return _jstds_wm.get(this).decoder.encoding
  }

  get fatal() {
    return _jstds_wm.get(this).decoder.fatal
  }

  get ignoreBOM() {
    return _jstds_wm.get(this).decoder.ignoreBOM
  }
}
