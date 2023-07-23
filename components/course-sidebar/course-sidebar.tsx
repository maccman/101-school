import Link from 'next/link'
import React from 'react'

import { Course, CourseUnits } from '@/server/db/courses/types'
import { getHrefForCourseModule, getHrefForCourseUnit } from '@/server/helpers/links'

import { Button } from '../ui/button'

interface SidebarProps {
  course: Course
  courseUnits: CourseUnits
}

const CourseSidebar: React.FC<SidebarProps> = ({ course, courseUnits }) => {
  return (
    <div className="w-1/4 rounded shadow-lg p-5">
      <h2 className="font-semibold text-xl mb-2 tracking-tight">{course.title}</h2>

      <div className="my-5">
        {Array.from(courseUnits).map(([moduleId, courseModule]) => (
          <ul key={moduleId} className="space-y-1">
            <li key={moduleId}>
              <Link
                href={getHrefForCourseModule({ course, courseModule })}
                className="font-medium text-base mt-2"
              >
                <Button variant="secondary" className="w-full justify-start" asChild>
                  <span>{courseModule.title}</span>
                </Button>
              </Link>

              <ul className="space-y-1">
                {courseModule.units.map((courseUnit) => (
                  <li key={courseUnit.id}>
                    <Link
                      href={getHrefForCourseUnit({
                        course,
                        courseModule,
                        courseUnit,
                      })}
                    >
                      <Button
                        variant="secondary"
                        className="w-full justify-start"
                        asChild
                      >
                        <span>
                          {courseModule.number}.{courseUnit.number} {courseUnit.title}
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
