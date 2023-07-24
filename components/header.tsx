import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'border-b px-2 flex space-x-3 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl',
        className,
      )}
    >
      <Link href={'/'}>
        <span className="flex space-x-3 font-bold text-sm px-3 py-2">101.school</span>
      </Link>

      <div className="flex space-x-5">
        <Link href={'/courses'}>
          <Button variant="ghost" size={'sm'} className="w-full justify-start" asChild>
            <span>Courses</span>
          </Button>
        </Link>

        <Link href={'/about'}>
          <Button variant="ghost" size={'sm'} className="w-full justify-start" asChild>
            <span>About</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
