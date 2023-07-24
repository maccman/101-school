'use client'

import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { SearchResult } from '@/app/types'
import {
  CommandDialog as UiCommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useKeyboardShortcut } from '@/lib/use-keyboard-shortcut'

export function CourseCommandDialog({ courseId }: { courseId?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [allResults, setAllResults] = useState<SearchResult[]>([])

  useKeyboardShortcut('k', () => setOpen((open) => !open), { metaKey: true })
  useKeyboardShortcut('Escape', () => setOpen(false))

  useEffect(() => {
    if (open && allResults.length === 0) {
      fetchResults({ courseId }).then(setAllResults)
    }
  }, [allResults.length, courseId, open])

  useEffect(() => {
    if (query) {
      fetchResults({ courseId, query }).then(setResults)
    } else {
      setResults([])
    }
  }, [courseId, query])

  // Top results match client-side by title
  const topResults = useMemo(
    () =>
      query
        ? allResults
            .filter((result) => result.title.toLowerCase().includes(query))
            .sort(sortSearchResults)
        : [],
    [allResults, query],
  )

  // Filter other results to exclude top results
  // Sort results, put courses last
  const otherResults = useMemo(
    () =>
      results
        .filter((result) => !topResults.some((topResult) => topResult.id === result.id))
        .sort(sortSearchResults),
    [results, topResults],
  )

  const noResults = topResults.length === 0 && otherResults.length === 0

  const onSelectSearchResult = (result: SearchResult) => {
    setOpen(false)
    router.push(result.path)
  }

  return (
    <UiCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." onValueChange={setQuery} />
      <CommandList>
        {!query && (
          <CommandGroup heading="Suggestions">
            <CommandItem value="courses">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Courses</span>
            </CommandItem>
          </CommandGroup>
        )}

        {query && noResults && <CommandEmpty>No results found.</CommandEmpty>}

        {topResults.length > 0 && (
          <CommandGroup heading="Top matches">
            {otherResults.map((result) => (
              <CommandItem
                key={result.id}
                value={`${result.type}-${result.id}`}
                onSelect={() => onSelectSearchResult(result)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>{result.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {otherResults.length > 0 && (
          <CommandGroup heading="Other matches">
            {otherResults.map((result) => (
              <CommandItem
                key={result.id}
                value={`${result.type}-${result.id}`}
                onSelect={() => onSelectSearchResult(result)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>{result.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </UiCommandDialog>
  )
}

async function fetchResults({
  courseId,
  query = '',
}: {
  courseId?: string
  query?: string
}): Promise<SearchResult[]> {
  const params = new URLSearchParams()

  if (courseId) {
    params.set('courseId', courseId)
  }

  if (query) {
    params.set('q', query)
  }

  const response = await fetch(`/api/search?${params.toString()}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

function sortSearchResults(a: SearchResult, b: SearchResult) {
  if (a.type === 'course' && b.type === 'unit') {
    return 1
  }

  if (a.type === 'unit' && b.type === 'course') {
    return -1
  }

  return 0
}
