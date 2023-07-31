import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import { CourseModuleUnit } from '@/server/db/units/types'

import { UnitContent } from './unit-content'
import { UnitFooter } from './unit-footer'
import { UnitImage } from './unit-image'
import { ChatSidebar } from '../chat-sidebar'
import { ChatSidebarNoAuth } from '../chat-sidebar/chat-sidebar-no-auth'
import { EnrollButton } from '../courses/enroll-button'

interface CourseUnitProps {
  courseId: string
  courseModule: {
    title: string
    number: number
  }
  courseUnit: CourseModuleUnit
  userId: string | null
  className?: string
}

export function CourseUnit({
  courseModule,
  courseUnit,
  userId,
  courseId,
  className,
}: CourseUnitProps) {
  return (
    <div className={cn('flex-1 flex', className)}>
      <div className="px-10 py-5 relative flex-1 overflow-auto">
        <Suspense>
          <EnrollButton
            userId={userId}
            courseId={courseId}
            className="absolute right-5 top-5"
            hideEnrolled={!(courseUnit.number === 1 && courseModule.number === 1)}
          />
        </Suspense>

        <h3 className="text-base tracking-tight pb-5 text-accent-foreground">
          {courseModule.title}
        </h3>

        {courseUnit.image && (
          <UnitImage image={courseUnit.image} className="float-right mt-28 ml-5 mb-10" />
        )}

        {courseUnit.content && <UnitContent content={courseUnit.content} />}

        <UnitFooter courseId={courseId} unitId={courseUnit.id} />
      </div>

      <div className="border-l border-accent-border flex-none w-1/3 min-w-[370px] max-w-[600px] flex-col hidden sm:flex">
        {userId ? (
          <Suspense>
            <ChatSidebar unitId={courseUnit.id} userId={userId} className="flex-1" />
          </Suspense>
        ) : (
          <ChatSidebarNoAuth className="flex-1" />
        )}
      </div>
    </div>
  )
}
