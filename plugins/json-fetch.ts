interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
}

interface FetchError {
  type: string
  message: string
}

export async function jsonFetch<R>(
  url: string,
  { method, data }: FetchOptions = {},
): Promise<{
  error: FetchError | undefined
  response: R
}> {
  const response = await fetch(url, {
    method,
    headers: {
      ...(data ? { 'Content-Type': 'application/json' } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  })

  let error: FetchError | undefined

  let json: any | undefined

  try {
    json = await response.json()
  } catch (error) {
    console.error(error)
  }

  if (!response.ok || !json) {
    error = json?.error ?? {
      type: 'unknown',
      message: 'Something went wrong',
    }
  }

  return {
    error,
    response: json,
  }
}
