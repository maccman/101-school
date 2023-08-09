import Link from 'next/link'
import { Suspense } from 'react'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { CoursesGrid } from './courses-grid'
import { CoursesNav } from './courses-nav'
import { CoursesSkeletonGrid } from './courses-skeleton-grid'

interface CoursesLayout {
  categorySlug?: string
}

export async function CoursesLayout({ categorySlug }: CoursesLayout) {
  return (
    <HeaderLayout>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="space-y-0.5 flex-none px-10 pt-10">
          <h2 className="text-2xl font-bold tracking-tight">
            What would you like to teach yourself?
          </h2>
          <p className="text-muted-foreground">
            AI generated courses based on your interests.
          </p>
        </div>

        <Separator className="mt-6" />

        <div className="flex-1 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 overflow-hidden p-10">
          <aside className="lg:w-1/5 flex-col flex-none hidden lg:flex">
            <CoursesNav />

            <footer className="my-8 flex justify-center">
              <Link
                href="/courses/new"
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                Or generate your own course...
              </Link>
            </footer>
          </aside>

          <div className="flex-1 lg:max-w-8xl overflow-auto">
            <Suspense fallback={<CoursesSkeletonGrid />}>
              <CoursesGrid categorySlug={categorySlug} />
            </Suspense>
          </div>
        </div>
      </div>
    </HeaderLayout>
  )
}
