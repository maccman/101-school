'use client'

import { SearchIcon } from 'lucide-react'

import { triggerEvent } from '@/lib/use-event-listener'

export function Search() {
  return (
    <div
      className="w-full shadow-sm text-muted-foreground hover:bg-accent transition-colors
      rounded-md border border-input bg-background px-2 py-1 md:w-[100px] lg:w-[300px] flex space-x-2 items-center relative cursor-text justify-center text-sm"
      onClick={() => triggerEvent('command.dialog.open')}
    >
      <SearchIcon className="w-3.5 h-3.5 absolute left-2 text-muted-foreground/90" />
      <span>Search...</span>
      <kbd className="inline-flex rounded px-2 font-sans text-xs font-medium uppercase absolute right-2">
        ⌘K
      </kbd>
    </div>
  )
}
