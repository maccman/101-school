'use client'

import { debounce } from 'lodash'
import { Box, Boxes } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SearchResult } from '@/app/types'
import { buttonVariants } from '@/components/ui/button'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog as UiCommandDialog,
} from '@/components/ui/command'
import { useEventListener } from '@/lib/use-event-listener'
import { useKeyboardShortcut } from '@/lib/use-keyboard-shortcut'
import { cn } from '@/lib/utils'

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

  const onSelectSearchResult = ({ path }: { path: string }) => {
    setOpen(false)
    router.push(path)
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
            <CommandItem
              value="courses"
              onSelect={() =>
                onSelectSearchResult({
                  path: '/courses',
                })
              }
            >
              <Boxes className="mr-2 h-4 w-4" />
              <span>All courses</span>
            </CommandItem>

            <CommandItem
              value="courses-new"
              onSelect={() =>
                onSelectSearchResult({
                  path: '/courses/new',
                })
              }
            >
              <Boxes className="mr-2 h-4 w-4" />
              <span>Generate a new course</span>
            </CommandItem>
          </CommandGroup>
        )}

        {query && noResults && (
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center p-10">
              <div className="flex flex-col gap-5">
                <span>No results found.</span>
                <Link
                  href="/courses/new"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  Generate a new course with AI...
                </Link>
              </div>
            </div>
          </CommandEmpty>
        )}

        {topResults.length > 0 && (
          <CommandGroup heading="Top matches">
            {topResults.map((result) => (
              <CommandItem
                key={result.id}
                value={`${result.type}-${result.id}`}
                onSelect={() => onSelectSearchResult(result)}
              >
                <Box className="mr-2 h-4 w-4" />
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
                <Box className="mr-2 h-4 w-4" />
                <span>{result.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!query && allResults.length > 0 && (
          <CommandGroup heading="Units & courses">
            {allResults.map((result) => (
              <CommandItem
                key={result.id}
                value={`${result.type}-${result.id}`}
                onSelect={() => onSelectSearchResult(result)}
              >
                <Box className="mr-2 h-4 w-4" />
                <span>{result.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </UiCommandDialog>
  )
}
