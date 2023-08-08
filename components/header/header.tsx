import { Box } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { cn } from '@/lib/utils'

import { SearchButton } from './search-button'
import { SearchInput } from './search-input'
import { ThemeButton } from './theme-button'
import { UserNav } from './user-nav/user-nav'
import { CourseCommandDialog } from '../courses/command-dialog'
import { buttonVariants } from '../ui/button'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  courseId?: string
}

export function Header({ className, courseId }: HeaderProps) {
  return (
    <header
      className={cn(
        'border-b px-2 py-1 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl flex',
        className,
      )}
    >
      <div className="flex items-center">
        <Link href={'/'} className="flex items-center px-3 py-2 group">
          <Box className="mr-2 h-4 w-4 group-hover:text-green-500 transition-colors duration-100" />
          <span className="font-bold text-sm">101.school</span>
        </Link>

        <div className="flex space-x-4 ml-6 items-center">
          <Link
            href="/courses"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'px-3 py-1.5 flex-none h-fit',
            )}
          >
            Courses
          </Link>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'px-3 py-1.5 flex-none h-fit',
            )}
          >
            About
          </Link>

          <SearchButton className="md:hidden" />
        </div>
      </div>

      <div className="items-center justify-center hidden md:flex flex-1">
        <SearchInput />
      </div>

      <div className="flex-1 md:hidden" />

      <div className="flex space-x-5 items-center px-2 justify-end">
        <Link
          href="/courses/new"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hidden md:inline-flex px-3 py-1.5 flex-none h-fit',
          )}
        >
          Generate a course with AI...
        </Link>

        <ThemeButton />

        <Suspense fallback={<div className="h-7 w-7 rounded-full bg-muted" />}>
          <UserNav />
        </Suspense>
      </div>

      <CourseCommandDialog courseId={courseId} />
    </header>
  )
}
