import Link from 'next/link'
import React from 'react'

import { Course, CourseUnits } from '@/server/db/courses/types'

interface SidebarProps {
  course: Course
  courseUnits: CourseUnits
}

const CourseSidebar: React.FC<SidebarProps> = ({ course, courseUnits }) => {
  return (
    <div className="w-1/4 bg-white rounded shadow-lg p-5">
      <h2 className="font-semibold text-xl mb-4">{course.title}</h2>

      <div className="my-5">
        {Array.from(courseUnits).map(([moduleId, courseModule]) => (
          <ul key={moduleId}>
            <li key={moduleId}>
              <Link
                href={`/courses/${course.id}/modules/${moduleId}`}
                className="font-medium text-base mt-2"
              >
                {courseModule.title}
              </Link>

              <ul>
                {courseModule.units.map((courseUnit) => (
                  <li key={courseUnit.id}>
                    <Link
                      href={`/courses/${course.id}/modules/${courseModule.number}/units/${courseUnit.id}`}
                      className="font-medium text-base mt-2"
                    >
                      {courseModule.number}.{courseUnit.number} {courseUnit.title}
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
