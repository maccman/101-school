'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { CIP_CATEGORIES } from '@/lib/cip-category'
import { cn } from '@/lib/utils'

const categoryLinks = CIP_CATEGORIES.map((category) => ({
  href: `/courses/category/${category.slug}`,
  title: category.title,
}))

const links = [
  {
    href: '/courses',
    title: 'Featured Courses',
  },
  ...categoryLinks,
]

export function CoursesNav() {
  let pathname = usePathname()

  if (pathname === '/') {
    pathname = '/courses'
  }

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-grow flex-shrink-0',
      )}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'lg:justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
