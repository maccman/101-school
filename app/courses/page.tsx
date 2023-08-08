import Link from 'next/link'
import { Suspense } from 'react'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { CoursesGrid } from './components/courses-grid'
import { CoursesSkeletonGrid } from './components/courses-skeleton-grid'

export default async function CoursesPage() {
  return (
    <HeaderLayout>
      <div className="p-5 flex-1 overflow-auto flex flex-col">
        <h1 className="text-lg font-semibold mb-10">
          What would you like to teach yourself?
        </h1>

        <Suspense fallback={<CoursesSkeletonGrid />}>
          <CoursesGrid />
        </Suspense>

        <footer className="my-8 flex justify-end">
          <Link href={'/courses/new'} className={cn(buttonVariants())}>
            Or generate your own course
          </Link>
        </footer>
      </div>
    </HeaderLayout>
  )
}
