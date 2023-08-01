import { useRef } from 'react'

export function useAbortController() {
  const abortRef = useRef<AbortController | null>(null)

  function createSignal() {
    abort()
    abortRef.current = new AbortController()
    return abortRef.current?.signal
  }

  function abort() {
    abortRef.current?.abort()
  }

  return { createSignal, abort }
}
