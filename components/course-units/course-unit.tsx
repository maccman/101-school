import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import { CourseModuleUnit } from '@/server/db/units/types'

import { UnitContent } from './unit-content'
import { UnitFooter } from './unit-footer'
import { ChatSidebar } from '../chat-sidebar'
import { EnrollButton } from '../courses/enroll-button'

interface CourseUnitProps {
  courseId: string
  courseModule: {
    title: string
    number: number
  }
  courseUnit: CourseModuleUnit
  className?: string
}

export function CourseUnit({
  courseModule,
  courseUnit,
  courseId,
  className,
}: CourseUnitProps) {
  return (
    <div className={cn('flex-1 flex', className)}>
      <div className="px-5 md:px-10 py-5 relative flex-1 overflow-auto">
        <Suspense>
          <EnrollButton
            courseId={courseId}
            className="absolute right-5 top-5 md:right-10"
            hideEnrolled={!(courseUnit.number === 1 && courseModule.number === 1)}
          />
        </Suspense>

        <h3 className="text-base tracking-tight pb-5 text-accent-foreground">
          {courseModule.title}
        </h3>

        {courseUnit.content && (
          <UnitContent content={courseUnit.content} image={courseUnit.image} />
        )}

        <UnitFooter courseId={courseId} unitId={courseUnit.id} />
      </div>

      <div className="border-l border-accent-border flex-none w-1/3 max-w-[600px] flex-col hidden md:flex">
        <Suspense>
          <ChatSidebar unitId={courseUnit.id} className="flex-1" />
        </Suspense>
      </div>
    </div>
  )
}
