import { useEffect, useState } from 'react'

export function useReadTextStream(stream: ReadableStream<string> | null) {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const [cancel, setCancel] = useState<(() => void) | null>(null)

  useEffect(() => {
    // Reset state if stream changes or get removed
    setText('')

    if (!stream) {
      return
    }

    if (stream.locked) {
      console.warn(`Cannot read from a locked stream`)
      return
    }

    const reader = stream.getReader()

    let readPromise: Promise<ReadableStreamReadResult<string>> | null = null
    let canceling = false
    let releasing = false

    async function read() {
      while (!canceling && !releasing) {
        readPromise = reader.read()
        const { value, done } = await readPromise

        if (canceling || releasing) {
          break
        }

        if (value) {
          setText((text) => text + value)
        }

        if (done) {
          await release()
          setDone(true)
          break
        }
      }
    }

    async function cancel() {
      canceling = true

      // A released reader cannot be canceled
      if (releasing) {
        return
      }

      // If cancel a reading reader, `reader.read()` will get rejected immediately
      if (readPromise) {
        await readPromise
      }

      if (releasing) {
        return
      }

      setCanceled(true)
      await reader.cancel()
    }

    async function release() {
      releasing = true

      // A reading reader cannot be released
      if (readPromise) {
        await readPromise
      }

      reader.releaseLock()
    }

    read()

    setCancel(() => cancel)

    return () => {
      release()
    }
  }, [stream])

  return { text, done, canceled, cancel }
}
