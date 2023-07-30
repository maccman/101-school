import { SearchResult } from '@/app/types'

export interface FetchResultsOptions {
  courseId?: string
  query?: string
  signal?: AbortSignal
}

export async function fetchResults({
  courseId,
  query = '',
  signal,
}: FetchResultsOptions): Promise<SearchResult[]> {
  const params = new URLSearchParams()

  if (courseId) {
    params.set('courseId', courseId)
  }

  if (query) {
    params.set('q', query)
  }

  const response = await fetch(`/api/search?${params.toString()}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export function sortSearchResults(a: SearchResult, b: SearchResult) {
  if (a.type === 'course' && b.type === 'unit') {
    return 1
  }

  if (a.type === 'unit' && b.type === 'course') {
    return -1
  }

  return 0
}
