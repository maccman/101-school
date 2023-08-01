import { useState } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(false)

  async function withLoading(fn: () => Promise<void> | void) {
    setLoading(true)

    try {
      await fn()
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    withLoading,
    setLoading,
  }
}
