'use client'

import { SearchIcon } from 'lucide-react'

import { triggerEvent } from '@/lib/use-event-listener'
import { cn } from '@/lib/utils'

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SearchInput({ className, ...props }: SearchProps) {
  return (
    <div
      className={cn(
        `w-full shadow-sm text-muted-foreground hover:bg-accent transition-colors
      rounded-md border border-input bg-background px-2 py-1 md:w-[200px] lg:w-[300px] flex space-x-2 items-center relative cursor-text justify-center text-sm`,
        className,
      )}
      onClick={() => triggerEvent('command.dialog.open')}
      {...props}
    >
      <SearchIcon className="w-3.5 h-3.5 absolute left-2 text-muted-foreground/90" />
      <span>Search...</span>
      <kbd className="inline-flex rounded px-2 font-sans text-xs font-medium uppercase absolute right-2">
        ⌘K
      </kbd>
    </div>
  )
}
