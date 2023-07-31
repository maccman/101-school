import { Suspense } from 'react'

import { HeaderLayout } from '@/components/layouts/header-layout'

import { CoursesGrid } from './components/courses-grid'
import { CoursesSkeletonGrid } from './components/courses-skeleton-grid'

export default async function CoursesPage() {
  return (
    <HeaderLayout>
      <div className="p-5 flex-1 overflow-auto flex flex-col">
        <h1 className="text-lg font-semibold mb-3">
          What would you like to teach yourself?
        </h1>

        <Suspense fallback={<CoursesSkeletonGrid />}>
          <CoursesGrid />
        </Suspense>
      </div>
    </HeaderLayout>
  )
}
