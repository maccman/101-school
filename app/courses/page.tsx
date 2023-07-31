import { Suspense } from 'react'

import { HeaderLayout } from '@/components/layouts/header-layout'

import { CoursesGrid } from './components/courses-grid'
import { CoursesSkeletonGrid } from './components/courses-skeleton-grid'

export default async function CoursesPage() {
  return (
    <HeaderLayout>
      <div className="p-5">
        <h1 className="text-lg font-semibold mb-3">Courses</h1>

        <Suspense fallback={<CoursesSkeletonGrid />}>
          <CoursesGrid />
        </Suspense>
      </div>
    </HeaderLayout>
  )
}
