'use client'

import { ChevronsDown } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { Course, CourseUnits } from '@/server/db/courses/types'
import { CourseEnrollment } from '@/server/db/enrollment/types'

import { CourseProgress } from './course-progress'
import { UnitListItem } from './unit-list-item'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  course: Course
  courseUnits: CourseUnits
  courseEnrollment?: CourseEnrollment | null
}

export function CourseSidebar({
  course,
  courseUnits,
  courseEnrollment = null,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div
      className={cn(
        'py-5 flex-1 flex flex-col space-y-4 relative',
        { 'max-h-[270px] md:max-h-none overflow-hidden md:overflow-visible': collapsed },
        className,
      )}
    >
      <div className="flex-1 flex flex-col space-y-4 overflow-auto">
        <h2 className="font-semibold text-xl tracking-tight px-5">{course.title}</h2>

        {courseEnrollment && (
          <CourseProgress courseEnrollment={courseEnrollment} className="flex-none" />
        )}

        <div className="space-y-2 px-2">
          {Array.from(courseUnits).map(([moduleId, courseModule]) => (
            <ul key={moduleId} className="space-y-1">
              <li key={moduleId}>
                <span className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full justify-start">
                  {courseModule.title}
                </span>

                <ul className="space-y-1">
                  {courseModule.units.map((courseUnit) => (
                    <UnitListItem
                      key={courseUnit.id}
                      course={course}
                      courseModule={courseModule}
                      courseUnit={courseUnit}
                      completed={
                        courseEnrollment?.completedUnitIds.includes(courseUnit.id) ??
                        false
                      }
                    />
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div
        className={cn('absolute inset-x-0 bottom-0 md:hidden', { hidden: !collapsed })}
      >
        <button
          className="w-full py-4 px-2 text-sm font-medium items-center justify-center bg-white/20 backdrop-blur-sm flex gap-2"
          onClick={() => setCollapsed(false)}
        >
          <ChevronsDown className="w-4 h-4" />
          <span>Expand table of contents</span>
        </button>
      </div>
    </div>
  )
}
