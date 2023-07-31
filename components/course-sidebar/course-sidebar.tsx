'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { Course, CourseUnits } from '@/server/db/courses/types'
import { CourseEnrollment } from '@/server/db/enrollment/types'

import { CourseProgress } from './course-progress'
import { UnitListItem } from './unit-list-item'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  course: Course
  courseUnits: CourseUnits
  courseEnrollment: CourseEnrollment | null
}

export function CourseSidebar({
  course,
  courseUnits,
  courseEnrollment,
  className,
}: SidebarProps) {
  return (
    <div className={cn('py-5 overflow-auto flex-1 flex flex-col space-y-4', className)}>
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
                      courseEnrollment?.completedUnitIds.includes(courseUnit.id) ?? false
                    }
                  />
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}
