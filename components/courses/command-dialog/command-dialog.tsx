'use client'

import { debounce } from 'lodash'
import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SearchResult } from '@/app/types'
import {
  CommandDialog as UiCommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useEventListener } from '@/lib/use-event-listener'
import { useKeyboardShortcut } from '@/lib/use-keyboard-shortcut'

import { FetchResultsOptions, fetchResults, sortSearchResults } from './utils'

export function CourseCommandDialog({ courseId }: { courseId?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [queryResults, setQueryResults] = useState<SearchResult[]>([])
  const [allResults, setAllResults] = useState<SearchResult[]>([])
  const controllerRef = useRef<AbortController | undefined>()

  useKeyboardShortcut('k', () => setOpen((open) => !open), { metaKey: true })
  useKeyboardShortcut('Escape', () => setOpen(false))

  useEventListener('command.dialog.open', () => setOpen(true))

  const fetchAndSetQueryResults = useCallback(
    (options: FetchResultsOptions) => fetchResults(options).then(setQueryResults),
    [],
  )

  const debouncedFetchAndSetQueryResults = useMemo(
    () => debounce(fetchAndSetQueryResults, 200),
    [fetchAndSetQueryResults],
  )

  const abortAndFetchAndSetQueryResults = useCallback(
    (options: FetchResultsOptions) => {
      controllerRef.current?.abort()
      const { signal } = (controllerRef.current = new AbortController())

      debouncedFetchAndSetQueryResults({ ...options, signal })
    },
    [debouncedFetchAndSetQueryResults],
  )

  useEffect(() => {
    if (open && allResults.length === 0) {
      fetchResults({ courseId }).then(setAllResults)
    }
  }, [allResults.length, courseId, open])

  useEffect(() => {
    if (query) {
      abortAndFetchAndSetQueryResults({ courseId, query })
    } else {
      setQueryResults([])
    }
  }, [abortAndFetchAndSetQueryResults, courseId, query])

  const lowerQuery = query.toLowerCase()

  // Top results match client-side by title
  const topResults = useMemo(
    () =>
      lowerQuery
        ? allResults
            .filter((result) => result.title.toLowerCase().includes(lowerQuery))
            .sort(sortSearchResults)
        : [],
    [allResults, lowerQuery],
  )

  // Filter other results to exclude top results
  // Sort results, put courses last
  const otherResults = useMemo(
    () =>
      queryResults
        .filter((result) => !topResults.some((topResult) => topResult.id === result.id))
        .sort(sortSearchResults),
    [queryResults, topResults],
  )

  const noResults = topResults.length === 0 && otherResults.length === 0

  const onSelectSearchResult = (result: SearchResult) => {
    setOpen(false)
    router.push(result.path)
  }

  return (
    <UiCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={query}
        onValueChange={setQuery}
      />
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
            {topResults.map((result) => (
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

        {!query && (
          <CommandGroup heading="All results">
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
