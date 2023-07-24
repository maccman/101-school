'use client'

import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'
import { Course, CourseUnits } from '@/server/db/courses/types'
import { getPathForCourseUnit } from '@/server/helpers/links'

import { Button } from '../ui/button'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  course: Course
  courseUnits: CourseUnits
}

const CourseSidebar: React.FC<SidebarProps> = ({ course, courseUnits, className }) => {
  return (
    <div className={cn('py-5 overflow-auto', className)}>
      <h2 className="font-semibold text-xl mb-2 tracking-tight px-5">{course.title}</h2>

      <div className="my-4 space-y-2 px-2">
        {Array.from(courseUnits).map(([moduleId, courseModule]) => (
          <ul key={moduleId} className="space-y-1">
            <li key={moduleId}>
              <span className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full justify-start">
                {courseModule.title}
              </span>

              <ul className="space-y-1">
                {courseModule.units.map((courseUnit) => (
                  <li key={courseUnit.id}>
                    <Link
                      href={getPathForCourseUnit({
                        course,
                        courseModule,
                        courseUnit,
                      })}
                    >
                      <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="w-full justify-start"
                        asChild
                      >
                        <span className="flex space-x-3">
                          <span className="bg-gray-50 min-w-[5px] px-2 py-1 rounded-md">
                            {courseModule.number}.{courseUnit.number}
                          </span>
                          <span>{courseUnit.title}</span>
                        </span>
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar
