import { Suspense } from 'react'

import { CourseModuleUnit } from '@/server/db/units/types'

import { UnitContent } from './unit-content'
import { UnitImage } from './unit-image'
import { UnitPagination } from './unit-pagination'
import { EnrollButton } from '../courses/enroll-button'

interface CourseUnitProps {
  courseId: string
  courseModule: { title: string }
  courseUnit: CourseModuleUnit
  userId: string | null
}

export function CourseUnit({
  courseModule,
  courseUnit,
  userId,
  courseId,
}: CourseUnitProps) {
  return (
    <div className="px-10 py-5 relative">
      <Suspense>
        <EnrollButton
          userId={userId}
          courseId={courseId}
          className="absolute right-5 top-5"
          hideEnrolled={courseUnit.number !== 1}
        />
      </Suspense>

      <h3 className="text-base tracking-tight pb-5 text-accent-foreground">
        {courseModule.title}
      </h3>

      {courseUnit.image && (
        <UnitImage image={courseUnit.image} className="float-right mt-28 ml-5 mb-10" />
      )}

      {courseUnit.content && <UnitContent content={courseUnit.content} />}

      <Suspense>
        <UnitPagination unitId={courseUnit.id} />
      </Suspense>
    </div>
  )
}
