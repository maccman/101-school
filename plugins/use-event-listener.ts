import { useEffect } from 'react'

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener, options)

    return () => {
      window.removeEventListener(type, listener, options)
    }
  }, [listener, options, type])
}

export function triggerEvent<K extends keyof WindowEventMap>(
  type: K,
  options?: CustomEventInit<WindowEventMap[K]>,
) {
  window.dispatchEvent(new CustomEvent(type, options))
}
