import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Search } from './search'
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
        'border-b px-2 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl grid grid-cols-3',
        className,
      )}
    >
      <div className="flex items-center">
        <Link href={'/'}>
          <span className="flex space-x-3 font-bold text-sm px-3 py-2">101.school</span>
        </Link>

        <div className="flex space-x-2 ml-6">
          <Link href="/courses" className={cn(buttonVariants({ variant: 'ghost' }))}>
            Courses
          </Link>

          <Link href="/about" className={cn(buttonVariants({ variant: 'ghost' }))}>
            About
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Search />
      </div>

      <div className="flex space-x-5 items-center px-2 justify-end">
        <Link href="/courses/new" className={cn(buttonVariants({ variant: 'ghost' }))}>
          Generate a course with AI...
        </Link>

        <UserNav />
      </div>

      <CourseCommandDialog courseId={courseId} />
    </header>
  )
}
